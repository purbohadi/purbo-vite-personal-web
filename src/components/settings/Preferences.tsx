import { useState, useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { UserPreferences } from '../../types';
import { saveToStorage, getFromStorage } from '../../utils/storage';

const Preferences: React.FC = () => {
  const { preferences, updatePreferences, isLoading } = useUserStore();
  const [formData, setFormData] = useState<Partial<UserPreferences>>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true,
    },
    language: 'english',
    timezone: 'UTC-8:00',
    currency: 'USD',
  });
  
  useEffect(() => {
    if (preferences) {
      setFormData(preferences);
      
      // Save preferences to localStorage for persistence
      saveToStorage('user_preferences', preferences);
    } else {
      // Try to load from storage if API hasn't loaded yet
      const storedPreferences = getFromStorage<UserPreferences | null>('user_preferences', null);
      if (storedPreferences) {
        setFormData(storedPreferences);
      }
    }
  }, [preferences]);

  if (!preferences && !getFromStorage<UserPreferences | null>('user_preferences', null)) {
    return <div className="p-4">Loading preferences...</div>;
  }
  
  const handleToggle = (name: keyof UserPreferences['notifications']) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications!,
        [name]: !prev.notifications![name]
      }
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async () => {
    const result = await updatePreferences(formData);
    if (result) {
      // Update local storage with new preferences
      saveToStorage('user_preferences', formData);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-t">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive emails about your account activity</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.notifications?.email} 
              onChange={() => handleToggle('email')} 
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Other notification toggles */}
      </div>
      
      <h3 className="text-lg font-semibold my-6">Regional Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {/* Timezone options */}
            <option value="UTC-8:00">UTC-8:00 (Pacific Time)</option>
            {/* Other timezone options */}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default Preferences;