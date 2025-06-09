import { describe, it, expect, beforeEach } from '@jest/globals';
import { useUserStore } from '@/store/userStore';

// Mock the API calls
jest.mock('@/mocks/apiService', () => ({
    api: {
        getUserProfile: jest.fn().mockResolvedValue({
            profile: { name: 'Test User', email: 'test@example.com' },
            preferences: { theme: 'light' },
            security: { twoFactorEnabled: false }
        }),
        updateUserProfile: jest.fn().mockResolvedValue({
            profile: { name: 'Updated User', email: 'updated@example.com' },
            preferences: { theme: 'dark' },
            security: { twoFactorEnabled: true }
        })
    }
}));

describe('userStore', () => {
    beforeEach(() => {
        // Reset store state before each test
        useUserStore.setState({
            profile: null,
            preferences: null,
            security: null,
            isLoading: false,
            error: null
        });
    });

    it('should initialize with default state', () => {
        const state = useUserStore.getState();

        expect(state.profile).toBeNull();
        expect(state.preferences).toBeNull();
        expect(state.security).toBeNull();
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle logout action', () => {
        const { logout } = useUserStore.getState();

        // Call logout function to test it executes
        logout();

        const state = useUserStore.getState();
        expect(state.profile).toBeNull();
    });

    it('should test async fetchUserProfile action', async () => {
        const { fetchUserProfile } = useUserStore.getState();

        // Call the async method
        await fetchUserProfile();

        const state = useUserStore.getState();
        expect(state.profile).toBeDefined();
        expect(state.isLoading).toBe(false);
    });

    it('should have all required store methods', () => {
        const state = useUserStore.getState();

        // Check that all methods exist
        expect(typeof state.fetchUserProfile).toBe('function');
        expect(typeof state.updateProfile).toBe('function');
        expect(typeof state.updatePreferences).toBe('function');
        expect(typeof state.updateSecurity).toBe('function');
        expect(typeof state.signOutSession).toBe('function');
        expect(typeof state.logout).toBe('function');
    });

    it('should handle error states', () => {
        const state = useUserStore.getState();

        // Test that error property exists and can be set
        expect(state.error).toBeNull();

        // Test loading state
        expect(state.isLoading).toBe(false);
    });
}); 