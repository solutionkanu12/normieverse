exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  try {
    const { normieId, traits } = JSON.parse(event.body)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `You are a cyberpunk lore writer for NormieVerse — a living on-chain city on Ethereum where 10,000 Normies roam the streets. Write exactly 3 sentences as a dark, cinematic biography for Normie #${normieId}. Their on-chain traits: ${traits}. Write in second person ("You are..."). Make it noir, vivid, and deeply specific to their actual traits — reference the exact Type, Expression, Accessory, and other traits by name. No hashtags or emoji.`,
          },
        ],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text || 'The blockchain guards this secret.'

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ lore: text }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ lore: 'The blockchain is unreachable. Try again.' }),
    }
  }
}
