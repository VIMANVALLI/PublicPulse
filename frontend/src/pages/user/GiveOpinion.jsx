import { useEffect, useState } from "react";
import API from "../../services/api";

export default function GiveOpinionPage() {
  const [schemes, setSchemes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [type, setType] = useState("positive");
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = async () => {
    const res = await API.get("/user/details");
    setSchemes(res.data);
  };

  const openBox = (row) => {
    setSelected(row);
    setShow(true);
  };

  const submit = async () => {
    await API.post("/user/opinion", {
      record_id: selected.record_id,
      policy_id: selected.policy_id,
      description: selected.description,
      date_announced: selected.date_announced,
      comment: comment,
      type: type,
      username: localStorage.getItem("username")
    });

    alert("Opinion submitted");
    setShow(false);
    setComment("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Recommend or Give Opinion
      </h1>

      <div className="overflow-auto bg-white shadow p-4">
        <table className="min-w-full border text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2 border">Record ID</th>
              <th className="p-2 border">Policy ID</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {schemes.map((r, i) => (
              <tr key={i}>
                <td className="p-2 border">{r.record_id}</td>
                <td className="p-2 border">{r.policy_id}</td>
                <td className="p-2 border">{r.description}</td>
                <td className="p-2 border">{r.date_announced}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => openBox(r)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Give Opinion
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-[400px]">
            <h2 className="text-xl font-bold mb-3">Give Opinion</h2>

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Write opinion"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <select
              className="w-full border p-2 mb-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>

            <button
              onClick={submit}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Submit Opinion
            </button>

            <button
              onClick={() => setShow(false)}
              className="mt-2 text-red-600 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
