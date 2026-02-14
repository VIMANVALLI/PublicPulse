import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewRecommendations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/admin/recommendations");
      setList(res.data || []);
    } catch (err) {
      alert("Failed to load recommendations");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scheme Recommendations</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Policy ID</th>
            <th>User</th>
            <th>Recommendation</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {list.map((r, i) => (
            <tr key={i}>
              {/* RECORD ID */}
              <td>{r.record_id || "-"}</td>

              {/* POLICY */}
              <td>{r.policy_id || "-"}</td>

              {/* USER */}
              <td>{r.username || "-"}</td>

              {/* RECOMMENDATION */}
              <td style={{ textAlign: "left" }}>
                {r.recommendation || "-"}
              </td>

              {/* DATE */}
              <td>{r.datetime || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {list.length === 0 && (
        <p style={{ marginTop: 20 }}>No recommendations found</p>
      )}
    </div>
  );
}
