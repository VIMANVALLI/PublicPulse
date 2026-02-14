import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ViewAllDataset() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/admin/datasets");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading data");
    }
    setLoading(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (data.length === 0) return <div className="p-6">No data</div>;

  const headers = Object.keys(data[0]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Datasets</h1>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="p-2 border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border hover:bg-gray-50">
                {headers.map((h, j) => (
                  <td key={j} className="p-2 border whitespace-nowrap">
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
