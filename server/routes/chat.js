const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize the OpenAIApi with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }
            ]
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).send(`Server error: ${error.message}`);
    }
});

module.exports = router;
