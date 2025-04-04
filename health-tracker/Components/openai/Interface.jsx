import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // or paste the key directly for testing
});

async function chat() {
  const response = await openai.chat.completions.create({
    model: "gpt-4", // or "gpt-3.5-turbo"
    messages: [{ role: "user", content: "Hello, who are you?" }],
  });

  console.log(response.choices[0].message.content);
}

export default chat();
