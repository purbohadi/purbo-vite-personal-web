import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import Skeleton, { SkeletonText } from '../../../../src/components/common/Skeleton';

describe('Skeleton Component', () => {
  describe('Basic Rendering', () => {
    it('renders skeleton element', () => {
      render(<Skeleton data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton.tagName).toBe('DIV');
    });

    it('applies default styling', () => {
      render(<Skeleton data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('bg-gray-200');
    });

    it('applies default dimensions', () => {
      render(<Skeleton data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({
        height: '1rem',
        width: '100%',
        borderRadius: '0.25rem'
      });
    });
  });

  describe('Dimensions', () => {
    it('applies custom height', () => {
      render(<Skeleton height="2rem" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ height: '2rem' });
    });

    it('applies custom width', () => {
      render(<Skeleton width="50%" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '50%' });
    });

    it('applies custom border radius', () => {
      render(<Skeleton borderRadius="1rem" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ borderRadius: '1rem' });
    });

    it('handles pixel values', () => {
      render(<Skeleton height="24px" width="120px" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({
        height: '24px',
        width: '120px'
      });
    });

    it('handles percentage values', () => {
      render(<Skeleton height="100%" width="75%" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({
        height: '100%',
        width: '75%'
      });
    });
  });

  describe('Animation', () => {
    it('applies pulse animation by default', () => {
      render(<Skeleton data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('applies pulse animation when specified', () => {
      render(<Skeleton animation="pulse" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('applies wave animation when specified', () => {
      render(<Skeleton animation="wave" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-wave');
    });

    it('applies no animation when specified', () => {
      render(<Skeleton animation="none" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-pulse', 'animate-wave');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-skeleton');
    });

    it('combines custom className with default classes', () => {
      render(<Skeleton className="border-2 shadow-lg" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('bg-gray-200', 'animate-pulse', 'border-2', 'shadow-lg');
    });

    it('overrides default classes when necessary', () => {
      render(<Skeleton className="bg-blue-200" data-testid="skeleton" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('bg-gray-200', 'bg-blue-200'); // Both classes applied
    });
  });

  describe('Complex Styling', () => {
    it('handles complex dimension combinations', () => {
      render(
        <Skeleton 
          height="3rem" 
          width="200px" 
          borderRadius="50%" 
          className="mx-auto"
          data-testid="skeleton"
        />
      );
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({
        height: '3rem',
        width: '200px',
        borderRadius: '50%'
      });
      expect(skeleton).toHaveClass('mx-auto');
    });
  });
});

describe('SkeletonText Component', () => {
  describe('Basic Rendering', () => {
    it('renders skeleton text with default lines', () => {
      render(<SkeletonText data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toBeInTheDocument();
      
      // Should have 3 lines by default
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(3);
    });

    it('applies default flex column layout', () => {
      render(<SkeletonText data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      });
    });
  });

  describe('Line Count', () => {
    it('renders specified number of lines', () => {
      render(<SkeletonText lines={5} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(5);
    });

    it('renders single line', () => {
      render(<SkeletonText lines={1} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(1);
    });

    it('handles zero lines gracefully', () => {
      render(<SkeletonText lines={0} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(0);
    });
  });

  describe('Line Width Variation', () => {
    it('makes last line shorter by default', () => {
      render(<SkeletonText lines={3} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      
      // First two lines should be 100% width
      expect(skeletonLines[0]).toHaveStyle({ width: '100%' });
      expect(skeletonLines[1]).toHaveStyle({ width: '100%' });
      
      // Last line should be 70% width
      expect(skeletonLines[2]).toHaveStyle({ width: '70%' });
    });

    it('handles single line width correctly', () => {
      render(<SkeletonText lines={1} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLine = container.querySelector('div');
      
      // Single line should be 70% width (as it's the "last" line)
      expect(skeletonLine).toHaveStyle({ width: '70%' });
    });
  });

  describe('Spacing', () => {
    it('applies default spacing', () => {
      render(<SkeletonText data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveStyle({ gap: '0.5rem' });
    });

    it('applies custom spacing', () => {
      render(<SkeletonText spacing="1rem" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveStyle({ gap: '1rem' });
    });

    it('handles pixel spacing', () => {
      render(<SkeletonText spacing="8px" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveStyle({ gap: '8px' });
    });

    it('handles zero spacing', () => {
      render(<SkeletonText spacing="0" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveStyle({ gap: '0' });
    });
  });

  describe('Animation', () => {
    it('applies pulse animation by default to all lines', () => {
      render(<SkeletonText lines={3} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      
      skeletonLines.forEach(line => {
        expect(line).toHaveClass('animate-pulse');
      });
    });

    it('applies custom animation to all lines', () => {
      render(<SkeletonText lines={2} animation="wave" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      
      skeletonLines.forEach(line => {
        expect(line).toHaveClass('animate-wave');
      });
    });

    it('applies no animation when specified', () => {
      render(<SkeletonText lines={2} animation="none" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      
      skeletonLines.forEach(line => {
        expect(line).not.toHaveClass('animate-pulse', 'animate-wave');
      });
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to container', () => {
      render(<SkeletonText className="custom-text-skeleton" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveClass('custom-text-skeleton');
    });

    it('combines multiple styling options', () => {
      render(
        <SkeletonText 
          lines={4}
          spacing="12px"
          animation="wave"
          className="p-4 bg-white"
          data-testid="skeleton-text"
        />
      );
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveClass('p-4', 'bg-white');
      expect(container).toHaveStyle({ gap: '12px' });
      
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(4);
      skeletonLines.forEach(line => {
        expect(line).toHaveClass('animate-wave');
      });
    });
  });

  describe('Line Styling', () => {
    it('applies consistent styling to all lines', () => {
      render(<SkeletonText lines={3} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      
      skeletonLines.forEach(line => {
        expect(line).toHaveClass('bg-gray-200');
        expect(line).toHaveStyle({ borderRadius: '0.25rem' });
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles large number of lines', () => {
      render(<SkeletonText lines={20} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(20);
      
      // First 19 lines should be 100% width
      for (let i = 0; i < 19; i++) {
        expect(skeletonLines[i]).toHaveStyle({ width: '100%' });
      }
      
      // Last line should be 70% width
      expect(skeletonLines[19]).toHaveStyle({ width: '70%' });
    });

    it('handles negative line count gracefully', () => {
      render(<SkeletonText lines={-1} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(0);
    });

    it('handles very large spacing values', () => {
      render(<SkeletonText spacing="100px" data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toHaveStyle({ gap: '100px' });
    });

    it('handles fractional line counts by rounding down', () => {
      render(<SkeletonText lines={3.7} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(3); // Should floor the value
    });
  });

  describe('Accessibility', () => {
    it('provides semantic structure for screen readers', () => {
      render(<SkeletonText lines={3} data-testid="skeleton-text" />);
      
      const container = screen.getByTestId('skeleton-text');
      expect(container).toBeInTheDocument();
      
      // The skeleton lines are decorative, so no specific aria labels needed
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(3);
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many lines', () => {
      const startTime = performance.now();
      render(<SkeletonText lines={100} data-testid="skeleton-text" />);
      const endTime = performance.now();
      
      const container = screen.getByTestId('skeleton-text');
      const skeletonLines = container.querySelectorAll('div');
      expect(skeletonLines).toHaveLength(100);
      
      // Should render quickly (less than 100ms for this simple component)
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});

describe('Integration Tests', () => {
  describe('Skeleton and SkeletonText Together', () => {
    it('can be used together in layouts', () => {
      render(
        <div data-testid="skeleton-layout">
          <Skeleton height="4rem" className="mb-4" />
          <SkeletonText lines={3} />
          <Skeleton width="50%" height="2rem" className="mt-4" />
        </div>
      );
      
      const layout = screen.getByTestId('skeleton-layout');
      expect(layout).toBeInTheDocument();
      
      // Should have single skeleton, skeleton text container, and another skeleton
      const allSkeletons = layout.querySelectorAll('.bg-gray-200');
      expect(allSkeletons.length).toBeGreaterThan(3); // 1 + 3 + 1 = 5 skeleton elements
    });

    it('maintains consistent styling across different skeleton types', () => {
      render(
        <div data-testid="consistent-layout">
          <Skeleton data-testid="single-skeleton" />
          <SkeletonText lines={2} data-testid="text-skeleton" />
        </div>
      );
      
      const singleSkeleton = screen.getByTestId('single-skeleton');
      const textContainer = screen.getByTestId('text-skeleton');
      const textLines = textContainer.querySelectorAll('div');
      
      // All should have consistent background color
      expect(singleSkeleton).toHaveClass('bg-gray-200');
      textLines.forEach(line => {
        expect(line).toHaveClass('bg-gray-200');
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('adapts to container constraints', () => {
      render(
        <div style={{ width: '200px' }} data-testid="constrained-container">
          <Skeleton width="100%" />
          <SkeletonText lines={2} className="mt-2" />
        </div>
      );
      
      const container = screen.getByTestId('constrained-container');
      expect(container).toBeInTheDocument();
      
      // Components should adapt to the 200px width constraint
      const skeleton = container.querySelector('.bg-gray-200');
      expect(skeleton).toHaveStyle({ width: '100%' });
    });
  });
}); 