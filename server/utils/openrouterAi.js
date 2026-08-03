const { OpenRouter } = require('@openrouter/sdk');

const client = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});


const getOpenrouterAiResponse = async (prompt) => {
    try {
        const response = await client.chat.send(
            {
                chatRequest: {
                    model: 'inclusionai/ling-3.0-flash:free',
                    messages: [
                        { role: 'user', content: prompt },
                    ],
                }
            }
        );
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error OpenRouter AI:", error);
        throw new Error("Gagal mengambil data dari AI");
    }
};
// Fungsi ini akan menghasilkan respon dari AI berupa text

module.exports = { getOpenrouterAiResponse };