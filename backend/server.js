import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

app.post('/generate', async (req, res) => {
  const { prompt, type } = req.body;
  const apiKey = 'YOUR_API_KEY_HERE'; // <--- replace with your AI API key
  let apiUrl;

  if(type === 'image'){
    apiUrl = 'https://your-ai-image-api.com/generate'; // your image AI endpoint
  } else if(type === 'video'){
    apiUrl = 'https://your-sora-video-api.com/generate'; // Sora video endpoint
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    if(type === 'image') res.json({ image_url: data.image_url });
    else res.json({ video_url: data.video_url });

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error, skibidi veiny ahh!' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
