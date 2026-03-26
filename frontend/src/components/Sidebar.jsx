// Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaFileAlt, FaGraduationCap, FaBriefcase, FaCode, FaCogs, FaFileSignature, FaEye } from "react-icons/fa";

function Sidebar({ onNavigate }) {
  const navigate = useNavigate();

  const navItems = [
    { to: "/heading", label: "Personal Info", icon: <FaFileAlt /> },
    { to: "/education", label: "Education", icon: <FaGraduationCap /> },
    { to: "/experience", label: "Experience", icon: <FaBriefcase /> },
    { to: "/projects", label: "Projects", icon: <FaCode /> },
    { to: "/skills", label: "Skills", icon: <FaCogs /> },
    { to: "/summary", label: "Summary", icon: <FaFileSignature /> },
    { to: "/finalize", label: "Preview", icon: <FaEye /> }
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white print:hidden">

      <div className="p-6 border-b border-gray-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <FaHome className="text-white text-xl" />
          <span className="text-xl font-bold">Resume Builder</span>
        </button>
      </div>

      <div className="flex-1 py-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-900"
            onClick={onNavigate}
          >
            <span className="text-gray-400">{item.icon}</span>
            <span className="text-gray-300">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-gray-800 text-xs text-gray-500 text-center">
        <p>Smart Resume Builder</p>
        <p>Powered by AI</p>
      </div>

    </div>
  );
}

export default Sidebar;