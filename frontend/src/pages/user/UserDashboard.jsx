import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const nav = useNavigate();

  const cards = [
    { title: "View All Details", path: "/user/details" },
    { title: "Give Opinion", path: "/user/opinion" },
    { title: "View Recommendations", path: "/user/recommendations" },
    { title: "View Feedback", path: "/user/feedback" },
  ];

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-purple-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => nav(c.path)}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer hover:bg-purple-50 transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {c.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
