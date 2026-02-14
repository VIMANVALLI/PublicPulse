import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewRecommendations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const res = await API.get("/user/recommendations");
      setData(res.data);
    } catch {
      alert("Failed to load recommendations");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Recommendations</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2">Recommendation</th>
              <th className="p-2">Score</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-b text-center">
                <td className="p-2 text-left">{r.recommendation}</td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center mt-4">No recommendations yet</p>
        )}
      </div>
    </div>
  );
}
