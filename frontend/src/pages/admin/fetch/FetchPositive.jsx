import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function FetchPositive() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      // ✅ FIXED API
      const res = await API.get("/youtube/positive");
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load positive YouTube comments");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>YouTube Positive Comments</h2>

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
              {/* ✅ FIXED: text instead of comment */}
              <td style={td}>{d.text}</td>
              <td style={td}>{d.likes}</td>
              <td style={td}>
                <span style={badgeGreen}>{d.sentiment}</span>
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

const badgeGreen = {
  background: "green",
  color: "white",
  padding: "4px 12px",
  borderRadius: 6,
};
