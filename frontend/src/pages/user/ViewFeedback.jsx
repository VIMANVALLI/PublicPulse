import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewFeedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/user/myfeedback");
      console.log("API data:", res.data);
      setData(res.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load feedback");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Feedback</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border">Record ID</th>
              <th className="p-3 border">Policy ID</th>
              <th className="p-3 border">Comment</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="text-center border-b">

                {/* RECORD ID */}
                <td className="p-3 border">
                  {item.record_id ? item.record_id : "-"}
                </td>

                {/* POLICY ID */}
                <td className="p-3 border">
                  {item.policy_id ? item.policy_id : "-"}
                </td>

                {/* COMMENT */}
                <td className="p-3 border text-left">
                  {item.comment ? item.comment : "-"}
                </td>

                {/* TYPE BADGE */}
                <td className="p-3 border">
                  {item.type === "positive" && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded">
                      positive
                    </span>
                  )}

                  {item.type === "negative" && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded">
                      negative
                    </span>
                  )}

                  {!item.type && <span>-</span>}
                </td>

                {/* DATE */}
                <td className="p-3 border">
                  {item.datetime ? item.datetime : "-"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No feedback yet
          </p>
        )}
      </div>
    </div>
  );
}
