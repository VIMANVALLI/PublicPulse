import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function FetchAll() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(""); // ⭐ video title

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/youtube/comments");

      // ⭐ backend returns {title, comments}
      setTitle(res.data.title);
      setData(res.data.comments);
    } catch (err) {
      console.error(err);
      alert("Failed to load YouTube comments");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      
      {/* ⭐ SHOW VIDEO TITLE */}
      <h2
        style={{
          background: "#111827",
          color: "#fff",
          padding: "14px 20px",
          borderRadius: 10,
          marginBottom: 20,
          fontSize: 22,
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          letterSpacing: 0.5,
        }}
      >
        🎬 {title ? title : "All YouTube Comments"}
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead>
          <tr style={{ background: "#e5e5e5" }}>
            <th style={th}>Comment</th>
            <th style={th}>Likes</th>
            <th style={th}>Sentiment</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td style={td}>{d.text}</td>
              <td style={td}>{d.likes}</td>
              <td style={td}>
                <span
                  style={{
                    background:
                      d.sentiment === "positive"
                        ? "green"
                        : d.sentiment === "negative"
                        ? "red"
                        : "gray",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  {d.sentiment}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  border: "1px solid #ccc",
  padding: 12,
  textAlign: "left",
};

const td = {
  border: "1px solid #ccc",
  padding: 12,
};
