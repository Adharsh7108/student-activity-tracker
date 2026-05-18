import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaChartPie,
  FaChevronLeft,
  FaClipboardList,
  FaHome,
  FaTimes,
  FaUserGraduate,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useMe } from "../hooks/useActivities";

import UserProfileModal from "./UserProfileModal";

function Sidebar({ collapsed, setCollapsed }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const { logout } = useAuth();

  const { data: user } = useMe();

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive
        ? "bg-white text-blue-600 shadow"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-3 rounded-xl shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          ${collapsed ? "w-16" : "w-56"}
          fixed md:relative top-0 left-0 z-50
          h-screen bg-blue-600 border-blue-500
          transition-all duration-300 flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 min-h-[72px]">
          {!collapsed && (
            <div>
              {/* Logo + Title */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <FaUserGraduate className="text-white text-lg" />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-white">
                    GoTeacher
                  </h1>

                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex text-white hover:text-blue-100"
          >
            <FaChevronLeft
              className={`transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1 flex-1">
          {[
            {
              to: "/",
              icon: <FaHome />,
              label: "Dashboard",
            },
            {
              to: "/activities",
              icon: <FaClipboardList />,
              label: "Activities",
            },
            {
              to: "/students",
              icon: <FaUserGraduate />,
              label: "Students",
            },
            {
              to: "/analytics",
              icon: <FaChartPie />,
              label: "Analytics",
            },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={navClass}
            >
              {icon}

              {!collapsed && label}
            </NavLink>
          ))}
        </nav>

        {/* User profile strip at bottom */}
        <div className="p-3 space-y-1">
          <button
            onClick={() => setProfileOpen(true)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all text-left ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
              {user?.username?.charAt(0).toUpperCase() ?? "?"}
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.username ?? "..."}
                </p>

                <p className="text-xs text-blue-100">
                  View profile
                </p>
              </div>
            )}
          </button>

          <button
            onClick={logout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sm font-medium text-white hover:bg-red-500/20 transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <FaSignOutAlt />

            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* User profile modal */}
      {profileOpen && (
        <UserProfileModal
          onClose={() => setProfileOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;