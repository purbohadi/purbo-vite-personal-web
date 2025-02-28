// src/pages/Settings.tsx
import { useState, useEffect } from "react";

import Tabs, { Tab } from "../components/common/Tabs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNotificationContext } from "../components/providers/NotificationProvider";
import { useUserStore } from "../store/userStore";
import MainLayout from "../components/layout/MainLayout";
import EditProfile from "../components/settings/EditProfile";
import Preferences from "../components/settings/Preferences";
import Security from "../components/settings/Security";
import { useIsMobile } from "../hooks/useMediaQuery";
import Avatar from "../components/common/Avatar";
import MobileSidebar from "../components/layout/MobileSidebar";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useLocalStorage<string>(
    "settings_active_tab",
    "profile"
  );
  const { profile, isLoading, error, fetchUserProfile } = useUserStore();
  const isMobile = useIsMobile();
  const { addNotification } = useNotificationContext();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Load user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Show error notification if there's an error
  useEffect(() => {
    if (error) {
      addNotification("error", error);
    }
  }, [error, addNotification]);

  // Handle tab changes
  const handleTabChange = (tabIndex: number) => {
    const tabMap = ["profile", "preferences", "security"];
    setActiveTab(tabMap[tabIndex]);
  };

  // Set default tab index based on active tab
  const getTabIndex = () => {
    switch (activeTab) {
      case "profile":
        return 0;
      case "preferences":
        return 1;
      case "security":
        return 2;
      default:
        return 0;
    }
  };

  // Mobile-specific settings layout
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Mobile Header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Hamburger menu button */}
            <button
              type="button"
              className="text-gray-600"
              onClick={toggleMobileSidebar}
            >
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

            <h1 className="text-xl font-semibold text-primary-title">
              Setting
            </h1>

            <div className="w-6">
              {/* Empty div for flex spacing */}
              {profile?.profileImage && (
                <Avatar
                  src={profile.profileImage}
                  alt={profile.name || "User"}
                  size="sm"
                />
              )}
            </div>
          </div>

          {/* Searchbar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
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
                className="block w-full pl-10 pr-3 py-3 bg-gray-50 border-0 rounded-3xl text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search for something"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white px-4">
            <div className="border-b flex space-x-8">
              <button
                className={`py-4 text-center relative ${
                  activeTab === "profile"
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Edit Profile
                {activeTab === "profile" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button
                className={`py-4 text-center relative ${
                  activeTab === "preferences"
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("preferences")}
              >
                Preference
                {activeTab === "preferences" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button
                className={`py-4 text-center relative ${
                  activeTab === "security"
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
                {activeTab === "security" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-grow bg-gray-50 p-0">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <>
              {activeTab === "profile" && <EditProfile />}
              {activeTab === "preferences" && <Preferences />}
              {activeTab === "security" && <Security />}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-xl shadow">
        <Tabs defaultTab={getTabIndex()} onChange={handleTabChange}>
          <Tab label="Edit Profile">
            {profile ? (
              <EditProfile />
            ) : (
              <div className="p-4 text-center">
                {isLoading ? "Loading profile..." : "Profile not available"}
              </div>
            )}
          </Tab>
          <Tab label="Preferences">
            <Preferences />
          </Tab>
          <Tab label="Security">
            <Security />
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
