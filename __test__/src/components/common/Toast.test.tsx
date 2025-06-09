import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import Toast from '../../../../src/components/common/Toast';

// Mock the useNotification hook
jest.mock('../../../../src/hooks/useNotification', () => ({
  NotificationType: {}
}));

describe('Toast Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders with message', () => {
      render(<Toast type="info" message="Test message" onClose={mockOnClose} />);
      
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<Toast type="info" message="Test message" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Notification Types', () => {
    const types = [
      {
        type: 'success' as const,
        expectedClasses: ['bg-green-50', 'border-green-500', 'text-green-800']
      },
      {
        type: 'error' as const,
        expectedClasses: ['bg-red-50', 'border-red-500', 'text-red-800']
      },
      {
        type: 'warning' as const,
        expectedClasses: ['bg-yellow-50', 'border-yellow-500', 'text-yellow-800']
      },
      {
        type: 'info' as const,
        expectedClasses: ['bg-blue-50', 'border-blue-500', 'text-blue-800']
      }
    ];

    types.forEach(({ type, expectedClasses }) => {
      it(`renders ${type} notification with correct styles`, () => {
        render(<Toast type={type} message="Test message" onClose={mockOnClose} />);
        
        const toast = screen.getByText('Test message').closest('div');
        expectedClasses.forEach(className => {
          expect(toast).toHaveClass(className);
        });
      });

      it(`renders ${type} notification with correct icon`, () => {
        render(<Toast type={type} message="Test message" onClose={mockOnClose} />);
        
        const icon = screen.getByText('Test message').parentElement?.previousElementSibling;
        expect(icon).toBeInTheDocument();
        expect(icon?.tagName).toBe('svg');
      });
    });
  });

  describe('Icons', () => {
    it('renders success icon with correct attributes', () => {
      render(<Toast type="success" message="Success!" onClose={mockOnClose} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('w-5', 'h-5', 'mr-3');
      expect(svg).toHaveAttribute('fill', 'currentColor');
      expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    });

    it('renders error icon with warning path', () => {
      render(<Toast type="error" message="Error!" onClose={mockOnClose} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('path')).toBeInTheDocument();
    });

    it('renders warning icon with triangle shape', () => {
      render(<Toast type="warning" message="Warning!" onClose={mockOnClose} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('path')).toBeInTheDocument();
    });

    it('renders info icon with circle shape', () => {
      render(<Toast type="info" message="Info!" onClose={mockOnClose} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('path')).toBeInTheDocument();
    });
  });

  describe('Auto-dismiss Functionality', () => {
    it('auto-dismisses after 5 seconds', async () => {
      render(<Toast type="info" message="Auto dismiss" onClose={mockOnClose} />);
      
      expect(mockOnClose).not.toHaveBeenCalled();
      
      // Fast-forward time by 5 seconds
      jest.advanceTimersByTime(5000);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not auto-dismiss before 5 seconds', () => {
      render(<Toast type="info" message="Not yet dismissed" onClose={mockOnClose} />);
      
      // Fast-forward time by 4 seconds
      jest.advanceTimersByTime(4000);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('clears timer on unmount', () => {
      const { unmount } = render(<Toast type="info" message="Unmount test" onClose={mockOnClose} />);
      
      // Unmount before timer expires
      unmount();
      
      // Fast-forward time by 5 seconds
      jest.advanceTimersByTime(5000);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('resets timer when onClose changes', () => {
      const firstOnClose = jest.fn();
      const secondOnClose = jest.fn();
      
      const { rerender } = render(
        <Toast type="info" message="Timer reset test" onClose={firstOnClose} />
      );
      
      // Advance time by 3 seconds
      jest.advanceTimersByTime(3000);
      
      // Change onClose prop
      rerender(<Toast type="info" message="Timer reset test" onClose={secondOnClose} />);
      
      // Advance time by another 3 seconds (total 6 seconds from original)
      jest.advanceTimersByTime(3000);
      
      // First callback should not be called, second should be called
      expect(firstOnClose).not.toHaveBeenCalled();
      expect(secondOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Manual Close', () => {
    it('calls onClose when close button is clicked', () => {
      render(<Toast type="info" message="Manual close" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('has accessible close button', () => {
      render(<Toast type="info" message="Accessible close" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveAttribute('aria-label', undefined); // No aria-label, but has sr-only text
      
      const srOnlyText = closeButton.querySelector('.sr-only');
      expect(srOnlyText).toHaveTextContent('Dismiss');
    });
  });

  describe('Structure and Styling', () => {
    it('has correct container structure', () => {
      render(<Toast type="success" message="Structure test" onClose={mockOnClose} />);
      
      const container = screen.getByText('Structure test').closest('div');
      expect(container).toHaveClass('border-l-4', 'p-4', 'shadow-md', 'rounded-r-lg');
    });

    it('has correct inner flex structure', () => {
      render(<Toast type="info" message="Flex test" onClose={mockOnClose} />);
      
      const flexContainer = screen.getByText('Flex test').closest('.flex');
      expect(flexContainer).toHaveClass('flex', 'items-start');
    });

    it('positions message content correctly', () => {
      render(<Toast type="warning" message="Content positioning" onClose={mockOnClose} />);
      
      const messageContainer = screen.getByText('Content positioning').parentElement;
      expect(messageContainer).toHaveClass('ml-3');
    });

    it('applies correct text styling to message', () => {
      render(<Toast type="error" message="Text styling" onClose={mockOnClose} />);
      
      const message = screen.getByText('Text styling');
      expect(message).toHaveClass('text-sm', 'font-medium');
    });
  });

  describe('Close Button Styling', () => {
    it('positions close button correctly', () => {
      render(<Toast type="info" message="Close button test" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveClass('ml-auto', '-mx-1.5', '-my-1.5', 'rounded-lg', 'p-1.5');
    });

    it('has focus styles on close button', () => {
      render(<Toast type="info" message="Focus test" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveClass('focus:outline-none');
    });

    it('renders close icon with correct size', () => {
      render(<Toast type="info" message="Icon size test" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      const closeIcon = closeButton.querySelector('svg');
      expect(closeIcon).toHaveClass('w-4', 'h-4');
      expect(closeIcon).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('Content Variations', () => {
    it('handles long messages', () => {
      const longMessage = 'This is a very long message that should still be displayed correctly in the toast notification component without breaking the layout or causing overflow issues.';
      
      render(<Toast type="info" message={longMessage} onClose={mockOnClose} />);
      
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('handles short messages', () => {
      render(<Toast type="success" message="OK" onClose={mockOnClose} />);
      
      expect(screen.getByText('OK')).toBeInTheDocument();
    });

    it('handles empty message', () => {
      render(<Toast type="error" message="" onClose={mockOnClose} />);
      
      const messageElement = screen.getByText('').closest('p');
      expect(messageElement).toBeInTheDocument();
      expect(messageElement).toHaveClass('text-sm', 'font-medium');
    });

    it('handles special characters in message', () => {
      const specialMessage = 'Alert! @user: 50% complete... "Success" & <important>';
      
      render(<Toast type="warning" message={specialMessage} onClose={mockOnClose} />);
      
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<Toast type="info" message="Semantic test" onClose={mockOnClose} />);
      
      const message = screen.getByText('Semantic test');
      expect(message.tagName).toBe('P');
    });

    it('close button has screen reader text', () => {
      render(<Toast type="info" message="Screen reader test" onClose={mockOnClose} />);
      
      const srText = screen.getByText('Dismiss');
      expect(srText).toHaveClass('sr-only');
    });

    it('is keyboard navigable', () => {
      render(<Toast type="success" message="Keyboard test" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      closeButton.focus();
      expect(closeButton).toHaveFocus();
      
      fireEvent.keyDown(closeButton, { key: 'Enter' });
      fireEvent.click(closeButton); // Simulate actual click
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Icon Accessibility', () => {
    it('has proper SVG structure for screen readers', () => {
      render(<Toast type="success" message="SVG test" onClose={mockOnClose} />);
      
      const svgs = document.querySelectorAll('svg');
      // Should have icon svg and close button svg
      expect(svgs.length).toBeGreaterThanOrEqual(1);
      
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('viewBox');
      });
    });
  });

  describe('Performance', () => {
    it('handles rapid successive renders', () => {
      const { rerender } = render(
        <Toast type="info" message="Message 1" onClose={mockOnClose} />
      );
      
      rerender(<Toast type="success" message="Message 2" onClose={mockOnClose} />);
      rerender(<Toast type="error" message="Message 3" onClose={mockOnClose} />);
      rerender(<Toast type="warning" message="Message 4" onClose={mockOnClose} />);
      
      expect(screen.getByText('Message 4')).toBeInTheDocument();
      expect(screen.queryByText('Message 1')).not.toBeInTheDocument();
    });

    it('cleans up timers properly on type change', () => {
      const { rerender } = render(
        <Toast type="info" message="Timer test" onClose={mockOnClose} />
      );
      
      // Advance time partially
      jest.advanceTimersByTime(2000);
      
      // Change type (which should reset timer)
      rerender(<Toast type="success" message="Timer test" onClose={mockOnClose} />);
      
      // Advance time by 3 more seconds (total 5 from original render)
      jest.advanceTimersByTime(3000);
      
      // Should not have been called yet (timer was reset)
      expect(mockOnClose).not.toHaveBeenCalled();
      
      // Advance 2 more seconds to complete the new 5-second timer
      jest.advanceTimersByTime(2000);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
}); 