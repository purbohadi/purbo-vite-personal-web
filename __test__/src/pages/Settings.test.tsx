import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { act } from '@testing-library/react';
import Settings from '../../../src/pages/Settings';

// Mock the hooks
jest.mock('../../../src/hooks/useLocalStorage');
jest.mock('../../../src/hooks/useMediaQuery');
jest.mock('../../../src/store/userStore');
jest.mock('../../../src/components/providers/NotificationProvider');

// Mock the child components
jest.mock('../../../src/components/layout/MainLayout', () => {
  return function MockMainLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="main-layout">{children}</div>;
  };
});

jest.mock('../../../src/components/common/Tabs', () => {
  return {
    __esModule: true,
    default: function MockTabs({ 
      children, 
      defaultTab = 0, 
      onChange 
    }: { 
      children: React.ReactNode; 
      defaultTab?: number; 
      onChange?: (index: number) => void; 
    }) {
      const [activeIndex, setActiveIndex] = React.useState(defaultTab);
      
      const tabs = React.Children.toArray(children);
      
      return (
        <div data-testid="tabs-container">
          <div data-testid="tab-buttons">
            {tabs.map((_, index) => (
              <button
                key={index}
                data-testid={`tab-button-${index}`}
                className={activeIndex === index ? 'active' : ''}
                onClick={() => {
                  setActiveIndex(index);
                  onChange?.(index);
                }}
              >
                Tab {index}
              </button>
            ))}
          </div>
          <div data-testid="tab-content">
            {tabs[activeIndex]}
          </div>
        </div>
      );
    },
    Tab: function MockTab({ label, children }: { label: string; children: React.ReactNode }) {
      return <div data-testid={`tab-${label.toLowerCase().replace(/\s+/g, '-')}`}>{children}</div>;
    }
  };
});

jest.mock('../../../src/components/settings/EditProfile', () => {
  return function MockEditProfile() {
    return <div data-testid="edit-profile">Edit Profile Component</div>;
  };
});

jest.mock('../../../src/components/settings/Preferences', () => {
  return function MockPreferences() {
    return <div data-testid="preferences">Preferences Component</div>;
  };
});

jest.mock('../../../src/components/settings/Security', () => {
  return function MockSecurity() {
    return <div data-testid="security">Security Component</div>;
  };
});

jest.mock('../../../src/components/common/Avatar', () => {
  return function MockAvatar({ src, alt, size }: { src: string; alt: string; size: string }) {
    return <img data-testid="avatar" src={src} alt={alt} data-size={size} />;
  };
});

jest.mock('../../../src/components/layout/MobileSidebar', () => {
  return function MockMobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return isOpen ? (
      <div data-testid="mobile-sidebar">
        <button data-testid="close-sidebar" onClick={onClose}>Close</button>
      </div>
    ) : null;
  };
});

// Import mocked modules
import { useLocalStorage } from '../../../src/hooks/useLocalStorage';
import { useIsMobile } from '../../../src/hooks/useMediaQuery';
import { useUserStore } from '../../../src/store/userStore';
import { useNotificationContext } from '../../../src/components/providers/NotificationProvider';

const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<typeof useLocalStorage>;
const mockUseIsMobile = useIsMobile as jest.MockedFunction<typeof useIsMobile>;
const mockUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;
const mockUseNotificationContext = useNotificationContext as jest.MockedFunction<typeof useNotificationContext>;

describe('Settings Component', () => {
  // Default mock implementations
  const mockSetActiveTab = jest.fn();
  const mockFetchUserProfile = jest.fn();
  const mockAddNotification = jest.fn();

  const defaultUserStore = {
    profile: {
      id: 'user-1',
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      profileImage: 'https://example.com/avatar.jpg',
      dob: '1990-01-01',
      presentAddress: '123 Main St',
      permanentAddress: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
      joinDate: '2023-01-01'
    },
    isLoading: false,
    error: null,
    fetchUserProfile: mockFetchUserProfile
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    mockUseLocalStorage.mockReturnValue(['profile', mockSetActiveTab]);
    mockUseIsMobile.mockReturnValue(false);
    mockUseUserStore.mockReturnValue(defaultUserStore);
    mockUseNotificationContext.mockReturnValue({
      addNotification: mockAddNotification
    });
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      mockUseIsMobile.mockReturnValue(false);
    });

    it('renders desktop layout with MainLayout wrapper', () => {
      render(<Settings />);
      
      expect(screen.getByTestId('main-layout')).toBeInTheDocument();
      expect(screen.getByTestId('tabs-container')).toBeInTheDocument();
    });

    it('renders all three tabs in desktop mode', () => {
      render(<Settings />);
      
      // In desktop mode, we have Tab components, check for tab buttons
      expect(screen.getByTestId('tab-button-0')).toBeInTheDocument();
      expect(screen.getByTestId('tab-button-1')).toBeInTheDocument(); 
      expect(screen.getByTestId('tab-button-2')).toBeInTheDocument();
    });

    it('shows EditProfile component by default when activeTab is profile', () => {
      mockUseLocalStorage.mockReturnValue(['profile', mockSetActiveTab]);
      
      render(<Settings />);
      
      expect(screen.getByTestId('edit-profile')).toBeInTheDocument();
    });

    it('shows Preferences component when activeTab is preferences', () => {
      mockUseLocalStorage.mockReturnValue(['preferences', mockSetActiveTab]);
      
      render(<Settings />);
      
      expect(screen.getByTestId('preferences')).toBeInTheDocument();
    });

    it('shows Security component when activeTab is security', () => {
      mockUseLocalStorage.mockReturnValue(['security', mockSetActiveTab]);
      
      render(<Settings />);
      
      expect(screen.getByTestId('security')).toBeInTheDocument();
    });

    it('handles tab changes correctly', () => {
      render(<Settings />);
      
      // Click on second tab (preferences)
      fireEvent.click(screen.getByTestId('tab-button-1'));
      
      expect(mockSetActiveTab).toHaveBeenCalledWith('preferences');
    });

    it('defaults to profile tab when activeTab is invalid', () => {
      mockUseLocalStorage.mockReturnValue(['invalid-tab', mockSetActiveTab]);
      
      render(<Settings />);
      
      // Should default to tab index 0 (profile)
      expect(screen.getByTestId('tab-button-0')).toHaveClass('active');
    });

    it('shows loading message when profile is loading', () => {
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        profile: null,
        isLoading: true
      });
      
      render(<Settings />);
      
      expect(screen.getByText('Loading profile...')).toBeInTheDocument();
    });

    it('shows profile not available message when profile is null and not loading', () => {
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        profile: null,
        isLoading: false
      });
      
      render(<Settings />);
      
      expect(screen.getByText('Profile not available')).toBeInTheDocument();
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      mockUseIsMobile.mockReturnValue(true);
    });

    it('renders mobile layout without MainLayout wrapper', () => {
      render(<Settings />);
      
      expect(screen.queryByTestId('main-layout')).not.toBeInTheDocument();
      expect(screen.getByText('Setting')).toBeInTheDocument();
    });

    it('renders mobile header with hamburger menu', () => {
      render(<Settings />);
      
      // Find hamburger button by its position (first button)
      const buttons = screen.getAllByRole('button');
      const hamburgerButton = buttons[0]; // First button is the hamburger menu
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveClass('text-gray-600');
    });

    it('renders search input in mobile layout', () => {
      render(<Settings />);
      
      const searchInput = screen.getByPlaceholderText('Search for something');
      expect(searchInput).toBeInTheDocument();
    });

    it('renders mobile tab buttons', () => {
      render(<Settings />);
      
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
      expect(screen.getByText('Preference')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
    });

    it('handles mobile sidebar toggle', () => {
      render(<Settings />);
      
      const buttons = screen.getAllByRole('button');
      const hamburgerButton = buttons[0]; // First button is the hamburger menu
      
      // Initially sidebar should be closed
      expect(screen.queryByTestId('mobile-sidebar')).not.toBeInTheDocument();
      
      // Click to open sidebar
      fireEvent.click(hamburgerButton);
      
      expect(screen.getByTestId('mobile-sidebar')).toBeInTheDocument();
    });

    it('closes mobile sidebar when close button is clicked', () => {
      render(<Settings />);
      
      const buttons = screen.getAllByRole('button');
      const hamburgerButton = buttons[0]; // First button is the hamburger menu
      
      // Open sidebar
      fireEvent.click(hamburgerButton);
      expect(screen.getByTestId('mobile-sidebar')).toBeInTheDocument();
      
      // Close sidebar
      fireEvent.click(screen.getByTestId('close-sidebar'));
      expect(screen.queryByTestId('mobile-sidebar')).not.toBeInTheDocument();
    });

    it('shows user avatar in mobile header when profile has image', () => {
      render(<Settings />);
      
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      expect(avatar).toHaveAttribute('alt', 'John Doe');
      expect(avatar).toHaveAttribute('data-size', 'sm');
    });

    it('does not show avatar when profile has no image', () => {
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        profile: {
          ...defaultUserStore.profile!,
          profileImage: undefined
        }
      });
      
      render(<Settings />);
      
      expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
    });

    it('handles mobile tab clicks correctly', () => {
      render(<Settings />);
      
      // Click on preferences tab
      fireEvent.click(screen.getByText('Preference'));
      
      expect(mockSetActiveTab).toHaveBeenCalledWith('preferences');
    });

    it('shows active tab styling in mobile view', () => {
      mockUseLocalStorage.mockReturnValue(['preferences', mockSetActiveTab]);
      
      render(<Settings />);
      
      const preferencesTab = screen.getByText('Preference');
      expect(preferencesTab).toHaveClass('text-blue-600', 'font-medium');
    });

    it('shows loading message in mobile view', () => {
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        isLoading: true
      });
      
      render(<Settings />);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders correct tab content in mobile view', () => {
      mockUseLocalStorage.mockReturnValue(['security', mockSetActiveTab]);
      
      render(<Settings />);
      
      expect(screen.getByTestId('security')).toBeInTheDocument();
      expect(screen.queryByTestId('edit-profile')).not.toBeInTheDocument();
      expect(screen.queryByTestId('preferences')).not.toBeInTheDocument();
    });
  });

  describe('Data Loading and Error Handling', () => {
    it('calls fetchUserProfile on component mount', () => {
      render(<Settings />);
      
      expect(mockFetchUserProfile).toHaveBeenCalledTimes(1);
    });

    it('shows error notification when there is an error', async () => {
      const errorMessage = 'Failed to load user profile';
      
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        error: errorMessage
      });
      
      render(<Settings />);
      
      await waitFor(() => {
        expect(mockAddNotification).toHaveBeenCalledWith('error', errorMessage);
      });
    });

    it('does not show error notification when error is null', () => {
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        error: null
      });
      
      render(<Settings />);
      
      expect(mockAddNotification).not.toHaveBeenCalled();
    });

    it('re-calls addNotification when error changes', async () => {
      const { rerender } = render(<Settings />);
      
      // Initially no error
      expect(mockAddNotification).not.toHaveBeenCalled();
      
      // Update with error
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        error: 'New error'
      });
      
      rerender(<Settings />);
      
      await waitFor(() => {
        expect(mockAddNotification).toHaveBeenCalledWith('error', 'New error');
      });
    });
  });

  describe('Tab State Management', () => {
    it('uses localStorage to persist active tab', () => {
      render(<Settings />);
      
      expect(mockUseLocalStorage).toHaveBeenCalledWith('settings_active_tab', 'profile');
    });

    it('maps tab indices to correct tab names', () => {
      const { rerender } = render(<Settings />);
      
      // Test all tab mappings by simulating tab changes
      const tabMappings = [
        { index: 0, expected: 'profile' },
        { index: 1, expected: 'preferences' },
        { index: 2, expected: 'security' }
      ];
      
      tabMappings.forEach(({ index, expected }) => {
        // Reset mock
        mockSetActiveTab.mockClear();
        
        // Re-render to trigger tab change handler
        rerender(<Settings />);
        
        // Simulate tab change
        fireEvent.click(screen.getByTestId(`tab-button-${index}`));
        
        expect(mockSetActiveTab).toHaveBeenCalledWith(expected);
      });
    });

    it('handles getTabIndex correctly for all valid tabs', () => {
      const tabTests = [
        { activeTab: 'profile', expectedIndex: 0 },
        { activeTab: 'preferences', expectedIndex: 1 },
        { activeTab: 'security', expectedIndex: 2 },
        { activeTab: 'invalid', expectedIndex: 0 } // defaults to 0
      ];
      
      tabTests.forEach(({ activeTab, expectedIndex }) => {
        mockUseLocalStorage.mockReturnValue([activeTab, mockSetActiveTab]);
        
        const { unmount } = render(<Settings />);
        
        const activeButton = screen.getByTestId(`tab-button-${expectedIndex}`);
        expect(activeButton).toHaveClass('active');
        
        unmount();
      });
    });
  });

  describe('Component Integration', () => {
    it('passes correct props to child components', () => {
      render(<Settings />);
      
      // EditProfile should be rendered when profile tab is active
      expect(screen.getByTestId('edit-profile')).toBeInTheDocument();
      expect(screen.getByText('Edit Profile Component')).toBeInTheDocument();
    });

    it('handles missing profile gracefully', () => {
      mockUseUserStore.mockReturnValue({
        ...defaultUserStore,
        profile: null
      });
      
      render(<Settings />);
      
      expect(screen.getByText('Profile not available')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure in mobile view', () => {
      mockUseIsMobile.mockReturnValue(true);
      
      render(<Settings />);
      
      const heading = screen.getByRole('heading', { name: 'Setting' });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('has accessible button for mobile sidebar toggle', () => {
      mockUseIsMobile.mockReturnValue(true);
      
      render(<Settings />);
      
      const buttons = screen.getAllByRole('button');
      const toggleButton = buttons[0]; // First button is the hamburger menu
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('type', 'button');
    });

    it('has accessible search input', () => {
      mockUseIsMobile.mockReturnValue(true);
      
      render(<Settings />);
      
      const searchInput = screen.getByPlaceholderText('Search for something');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });
  });
}); 