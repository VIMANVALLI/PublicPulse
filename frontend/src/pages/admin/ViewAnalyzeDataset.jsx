import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewAllDataset() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/admin/datasets");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // SHOW LOADING FIRST
  if (loading) {
    return <div className="p-6 text-lg">Loading datasets...</div>;
  }

  // SHOW IF EMPTY
  if (!data || data.length === 0) {
    return <div className="p-6">No data found</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Datasets</h1>

      <div className="bg-white shadow rounded p-4 overflow-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-red-600 text-white sticky top-0">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="p-3 border whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border hover:bg-gray-100">
                {headers.map((h, j) => (
                  <td key={j} className="p-3 border align-top max-w-[300px] break-words">
                    {row[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
