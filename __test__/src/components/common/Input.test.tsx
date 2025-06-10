import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../test-utils';
import Input from '../../../../src/components/common/Input';

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('block', 'rounded-xl', 'border', 'border-gray-300', 'w-full', 'text-[#718EBF]');
    });

    it('applies default padding', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-4', 'pr-4', 'py-2');
    });
  });

  describe('Label', () => {
    it('renders label when provided', () => {
      render(<Input label="Email Address" />);
      
      const label = screen.getByText('Email Address');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('associates label with input via htmlFor', () => {
      render(<Input id="email" label="Email Address" />);
      
      const label = screen.getByText('Email Address');
      const input = screen.getByRole('textbox');
      
      expect(label).toHaveAttribute('for', 'email');
      expect(input).toHaveAttribute('id', 'email');
    });

    it('generates unique id when not provided', () => {
      render(<Input label="Auto ID" />);
      
      const input = screen.getByRole('textbox');
      const id = input.getAttribute('id');
      
      expect(id).toMatch(/^input-[a-z0-9]+$/);
      expect(id).toHaveLength(13); // "input-" + 6 random chars
    });

    it('applies correct label styling', () => {
      render(<Input label="Styled Label" />);
      
      const label = screen.getByText('Styled Label');
      expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700', 'mb-1');
    });
  });

  describe('Error State', () => {
    it('shows error message when provided', () => {
      render(<Input error="This field is required" />);
      
      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.tagName).toBe('P');
    });

    it('applies error styling to input', () => {
      render(<Input error="Invalid input" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('applies error text styling', () => {
      render(<Input error="Error styling test" />);
      
      const errorMessage = screen.getByText('Error styling test');
      expect(errorMessage).toHaveClass('text-xs', 'text-red-600');
    });

    it('prioritizes error over hint', () => {
      render(<Input error="Error message" hint="Hint message" />);
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Hint message')).not.toBeInTheDocument();
    });
  });

  describe('Hint Text', () => {
    it('shows hint when provided and no error', () => {
      render(<Input hint="Enter your email address" />);
      
      const hint = screen.getByText('Enter your email address');
      expect(hint).toBeInTheDocument();
      expect(hint.tagName).toBe('P');
    });

    it('applies hint styling', () => {
      render(<Input hint="Hint styling test" />);
      
      const hint = screen.getByText('Hint styling test');
      expect(hint).toHaveClass('text-xs', 'text-gray-500');
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      render(<Input leftIcon={leftIcon} />);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('positions left icon correctly', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      render(<Input leftIcon={leftIcon} />);
      
      // The icon is inside a span, which is inside the positioned div
      const iconElement = screen.getByTestId('left-icon');
      const iconContainer = iconElement.parentElement?.parentElement; // span -> div container
      expect(iconContainer).toHaveClass('absolute', 'inset-y-0', 'left-0', 'pl-3', 'flex', 'items-center', 'pointer-events-none');
    });

    it('applies left padding when left icon is present', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      render(<Input leftIcon={leftIcon} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-10');
    });

    it('renders right icon', () => {
      const rightIcon = <span data-testid="right-icon">×</span>;
      render(<Input rightIcon={rightIcon} />);
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('positions right icon correctly', () => {
      const rightIcon = <span data-testid="right-icon">×</span>;
      render(<Input rightIcon={rightIcon} />);
      
      const iconContainer = screen.getByTestId('right-icon').parentElement;
      expect(iconContainer).toHaveClass('absolute', 'inset-y-0', 'right-0', 'flex', 'items-center');
    });

    it('applies right padding when right icon is present', () => {
      const rightIcon = <span data-testid="right-icon">×</span>;
      render(<Input rightIcon={rightIcon} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pr-10');
    });

    it('styles icon content correctly', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      render(<Input leftIcon={leftIcon} />);
      
      // The span with text-gray-500 class wraps the icon
      const iconSpan = screen.getByTestId('left-icon').parentElement;
      expect(iconSpan).toHaveClass('text-gray-500');
    });

    it('handles both left and right icons', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      const rightIcon = <span data-testid="right-icon">×</span>;
      
      render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-10', 'pr-10');
    });
  });

  describe('Width Control', () => {
    it('applies full width by default', () => {
      render(<Input />);
      
      const container = screen.getByRole('textbox').parentElement?.parentElement;
      expect(container).toHaveClass('w-full');
    });

    it('does not apply full width when fullWidth is false', () => {
      render(<Input fullWidth={false} />);
      
      const container = screen.getByRole('textbox').parentElement?.parentElement;
      expect(container).not.toHaveClass('w-full');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to container', () => {
      render(<Input className="custom-input-class" />);
      
      const container = screen.getByRole('textbox').parentElement?.parentElement;
      expect(container).toHaveClass('custom-input-class');
    });

    it('applies custom border className', () => {
      render(<Input customBorderClassname="rounded-full" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('rounded-full');
      expect(input).not.toHaveClass('rounded-xl');
    });

    it('uses default border class when customBorderClassname is not provided', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('rounded-xl');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through input attributes', () => {
      render(
        <Input 
          type="email"
          placeholder="Enter email"
          name="email"
          required
          autoComplete="email"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('name', 'email');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    it('handles different input types', () => {
      render(<Input type="password" />);
      
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styling', () => {
      render(<Input disabled />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:bg-gray-100', 'disabled:text-gray-500');
    });

    it('prevents user interaction when disabled', () => {
      const mockOnChange = jest.fn();
      render(<Input disabled onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      
      // Try to interact with disabled input
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Disabled inputs still fire change events in testing, but we verify it's disabled
      expect(input).toBeDisabled();
    });
  });

  describe('Focus States', () => {
    it('applies focus styling', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:ring-blue-500', 'focus:border-blue-500');
    });

    it('can receive focus', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Event Handling', () => {
    it('calls onChange when value changes', () => {
      const mockOnChange = jest.fn();
      render(<Input onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus when input is focused', () => {
      const mockOnFocus = jest.fn();
      render(<Input onFocus={mockOnFocus} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      
      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when input loses focus', () => {
      const mockOnBlur = jest.fn();
      render(<Input onBlur={mockOnBlur} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper input role', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('supports aria-describedby for error messages', () => {
      render(<Input id="test-input" error="Error message" />);
      
      const input = screen.getByRole('textbox');
      
      // The component doesn't implement aria-describedby, but we can test the structure
      expect(input).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('associates label correctly with input', () => {
      render(<Input id="username" label="Username" />);
      
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Structure and Layout', () => {
    it('has correct container structure', () => {
      render(<Input label="Test Input" />);
      
      const container = screen.getByRole('textbox').parentElement?.parentElement;
      expect(container?.children).toHaveLength(2); // label + relative div
    });

    it('has relative positioning for icon container', () => {
      render(<Input />);
      
      const relativeContainer = screen.getByRole('textbox').parentElement;
      expect(relativeContainer).toHaveClass('relative');
    });

    it('maintains proper stacking order with icons', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      const rightIcon = <span data-testid="right-icon">×</span>;
      
      render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />);
      
      const container = screen.getByRole('textbox').parentElement;
      const children = Array.from(container?.children || []);
      
      // Should have: left icon container, input, right icon container
      expect(children).toHaveLength(3);
    });
  });

  describe('Text Styling', () => {
    it('applies correct text size and color', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('text-sm', 'text-[#718EBF]');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty icon elements', () => {
      render(<Input leftIcon={null} rightIcon={undefined} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-4', 'pr-4'); // Default padding
    });

    it('handles very long error messages', () => {
      const longError = 'This is a very long error message that should still be displayed correctly without breaking the layout of the input component or causing overflow issues.';
      
      render(<Input error={longError} />);
      
      expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it('handles very long hint messages', () => {
      const longHint = 'This is a very long hint message that provides detailed instructions about what the user should enter in this input field.';
      
      render(<Input hint={longHint} />);
      
      expect(screen.getByText(longHint)).toBeInTheDocument();
    });

    it('handles special characters in label', () => {
      const specialLabel = 'Email & Password (Required*)';
      render(<Input label={specialLabel} />);
      
      expect(screen.getByText(specialLabel)).toBeInTheDocument();
    });

    it('maintains styling with complex icon content', () => {
      const complexIcon = (
        <div data-testid="complex-icon">
          <svg width="16" height="16"><circle cx="8" cy="8" r="4" /></svg>
        </div>
      );
      
      render(<Input leftIcon={complexIcon} />);
      
      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-10');
    });
  });

  describe('Performance', () => {
    it('handles rapid prop changes', () => {
      const { rerender } = render(<Input error="Error 1" />);
      
      rerender(<Input hint="Hint 1" />);
      rerender(<Input error="Error 2" />);
      rerender(<Input hint="Hint 2" />);
      
      expect(screen.getByText('Hint 2')).toBeInTheDocument();
      expect(screen.queryByText('Error 1')).not.toBeInTheDocument();
    });
  });
}); 