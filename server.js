require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// .env se key load ho rahi hai
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post(GROQ_URL, {
            model: "llama-3.3-70b-versatile",
            messages: req.body.messages,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Groq Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Failed to connect to Groq", 
            details: error.response ? error.response.data : error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔑 API Key Loaded: ${GROQ_API_KEY ? "YES" : "NO"}`);
});