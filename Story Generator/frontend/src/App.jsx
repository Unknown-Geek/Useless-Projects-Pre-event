import { useState } from "react";
import "./App.css";

function App() {
  const [keywords, setKeywords] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStory = async () => {
    if (!keywords.trim()) {
      setError("Please enter some keywords");
      return;
    }

    setLoading(true);
    setError("");
    setStory("");

    try {
      const response = await fetch("http://localhost:5000/generate_story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: keywords.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStory(data.story);
      } else {
        setError(data.error || "Failed to generate story");
      }
    } catch {
      setError(
        "Failed to connect to server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateStory();
    }
  };

  return (
    <div className="app">
      <h1>Simple Story Generator</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter keywords (e.g., dragon, castle, adventure)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onKeyPress={handleKeyPress}
          className="keyword-input"
          disabled={loading}
        />

        <button
          onClick={generateStory}
          disabled={loading || !keywords.trim()}
          className="generate-button"
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {story && (
        <div className="story-container">
          <h2>Your Story:</h2>
          <div className="story-content">{story}</div>
        </div>
      )}
    </div>
  );
}

export default App;
