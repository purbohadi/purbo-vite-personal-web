import { create } from 'zustand';
import { UserProfile, UserPreferences, UserSecurity } from '../types';
import { api } from '../mock/apiService';

interface UserState {
  profile: UserProfile | null;
  preferences: UserPreferences | null;
  security: UserSecurity | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUserProfile: () => Promise<void>;
  updateProfile: (updatedProfile: Partial<UserProfile>) => Promise<boolean>;
  updatePreferences: (updatedPreferences: Partial<UserPreferences>) => Promise<boolean>;
  updateSecurity: (updates: { twoFactorEnabled?: boolean; }) => Promise<boolean>;
  signOutSession: (sessionId: string) => Promise<boolean>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  preferences: null,
  security: null,
  isLoading: false,
  error: null,
  
  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const userData = await api.getUserProfile();
            
      set({
        profile: userData.profile,
        preferences: userData.preferences,
        security: userData.security,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch user profile',
        isLoading: false
      });
    }
  },
  
  updateProfile: async (updatedProfile) => {
    set({ isLoading: true, error: null });
    try {
      // Get the current full profile
      const currentProfile = get().profile;
      if (!currentProfile) {
        throw new Error('Profile not loaded');
      }
      
      // Merge with updates
      const updatedData = await api.updateUserProfile({
        profile: { ...currentProfile, ...updatedProfile }
      });
      
      // Update the state with the new profile
      set({
        profile: updatedData.profile,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update profile',
        isLoading: false
      });
      return false;
    }
  },
  
  updatePreferences: async (updatedPreferences) => {
    set({ isLoading: true, error: null });
    try {
      // Get the current preferences
      const currentPrefs = get().preferences;
      if (!currentPrefs) {
        throw new Error('Preferences not loaded');
      }
      
      // Merge with updates
      const updatedPrefs = {
        ...currentPrefs,
        ...updatedPreferences
      };
      
      // Update the user profile including the new preferences
      const result = await api.updateUserProfile({ preferences: updatedPrefs });
      
      // Update just the preferences in the state
      set({
        preferences: result.preferences,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update preferences',
        isLoading: false
      });
      return false;
    }
  },
  
  updateSecurity: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      const currentSecurity = get().security;
      if (!currentSecurity) {
        throw new Error('Security settings not loaded');
      }
      
      // Update security settings
      const updatedSecurity = {
        ...currentSecurity,
        ...updates
      };
      
      // Update the user profile with the new security settings
      const result = await api.updateUserProfile({ security: updatedSecurity });
      
      // Update just the security settings in the state
      set({
        security: result.security,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update security settings',
        isLoading: false
      });
      return false;
    }
  },
  
  signOutSession: async (sessionId) => {
    set({ isLoading: true, error: null });
    try {
      const currentSecurity = get().security;
      if (!currentSecurity) {
        throw new Error('Security settings not loaded');
      }
      
      // Filter out the session to remove
      const updatedSessions = currentSecurity.activeSessions.filter(
        session => session.id !== sessionId
      );
      
      // Create updated security object
      const updatedSecurity = {
        ...currentSecurity,
        activeSessions: updatedSessions
      };
      
      // Update the user profile
      const result = await api.updateUserProfile({ security: updatedSecurity });
      
      // Update security in state
      set({
        security: result.security,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign out session',
        isLoading: false
      });
      return false;
    }
  },
    // Implement logout functionality
    logout: () => {
      // Clear user profile data
      set({ profile: null });
      
      // Clear local storage if needed
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_profile');
      
      // In a real application, you might also want to call an API to invalidate the session
      console.log('User logged out');
    }
}));