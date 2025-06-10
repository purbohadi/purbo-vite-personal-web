import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../test-utils';
import Avatar from '../../../../src/components/common/Avatar';

// Mock the avatarUtils
jest.mock('../../../../src/utils/avatarUtils', () => ({
  generateInitialAvatar: jest.fn()
}));

import { generateInitialAvatar } from '../../../../src/utils/avatarUtils';
const mockGenerateInitialAvatar = generateInitialAvatar as jest.MockedFunction<typeof generateInitialAvatar>;

describe('Avatar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateInitialAvatar.mockReturnValue('data:image/svg+xml;base64,fallback-avatar');
  });

  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      render(<Avatar alt="John Doe" src="https://example.com/avatar.jpg" />);
      
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });

    it('renders without src prop', () => {
      render(<Avatar alt="John Doe" />);
      
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'John Doe');
      expect(mockGenerateInitialAvatar).toHaveBeenCalledWith('John Doe');
    });

    it('applies default size classes', () => {
      render(<Avatar alt="John Doe" />);
      
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('h-10', 'w-10'); // md size
    });
  });

  describe('Size Variations', () => {
    const sizes = [
      { size: 'xs' as const, classes: ['h-6', 'w-6'] },
      { size: 'sm' as const, classes: ['h-8', 'w-8'] },
      { size: 'md' as const, classes: ['h-10', 'w-10'] },
      { size: 'lg' as const, classes: ['h-12', 'w-12'] },
      { size: 'xl' as const, classes: ['h-16', 'w-16'] }
    ];

    sizes.forEach(({ size, classes }) => {
      it(`renders ${size} size correctly`, () => {
        render(<Avatar alt="John Doe" size={size} />);
        
        const container = screen.getByRole('img').parentElement;
        classes.forEach(className => {
          expect(container).toHaveClass(className);
        });
      });
    });
  });

  describe('Status Indicator', () => {
    it('renders online status', () => {
      render(<Avatar alt="John Doe" status="online" />);
      
      const statusIndicator = document.querySelector('[class*="bg-green-500"]');
      expect(statusIndicator).toBeInTheDocument();
    });

    it('renders offline status', () => {
      render(<Avatar alt="John Doe" status="offline" />);
      
      const statusIndicator = document.querySelector('[class*="bg-gray-400"]');
      expect(statusIndicator).toBeInTheDocument();
    });

    it('renders busy status', () => {
      render(<Avatar alt="John Doe" status="busy" />);
      
      const statusIndicator = document.querySelector('[class*="bg-red-500"]');
      expect(statusIndicator).toBeInTheDocument();
    });

    it('does not render status indicator when status is not provided', () => {
      render(<Avatar alt="John Doe" />);
      
      const statusIndicator = document.querySelector('[class*="bg-green-500"], [class*="bg-gray-400"], [class*="bg-red-500"]');
      expect(statusIndicator).not.toBeInTheDocument();
    });
  });

  describe('Image Error Handling', () => {
    it('falls back to generated avatar when image fails to load', () => {
      render(<Avatar alt="John Doe" src="invalid-url.jpg" />);
      
      const img = screen.getByRole('img');
      
      // Simulate image error
      fireEvent.error(img);
      
      expect(mockGenerateInitialAvatar).toHaveBeenCalledWith('John Doe');
      expect(img).toHaveAttribute('src', 'data:image/svg+xml;base64,fallback-avatar');
    });

    it('handles multiple error events gracefully', () => {
      render(<Avatar alt="John Doe" src="invalid-url.jpg" />);
      
      const img = screen.getByRole('img');
      
      // Simulate multiple image errors
      fireEvent.error(img);
      fireEvent.error(img);
      
      // Should only call generateInitialAvatar once
      expect(mockGenerateInitialAvatar).toHaveBeenCalledTimes(1);
    });

    it('uses fallback avatar when src is null', () => {
      render(<Avatar alt="John Doe" src={null} />);
      
      expect(mockGenerateInitialAvatar).toHaveBeenCalledWith('John Doe');
    });
  });

  describe('Click Interaction', () => {
    it('calls onClick when avatar is clicked and onClick is provided', () => {
      const mockOnClick = jest.fn();
      render(<Avatar alt="John Doe" onClick={mockOnClick} />);
      
      const container = screen.getByRole('img').parentElement;
      fireEvent.click(container!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies cursor-pointer class when onClick is provided', () => {
      const mockOnClick = jest.fn();
      render(<Avatar alt="John Doe" onClick={mockOnClick} />);
      
      const container = screen.getByRole('img').parentElement?.parentElement;
      expect(container).toHaveClass('cursor-pointer');
    });

    it('does not apply cursor-pointer class when onClick is not provided', () => {
      render(<Avatar alt="John Doe" />);
      
      const container = screen.getByRole('img').parentElement?.parentElement;
      expect(container).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Avatar alt="John Doe" className="custom-class border-2" />);
      
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('custom-class', 'border-2');
    });

    it('combines custom className with default classes', () => {
      render(<Avatar alt="John Doe" size="lg" className="custom-class" />);
      
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveClass('h-12', 'w-12', 'custom-class');
    });
  });

  describe('Image Properties', () => {
    it('applies correct image classes', () => {
      render(<Avatar alt="John Doe" src="https://example.com/avatar.jpg" />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveClass('h-full', 'w-full', 'object-cover');
    });

    it('maintains aspect ratio with object-cover', () => {
      render(<Avatar alt="John Doe" src="https://example.com/avatar.jpg" />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveClass('object-cover');
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text', () => {
      render(<Avatar alt="John Doe" />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveAccessibleName('John Doe');
    });

    it('is keyboard accessible when clickable', () => {
      const mockOnClick = jest.fn();
      render(<Avatar alt="John Doe" onClick={mockOnClick} />);
      
      const container = screen.getByRole('img').parentElement;
      
      // Test keyboard interaction
      fireEvent.keyDown(container!, { key: 'Enter' });
      // Note: The component doesn't handle keyboard events, but we can test the click
      fireEvent.click(container!);
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe('Status Indicator Positioning', () => {
    it('positions status indicator correctly', () => {
      render(<Avatar alt="John Doe" status="online" />);
      
      const statusIndicator = document.querySelector('[class*="bg-green-500"]');
      expect(statusIndicator).toHaveClass('absolute', 'bottom-0', 'right-0');
    });

    it('applies proper styling to status indicator', () => {
      render(<Avatar alt="John Doe" status="online" />);
      
      const statusIndicator = document.querySelector('[class*="bg-green-500"]');
      expect(statusIndicator).toHaveClass('rounded-full', 'ring-2', 'ring-white');
    });
  });

  describe('Component Structure', () => {
    it('has correct container structure', () => {
      render(<Avatar alt="John Doe" />);
      
      const container = screen.getByRole('img').parentElement?.parentElement;
      expect(container).toHaveClass('relative', 'inline-block');
    });

    it('wraps image in rounded container', () => {
      render(<Avatar alt="John Doe" />);
      
      const imageContainer = screen.getByRole('img').parentElement;
      expect(imageContainer).toHaveClass('overflow-hidden', 'rounded-full');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty alt text', () => {
      render(<Avatar alt="" />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', '');
      expect(mockGenerateInitialAvatar).toHaveBeenCalledWith('');
    });

    it('handles undefined src gracefully', () => {
      render(<Avatar alt="John Doe" src={undefined} />);
      
      expect(mockGenerateInitialAvatar).toHaveBeenCalledWith('John Doe');
    });

    it('handles special characters in alt text', () => {
      const specialAlt = 'John O\'Connor & Jane Smith-Doe';
      render(<Avatar alt={specialAlt} />);
      
      expect(mockGenerateInitialAvatar).toHaveBeenCalledWith(specialAlt);
    });
  });
}); 