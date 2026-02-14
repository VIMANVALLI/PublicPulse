import { useState } from "react";
import API from "../../services/api";

export default function UploadDataset() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    if (!file) {
      alert("Select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/admin/upload-dataset", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Upload successful");
      setFile(null);
    } catch (err) {
      console.log(err);
      setMsg("Upload failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Dataset</h1>

      <div className="bg-white p-6 rounded shadow w-[400px]">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />

        {file && (
          <p className="text-sm mb-3">
            Selected: <b>{file.name}</b>
          </p>
        )}

        <button
          onClick={upload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>

        {msg && <p className="mt-3 text-green-600">{msg}</p>}
      </div>
    </div>
  );
}
