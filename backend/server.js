const express = require("express");
const cors = require("cors");
require("dotenv").config();
const moodRoutes = require("./routes/moodRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MoodTunes backend running");
});
app.use("/api/moods", moodRoutes);
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
