import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewNegative() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/admin/negative");
      setData(res.data || []);
    } catch {
      alert("Failed to load negative feedback");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>View All Negative Opinions</h2>

        <table style={table}>
          <thead>
            <tr style={{ background: "#e5e5e5" }}>
              <th style={headCell}>Record ID</th>
              <th style={headCell}>Policy ID</th>
              <th style={headCell}>Description</th>
              <th style={headCell}>Date Announced</th>
              <th style={headCell}>Comment</th>
              <th style={headCell}>User</th>
              <th style={headCell}>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r, i) => (
              <tr key={i}>
                <td style={cell}>{r.record_id}</td>
                <td style={cell}>{r.policy_id}</td>
                <td style={cell}>{r.description}</td>
                <td style={cell}>{r.date_announced}</td>

                <td style={{ ...cell, color: "red", fontWeight: "600" }}>
                  {r.comment}
                </td>

                <td style={{ ...cell, color: "red" }}>
                  {r.username}
                </td>

                <td style={cell}>{r.datetime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            No negative feedback
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  background: "#f5f6f7",
  minHeight: "100vh",
  padding: "30px",
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
};

const title = {
  textAlign: "center",
  color: "red",
  marginBottom: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const headCell = {
  border: "1px solid #ccc",
  padding: "12px",
  color: "red",
  fontWeight: "bold",
};

const cell = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "center",
};
