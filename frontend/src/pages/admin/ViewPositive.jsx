import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewPositive() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/admin/positive");
      setData(res.data);
    } catch {
      alert("Failed to load");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        View All Public Pulse Positive Opinions
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400">
          
          {/* HEADINGS */}
          <thead>
            <tr className="bg-gray-200 text-blue-800 font-bold">
              <th className="border p-2">Record ID</th>
              <th className="border p-2">Policy ID</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Date Announced</th>
              <th className="border p-2">Comment</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="text-center">

                <td className="border p-2 text-blue-600">
                  {item.record_id}
                </td>

                <td className="border p-2 text-blue-600">
                  {item.policy_id}
                </td>

                <td className="border p-2">
                  <textarea
                    value={item.description}
                    readOnly
                    className="w-64 h-20 border border-blue-300 text-blue-600"
                  />
                </td>

                <td className="border p-2 text-blue-600">
                  {item.date_announced}
                </td>

                {/* COMMENT COLOR */}
                <td className="border p-2 font-bold text-green-600">
                  {item.comment}
                </td>

                {/* USER COLOR */}
                <td className="border p-2 text-purple-600 font-semibold">
                  {item.username}
                </td>

                <td className="border p-2 text-blue-600">
                  {item.datetime}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
