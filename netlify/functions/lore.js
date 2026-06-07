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

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ lore: 'Method not allowed' }) }
  }

  try {
    const { normieId, traits } = JSON.parse(event.body)

    const payload = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `You are a cyberpunk lore writer for NormieVerse — a living on-chain city on Ethereum where 10,000 Normies roam the streets. Write exactly 3 sentences as a dark, cinematic biography for Normie #${normieId}. Their on-chain traits: ${traits}. Write in second person ("You are..."). Make it noir, vivid, and deeply specific to their actual traits. No hashtags or emoji.`
      }]
    })

    const text = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        }
      }, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data)
            resolve(parsed.content?.[0]?.text || 'The blockchain guards this secret.')
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
