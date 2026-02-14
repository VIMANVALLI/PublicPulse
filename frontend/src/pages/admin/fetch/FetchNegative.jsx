import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function FetchNegative() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      // ✅ FIXED API
      const res = await API.get("/youtube/negative");
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load negative YouTube comments");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>YouTube Negative Comments</h2>

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
                <span style={badgeRed}>{d.sentiment}</span>
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

const badgeRed = {
  background: "red",
  color: "white",
  padding: "4px 10px",
  borderRadius: 6,
};
