import Groq from "groq-sdk";

export async function generateAIResponse(prompt: string) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      provider: "groq",
      output: "GROQ_API_KEY is not configured.",
    };
  }

  const groq = new Groq({
    apiKey,
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return {
    provider: "groq",
    output: completion.choices[0]?.message?.content || "",
  };
}