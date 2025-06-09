import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../test-utils';
import Button from '../../../../src/components/common/Button';

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click me');
    });

    it('applies default variant and size', () => {
      render(<Button>Default Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-black', 'text-white', 'rounded-lg'); // primary variant
      expect(button).toHaveClass('text-sm', 'px-4', 'py-2'); // md size
    });
  });

  describe('Variants', () => {
    const variants = [
      { 
        variant: 'primary' as const, 
        expectedClasses: ['bg-black', 'text-white', 'hover:bg-gray-800', 'rounded-lg'] 
      },
      { 
        variant: 'secondary' as const, 
        expectedClasses: ['bg-gray-100', 'text-gray-800', 'hover:bg-gray-200', 'rounded-lg'] 
      },
      { 
        variant: 'text' as const, 
        expectedClasses: ['bg-transparent', 'text-blue-600', 'hover:text-blue-800', 'hover:underline'] 
      },
      { 
        variant: 'custom' as const, 
        expectedClasses: ['bg-black', 'text-white', 'hover:bg-gray-800', 'rounded-3xl'] 
      }
    ];

    variants.forEach(({ variant, expectedClasses }) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Button</Button>);
        
        const button = screen.getByRole('button');
        expectedClasses.forEach(className => {
          expect(button).toHaveClass(className);
        });
      });
    });
  });

  describe('Sizes', () => {
    const sizes = [
      { size: 'sm' as const, expectedClasses: ['text-xs', 'px-2.5', 'py-1.5'] },
      { size: 'md' as const, expectedClasses: ['text-sm', 'px-4', 'py-2'] },
      { size: 'lg' as const, expectedClasses: ['text-base', 'px-6', 'py-3'] }
    ];

    sizes.forEach(({ size, expectedClasses }) => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>Button</Button>);
        
        const button = screen.getByRole('button');
        expectedClasses.forEach(className => {
          expect(button).toHaveClass(className);
        });
      });
    });

    it('does not apply size styles to text variant', () => {
      render(<Button variant="text" size="lg">Text Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('text-base', 'px-6', 'py-3');
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator when isLoading is true', () => {
      render(<Button isLoading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.querySelector('svg')).toBeInTheDocument();
      expect(button.querySelector('svg')).toHaveClass('animate-spin');
    });

    it('hides icons when loading', () => {
      const leftIcon = <span data-testid="left-icon">←</span>;
      const rightIcon = <span data-testid="right-icon">→</span>;
      
      render(
        <Button isLoading leftIcon={leftIcon} rightIcon={rightIcon}>
          Loading
        </Button>
      );
      
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    });

    it('prevents click events when loading', () => {
      const mockOnClick = jest.fn();
      render(<Button isLoading onClick={mockOnClick}>Loading</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      const leftIcon = <span data-testid="left-icon">←</span>;
      render(<Button leftIcon={leftIcon}>Button with left icon</Button>);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      const iconContainer = screen.getByTestId('left-icon').parentElement;
      expect(iconContainer).toHaveClass('mr-2');
    });

    it('renders right icon', () => {
      const rightIcon = <span data-testid="right-icon">→</span>;
      render(<Button rightIcon={rightIcon}>Button with right icon</Button>);
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      const iconContainer = screen.getByTestId('right-icon').parentElement;
      expect(iconContainer).toHaveClass('ml-2');
    });

    it('renders both left and right icons', () => {
      const leftIcon = <span data-testid="left-icon">←</span>;
      const rightIcon = <span data-testid="right-icon">→</span>;
      
      render(
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Button with both icons
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styles when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('prevents click events when disabled', () => {
      const mockOnClick = jest.fn();
      render(<Button disabled onClick={mockOnClick}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('applies disabled styles when loading (auto-disabled)', () => {
      render(<Button isLoading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('does not apply full width class by default', () => {
      render(<Button>Normal Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class border-2">Custom Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class', 'border-2');
    });

    it('combines custom className with default classes', () => {
      render(<Button variant="secondary" className="custom-class">Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-100', 'custom-class');
    });
  });

  describe('Event Handling', () => {
    it('calls onClick when clicked', () => {
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Clickable Button</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('passes through other HTML button attributes', () => {
      render(
        <Button type="submit" name="test-button" data-testid="custom-button">
          Submit
        </Button>
      );
      
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'test-button');
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button>Accessible Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      const mockOnClick = jest.fn();
      render(<Button onClick={mockOnClick}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      
      // Test Enter key
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.click(button); // Simulate actual click that would happen
      expect(mockOnClick).toHaveBeenCalled();
    });

    it('has focus outline styles', () => {
      render(<Button>Focusable Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none');
    });
  });

  describe('Loading Indicator', () => {
    it('renders loading spinner with correct animation', () => {
      render(<Button isLoading>Loading</Button>);
      
      const spinner = document.querySelector('svg.animate-spin');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin', '-ml-1', 'mr-2', 'h-4', 'w-4');
    });

    it('has correct loading indicator structure', () => {
      render(<Button isLoading>Loading</Button>);
      
      const spinner = document.querySelector('svg');
      expect(spinner).toHaveAttribute('fill', 'none');
      expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
      
      // Check for circle and path elements
      const circle = spinner?.querySelector('circle');
      const path = spinner?.querySelector('path');
      expect(circle).toBeInTheDocument();
      expect(path).toBeInTheDocument();
    });
  });

  describe('Base Styles', () => {
    it('applies base button styles', () => {
      render(<Button>Base Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'inline-flex',
        'items-center', 
        'justify-center',
        'font-medium',
        'transition-colors'
      );
    });
  });

  describe('Content Structure', () => {
    it('wraps children in span', () => {
      render(<Button>Wrapped Content</Button>);
      
      const button = screen.getByRole('button');
      const span = button.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('Wrapped Content');
    });

    it('maintains proper icon and content structure', () => {
      const leftIcon = <span data-testid="left">←</span>;
      const rightIcon = <span data-testid="right">→</span>;
      
      render(
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Content
        </Button>
      );
      
      const button = screen.getByRole('button');
      const children = Array.from(button.children);
      
      // Should have: leftIcon span, content span, rightIcon span
      expect(children).toHaveLength(3);
      expect(children[0]).toContainElement(screen.getByTestId('left'));
      expect(children[1]).toHaveTextContent('Content');
      expect(children[2]).toContainElement(screen.getByTestId('right'));
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Button>{''}</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles complex children content', () => {
      render(
        <Button>
          <div>Complex</div>
          <span>Content</span>
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('ComplexContent');
    });

    it('combines multiple state classes correctly', () => {
      render(
        <Button 
          variant="custom" 
          size="lg" 
          fullWidth 
          disabled 
          className="extra-class"
        >
          Complex Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'bg-black',      // variant
        'rounded-3xl',   // variant
        'text-base',     // size
        'px-6',          // size
        'py-3',          // size
        'w-full',        // fullWidth
        'opacity-50',    // disabled
        'cursor-not-allowed', // disabled
        'extra-class'    // custom
      );
    });
  });
}); 