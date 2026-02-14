import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  Database,
  BarChart3,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star
} from "lucide-react";

export default function AdminDashboard() {
  const nav = useNavigate();

  const cards = [
    {
      title: "Upload Dataset",
      icon: <UploadCloud size={28} />,
      path: "/admin/upload",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "View All Dataset",
      icon: <Database size={28} />,
      path: "/admin/datasets",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Analyze Dataset",
      icon: <BarChart3 size={28} />,
      path: "/admin/analyze",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "User Opinions",
      icon: <MessageSquare size={28} />,
      path: "/admin/opinions",
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "Recommendations",
      icon: <Star size={28} />,
      path: "/admin/recommendations",
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Positive Feedback",
      icon: <ThumbsUp size={28} />,
      path: "/admin/positive",
      color: "from-green-500 to-green-700",
    },
    {
      title: "Negative Feedback",
      icon: <ThumbsDown size={28} />,
      path: "/admin/negative",
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="p-6">
      {/* TOP TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Admin Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => nav(c.path)}
            className={`cursor-pointer p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${c.color} hover:scale-105 transition`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <p className="text-sm opacity-80 mt-1">
                  Click to open
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                {c.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Datasets</h2>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Opinions</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold mt-2">58</p>
        </div>
      </div>
    </div>
  );
}
