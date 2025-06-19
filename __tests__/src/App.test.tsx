import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders all main sections', () => {
    render(<App />);
    
    // Check if all main sections are rendered
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Navbar
    expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });

  it('initializes dark mode from localStorage', () => {
    // Set dark mode in localStorage
    localStorage.setItem('darkMode', 'true');
    
    render(<App />);
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('bg-gray-700');
  });

  it('toggles dark mode on button click', () => {
    render(<App />);
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i });
    const mainContainer = screen.getByRole('main');
    
    // Initially should be light mode
    expect(mainContainer).not.toHaveClass('bg-gray-700');
    
    // Toggle to dark mode
    fireEvent.click(darkModeButton);
    expect(mainContainer).toHaveClass('bg-gray-700');
    
    // Toggle back to light mode
    fireEvent.click(darkModeButton);
    expect(mainContainer).not.toHaveClass('bg-gray-700');
  });

  it('persists dark mode preference in localStorage', () => {
    render(<App />);
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i });
    
    // Toggle to dark mode
    fireEvent.click(darkModeButton);
    expect(localStorage.getItem('darkMode')).toBe('true');
    
    // Toggle back to light mode
    fireEvent.click(darkModeButton);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  it('applies dark mode styles to all sections', () => {
    render(<App />);
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i });
    
    // Toggle to dark mode
    fireEvent.click(darkModeButton);
    
    // Check if dark mode styles are applied to main sections
    const sections = screen.getAllByRole('region');
    sections.forEach(section => {
      expect(section).toHaveClass('bg-gray-900');
    });
  });

  it('renders correct dark mode toggle icon', () => {
    render(<App />);
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i });
    
    // Initially should show moon icon (dark mode off)
    expect(screen.getByRole('img', { name: /moon/i })).toBeInTheDocument();
    
    // Toggle to dark mode
    fireEvent.click(darkModeButton);
    expect(screen.getByRole('img', { name: /sun/i })).toBeInTheDocument();
  });
}); 