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

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useLocalStorage<string>(
    "settings_active_tab",
    "profile"
  );
  const { profile, isLoading, error, fetchUserProfile } = useUserStore();
  const { addNotification } = useNotificationContext();

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
