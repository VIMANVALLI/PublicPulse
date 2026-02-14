import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewOpinions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/admin/opinions");
    setData(res.data);
  };

  if (data.length === 0) return <div className="p-6">No opinions</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        View All Opinions
      </h1>

      <div className="overflow-auto bg-white shadow p-4">
        <table className="min-w-full border text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2 border">Record ID</th>
              <th className="p-2 border">Policy ID</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">DateTime</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border">
                <td className="p-2 border">{r.record_id}</td>
                <td className="p-2 border">{r.policy_id}</td>
                <td className="p-2 border max-w-[300px] break-words">{r.description}</td>
                <td className="p-2 border">{r.date_announced}</td>
                <td className="p-2 border bg-cyan-200">{r.comment}</td>
                <td className="p-2 border text-red-600">{r.username}</td>
                <td className="p-2 border">{r.datetime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
