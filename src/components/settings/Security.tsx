import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { UserSecurity, UserSession } from "../../types";
import { isStrongPassword, getPasswordStrength } from "../../utils/validators";
import { formatRelativeTime } from "../../utils/formatters";

const Security: React.FC = () => {
  const { security, updateSecurity, signOutSession, isLoading } =
    useUserStore();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (security) {
      setTwoFactorEnabled(security.twoFactorEnabled);
      setSessions(security.activeSessions);
    }
  }, [security]);

  // Update password strength when newPassword changes
  useEffect(() => {
    setPasswordStrength(getPasswordStrength(newPassword));
  }, [newPassword]);

  if (!security) {
    return <div className="p-4">Loading security settings...</div>;
  }

  const validatePasswordForm = (): boolean => {
    const errors: {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!isStrongPassword(newPassword)) {
      errors.newPassword =
        "Password must be at least 8 characters and include uppercase, lowercase, and numbers";
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    // Here you would typically make an API call to change the password
    alert("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStrength(0);
    setFormErrors({});
  };

  const handleToggleTwoFactor = async () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    await updateSecurity({ twoFactorEnabled: newValue });
  };

  const handleSignOut = async (sessionId: string) => {
    await signOutSession(sessionId);
  };

  // Password strength indicator
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-gray-200";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
        return "";
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Moderate";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-6">Change Password</h3>

        <form onSubmit={handleChangePassword}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full p-2 border ${
                  formErrors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full p-2 border ${
                  formErrors.newPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              />
              {passwordStrength > 0 && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getStrengthColor()}`}
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">
                      {getStrengthLabel()}
                    </span>
                  </div>
                </div>
              )}
              {formErrors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.newPassword}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border ${
                  formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold mb-6">
          Two-Factor Authentication
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleToggleTwoFactor}
              disabled={isLoading}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold mb-6">Active Sessions</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Device
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Active
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {session.device}
                        {session.isCurrent && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {session.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatRelativeTime(new Date())}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {!session.isCurrent && (
                      <button
                        onClick={() => handleSignOut(session.id)}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-900 disabled:text-red-300"
                      >
                        Sign out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Security;
