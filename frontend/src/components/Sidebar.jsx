import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const [openFetch, setOpenFetch] = useState(true);

  /* ================= ADMIN MENU ================= */
  const adminMenuTop = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Upload Dataset", path: "/admin/upload" },
    { name: "View All Dataset", path: "/admin/datasets" },
    { name: "Analyze Dataset", path: "/admin/analyze" },
    { name: "View Opinions", path: "/admin/opinions" },
    { name: "view Positive", path: "/admin/positive" },
    { name: "view Negative", path: "/admin/negative" },
    { name: "Recommendations", path: "/admin/recommendations" },
  ];

  /* ===== FETCH SUB MENU ===== */
  const fetchMenu = [
    { name: "Upload", path: "/admin/fetch/upload" },
    { name: "All Comments", path: "/admin/fetch/all" },
    { name: "Positive", path: "/admin/fetch/positive" },
    { name: "Negative", path: "/admin/fetch/negative" },
    { name: "Graph", path: "/admin/fetch/graph" },
    
  ];

  /* ================= USER MENU ================= */
  const userMenu = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "View Details", path: "/user/details" },
    { name: "Give Opinion", path: "/user/opinion" },
    { name: "My Feedback", path: "/user/feedback" },
    { name: "Recommendations", path: "/user/recommendations" },
  ];

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  const MenuItem = ({ item }) => {
    const active = location.pathname === item.path;

    return (
      <div
        onClick={() => nav(item.path)}
        className={`p-3 rounded cursor-pointer transition 
        ${
          active
            ? "bg-blue-600 text-white shadow"
            : "hover:bg-blue-100 text-gray-700"
        }`}
      >
        {item.name}
      </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-white shadow fixed left-0 top-0 flex flex-col">
      
      {/* HEADER */}
      <div className="p-4 text-xl font-bold border-b bg-blue-600 text-white">
        {role === "admin" ? "Admin Panel" : "User Panel"}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">

        {/* ADMIN */}
        {role === "admin" && (
          <>
            {adminMenuTop.map((item, i) => (
              <MenuItem key={i} item={item} />
            ))}

            {/* FETCH SECTION */}
            <div className="mt-4">
              <div
                onClick={() => setOpenFetch(!openFetch)}
                className="p-3 bg-gray-200 rounded cursor-pointer font-semibold"
              >
                Fetch ▾
              </div>

              {openFetch && (
                <div className="ml-3 mt-2 space-y-1">
                  {fetchMenu.map((item, i) => (
                    <MenuItem key={i} item={item} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* USER */}
        {role === "user" &&
          userMenu.map((item, i) => <MenuItem key={i} item={item} />)}
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
