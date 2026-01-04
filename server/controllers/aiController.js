const { getGeminiResponse } = require('../utils/gemini');

exports.chatbot = async (req, res) => {
    const { query, historyContent, jenisKelamin, usia, beratBadan, tinggiBadan, tingkatAktvitas, bmi, bmr, tdde } = req.body;

    // Prompt
    const prompt = `
  Anda adalah asisten kesehatan SatSetFit. Data user:
  Gender: ${jenisKelamin}, 
  Usia: ${usia}, 
  BB: ${beratBadan}, 
  TB: ${tinggiBadan}, 
  Aktivitas: ${tingkatAktvitas}.
  Hasil: BMI ${bmi}, BMR ${bmr}, TDEE ${tdde}.
  Jawablah dengan ramah, singkat, dan jelas. Gunakan format poin-poin jika perlu. Jika data-data user kosong, maka ingatkan lah user untuk mengisi data diri untuk input kalkuator
  Berikan baris baru (paragraf) untuk memisahkan ide agar mudah dibaca dan jangan beri **bold**.  Sertakan juga referensi dari WHO dan Kemenkes jika perlu. 
  Gunakan format Markdown untuk merespon. Gunakan bold untuk poin penting, dan bullet points untuk daftar saran.
  
  User bertanya: "${query}".
  Berikut histori chat Anda dengan User: ${historyContent}
  `;

    try {
        const response = await getGeminiResponse(prompt);
        res.json({ result: response });
    } catch (error) {
        res.status(500).json({ error: 'AI Error' });
    }
};