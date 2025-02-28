// src/components/layout/Header.tsx
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useIsMobile } from "../../hooks/useMediaQuery";
import Avatar from "../common/Avatar";
import SettingIcon from "../../assets/icons/setting.svg";
import NotificationBellIcon from "../../assets/icons/notification-bell.svg";

interface HeaderProps {
  onMenuClick: () => void;
}

// Define a mapping of routes to their titles
const routeTitles: Record<string, string> = {
  "/": "Overview",
  "/dashboard": "Overview",
  "/transactions": "Transactions",
  "/accounts": "Accounts",
  "/investments": "Investments",
  "/credit-cards": "Credit Cards",
  "/loans": "Loans",
  "/services": "Services",
  "/privileges": "My Privileges",
  "/settings": "Setting",
};

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile, logout } = useUserStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Get the current page title based on the route
  const getPageTitle = () => {
    // First, try exact path match
    if (routeTitles[location.pathname]) {
      return routeTitles[location.pathname];
    }

    // Otherwise, try to match the closest parent path
    // This handles nested routes like /settings/profile
    const pathSegments = location.pathname.split("/").filter(Boolean);

    while (pathSegments.length > 0) {
      const path = `/${pathSegments.join("/")}`;
      if (routeTitles[path]) {
        return routeTitles[path];
      }
      pathSegments.pop();
    }

    // Default fallback
    return "Overview";
  };

  // Get the current page title
  const pageTitle = getPageTitle();

  // Close dropdown when clicking outside
  useOutsideClick(dropdownRef, () => {
    setIsProfileOpen(false);
  });

  const handleLogout = () => {
    logout();
    // Redirect to login or home page if needed
  };

  return (
    <header className="bg-white h-16 px-4 md:px-6 flex items-center justify-between shadow-sm z-10">
      {/* Mobile menu button - only on mobile */}
      {isMobile && (
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <h1 className="text-2xl font-bold text-primary-title">{pageTitle}</h1>

      {/* Right section - Notification and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search input */}
        <div className={`${isMobile ? "w-full ml-4" : "max-w-64 w-full"}`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for something"
            />
          </div>
        </div>

        {/* Setting */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none max-w-12 max-h-12">
          <span className="sr-only">View setting</span>
          <img src={SettingIcon} alt="setting" width={25} height={25} />
        </button>

        {/* Notification Bell */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none max-w-12 max-h-12">
          <span className="sr-only">View notifications</span>
          <img
            src={NotificationBellIcon}
            alt="setting"
            width={25}
            height={25}
          />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none"
          >
            <Avatar
              src={profile?.profileImage}
              alt={profile?.name || "User"}
              size="md"
              status={profile ? "online" : undefined}
            />
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {profile?.email || "user@example.com"}
                  </p>
                </div>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <svg
                    className="mr-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <svg
                    className="mr-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <svg
                    className="mr-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
