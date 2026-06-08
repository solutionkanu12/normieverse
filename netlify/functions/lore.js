const https = require('https')

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    const { normieId, traits } = JSON.parse(event.body)
    const apiKey = process.env.GEMINI_API_KEY

    const prompt = `You are a cyberpunk lore writer for NormieVerse — a living on-chain city on Ethereum where 10,000 Normies roam the streets. Write exactly 3 sentences as a dark, cinematic biography for Normie #${normieId}. Their on-chain traits: ${traits}. Write in second person ("You are..."). Make it noir, vivid, and deeply specific to their actual traits. No hashtags or emoji.`

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 300, temperature: 0.9 }
    })

    const text = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        }
      }, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data)
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
            resolve(text || 'The blockchain guards this secret.')
          } catch {
            reject(new Error('Parse error'))
          }
        })
      })
      req.on('error', reject)
      req.write(payload)
      req.end()
    })

    return { statusCode: 200, headers, body: JSON.stringify({ lore: text }) }

  } catch (err) {
    console.log('Lore error:', err.message)
    return { statusCode: 500, headers, body: JSON.stringify({ lore: 'The blockchain is unreachable. Try again.' }) }
  }
}
