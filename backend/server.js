import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import 'dotenv/config'; // for local .env testing if needed

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// ✅ Use environment variable for API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn('⚠️ No API key found! Set OPENAI_API_KEY in .env or GitHub Secrets.');
}

app.post('/generate', async (req, res) => {
  const { prompt, type } = req.body;

  let apiUrl;
  if (type === 'image') {
    apiUrl = 'https://your-ai-image-api.com/generate'; // replace with real image AI endpoint
  } else if (type === 'video') {
    apiUrl = 'https://your-sora-video-api.com/generate'; // replace with real Sora video endpoint
  } else {
    return res.status(400).json({ error: 'Invalid type: must be image or video.' });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // safe access via env
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (type === 'image' && data.image_url) {
      res.json({ image_url: data.image_url });
    } else if (type === 'video' && data.video_url) {
      res.json({ video_url: data.video_url });
    } else {
      res.status(500).json({ error: 'Failed to generate content from API.' });
    }

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error, skibidi veiny ahh!' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
