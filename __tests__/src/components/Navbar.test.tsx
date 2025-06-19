import { render, screen, fireEvent } from '@testing-library/react';
import NavbarSimple from '../../../src/components/Navbar';
import { firstName, lastName } from '../../../src/information';

// Mock window.scrollTo to avoid JSDOM error
window.scrollTo = jest.fn();

describe('NavbarSimple', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024 // Default to desktop view
    });

    // Clear mocks
    jest.clearAllMocks();
  });

  it('renders the navbar with correct name', () => {
    render(<NavbarSimple />);
    expect(screen.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
  });

  it('handles smooth scroll when clicking nav links', () => {
    // Create a mock element with scrollIntoView
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<NavbarSimple />);
    const homeLink = screen.getByText(`${firstName} ${lastName}`);
    
    fireEvent.click(homeLink);
    
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    });
  });

  it('toggles mobile menu on button click', () => {
    // Set mobile view
    window.innerWidth = 800;
    
    render(<NavbarSimple />);
    const menuButton = screen.getByRole('button', { name: /open navigation/i });
    
    // Initially menu should be closed (mobile menu should be hidden)
    expect(menuButton).toBeInTheDocument();
    
    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Close Navigation')).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(screen.getByLabelText('Close Navigation'));
    expect(screen.getByLabelText('Open Navigation')).toBeInTheDocument();
  });

  it('closes mobile menu on window resize to desktop', () => {
    // Start with mobile view
    window.innerWidth = 800;
    render(<NavbarSimple />);
    
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Menu should be open
    expect(screen.getByLabelText('Close Navigation')).toBeInTheDocument();
    
    // Resize to desktop
    window.innerWidth = 1024;
    fireEvent.resize(window);
    
    // Menu should be closed in mobile view but visible in desktop view
    expect(screen.getByLabelText('Open Navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('list')[0].parentElement).toHaveClass('lg:block');
  });

  it('renders all navigation links', () => {
    render(<NavbarSimple />);
    
    const links = ['Home', 'Education', 'Experience', 'Contact'];
    links.forEach(link => {
      // Get all instances of the link text (desktop and mobile)
      const linkElements = screen.getAllByText(link);
      expect(linkElements.length).toBe(2); // One for desktop, one for mobile
      
      // Check that the desktop link is visible
      const desktopLink = linkElements.find(el => 
        el.closest('div')?.classList.contains('lg:block')
      );
      expect(desktopLink).toBeInTheDocument();
    });
  });

  it('changes icon when mobile menu is toggled', () => {
    // Set mobile view
    window.innerWidth = 800;
    
    render(<NavbarSimple />);
    const menuButton = screen.getByRole('button');
    
    // Initially should show menu icon
    expect(screen.getByLabelText('Open Navigation')).toBeInTheDocument();
    
    // Click to open
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Close Navigation')).toBeInTheDocument();
    
    // Click to close
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Open Navigation')).toBeInTheDocument();
  });

  it('removes resize event listener on unmount', () => {
    const { unmount } = render(<NavbarSimple />);
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
}); 