
export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {{ role: 'system', content: 'You are a feminine, soft-toned content assistant.' }},
        {{ role: 'user', content: `Write a short, emotional quote or caption about: ${topic}` }}
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
