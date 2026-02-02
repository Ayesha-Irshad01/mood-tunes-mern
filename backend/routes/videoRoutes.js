const express = require("express");
const router = express.Router();
const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// GET /api/videos?mood=happy
router.get("/", async (req, res) => {
  const mood = req.query.mood;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${mood} music`,
          type: "video",
          maxResults: 5,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    const videos = response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
    }));

    res.json(videos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

module.exports = router;
