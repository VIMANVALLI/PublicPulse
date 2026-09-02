import React, { useState } from "react";
import API from "../api"; // Change path if your API file is in a different location

function FetchUpload() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url) {
      setMessage("Please enter YouTube URL");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await API.post(
        "/youtube/fetch",
        {
          url: url,
        }
      );

      setMessage(
        `Successfully fetched ${response.data.count} comments`
      );
    } catch (error) {
      console.error("Error fetching YouTube comments:", error);

      if (error.response) {
        setMessage(
          error.response.data?.detail || "Error fetching data"
        );
      } else {
        setMessage("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h4>Fetch YouTube Comments</h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>

        {message && (
          <p
            className="mt-3"
            style={{
              color: message.toLowerCase().includes("error")
                ? "red"
                : "green",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default FetchUpload;
