
export default async function handler(req, res) {
  const { topic } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a soft-toned feminine content assistant." },
          { role: "user", content: `Write a short, emotional quote or caption about: ${topic}` }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ result: "Error: " + (data?.error?.message || "Something went wrong") });
    }

    res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ result: "API call failed: " + error.message });
  }
}
