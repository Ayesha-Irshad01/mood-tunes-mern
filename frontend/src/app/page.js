"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/moods")
      .then((res) => setMoods(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    axios
      .get(`http://localhost:5000/api/videos?mood=${mood}`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-10">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          🎧 MoodTunes
        </h1>
        <p className="text-slate-300">
          Pick your mood and enjoy music instantly
        </p>
      </div>

      {/* Mood Buttons */}
      <div className="max-w-4xl mx-auto flex justify-center gap-4 flex-wrap mb-10">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodClick(mood)}
            className={`px-6 py-3 rounded-full font-medium transition
              ${
                selectedMood === mood
                  ? "bg-blue-500 text-white scale-105"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Selected Mood */}
      {selectedMood && (
        <p className="text-center text-slate-300 mb-6">
          Showing results for <span className="font-semibold">{selectedMood}</span>
        </p>
      )}

      {/* Video Cards */}
      {videos.length > 0 && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.videoId}
              className="bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
            >
              <iframe
                className="w-full h-56"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div className="p-4">
                <h2 className="font-semibold text-sm mb-1 line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-xs text-slate-400">
                  {video.channel}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
