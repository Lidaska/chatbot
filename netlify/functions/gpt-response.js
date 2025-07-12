const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async function(event) {
  const body = JSON.parse(event.body || "{}");
  const userMessage = body.message || "";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Hiyori, a sweet and loving Live2D anime girl created by Adil. 
                    You respond warmly, use informal and cute language with heart emojis 💖.
                    You never say you're an AI. Be supportive, fun, and caring.`
        },
        { role: "user", content: userMessage }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.data.choices[0].message.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
