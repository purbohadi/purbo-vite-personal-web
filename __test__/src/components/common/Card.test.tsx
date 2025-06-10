import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import Card from '../../../../src/components/common/Card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders with children', () => {
      render(<Card>Card content</Card>);
      
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies default card styling', () => {
      render(<Card>Basic card</Card>);
      
      // Get the outermost div (the card root)
      const cardElement = screen.getByText('Basic card').closest('.bg-white');
      expect(cardElement).toHaveClass('bg-white', 'rounded-3xl', 'shadow');
    });

    it('applies default padding to content', () => {
      render(<Card>Content with padding</Card>);
      
      // The content is inside the card, find the inner div with padding
      const contentContainer = document.querySelector('.p-6.pt-0');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('p-6', 'pt-0');
    });
  });

  describe('Title and Header', () => {
    it('renders title when provided', () => {
      render(<Card title="Card Title">Content</Card>);
      
      const title = screen.getByText('Card Title');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H3');
    });

    it('applies correct title styling', () => {
      render(<Card title="Styled Title">Content</Card>);
      
      const title = screen.getByText('Styled Title');
      expect(title).toHaveClass('text-lg', 'font-semibold', 'text-primary-title');
    });

    it('creates header container when title is provided', () => {
      render(<Card title="Header Test">Content</Card>);
      
      const headerContainer = screen.getByText('Header Test').parentElement;
      expect(headerContainer).toHaveClass('flex', 'justify-between', 'items-center', 'px-6', 'pt-6', 'pb-4');
    });

    it('does not render header when no title provided', () => {
      render(<Card>Content only</Card>);
      
      // Should not find any header container
      const cardElement = screen.getByText('Content only').closest('div');
      const headerElements = cardElement?.querySelectorAll('.flex.justify-between');
      expect(headerElements).toHaveLength(0);
    });
  });

  describe('Action Element', () => {
    it('renders action element when provided', () => {
      const action = <button data-testid="card-action">Action Button</button>;
      render(<Card title="With Action" action={action}>Content</Card>);
      
      expect(screen.getByTestId('card-action')).toBeInTheDocument();
    });

    it('positions action element correctly in header', () => {
      const action = <button data-testid="card-action">Action</button>;
      render(<Card title="Header Layout" action={action}>Content</Card>);
      
      const headerContainer = screen.getByText('Header Layout').parentElement;
      const actionContainer = screen.getByTestId('card-action').parentElement;
      
      expect(headerContainer).toContainElement(actionContainer);
    });

    it('handles complex action elements', () => {
      const complexAction = (
        <div data-testid="complex-action">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      );
      
      render(<Card title="Complex Action" action={complexAction}>Content</Card>);
      
      expect(screen.getByTestId('complex-action')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('does not render action without title', () => {
      const action = <button data-testid="orphan-action">Orphan</button>;
      render(<Card action={action}>Content without title</Card>);
      
      // Action should not be rendered if there's no title (no header)
      expect(screen.queryByTestId('orphan-action')).not.toBeInTheDocument();
    });
  });

  describe('Padding Control', () => {
    it('applies default padding when noPadding is false', () => {
      render(<Card noPadding={false}>Default padding</Card>);
      
      const contentContainer = document.querySelector('.p-6.pt-0');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('p-6', 'pt-0');
    });

    it('removes padding when noPadding is true', () => {
      render(<Card noPadding>No padding content</Card>);
      
      // When noPadding is true, there should be no p-6 pt-0 classes
      const contentContainer = screen.getByText('No padding content').parentElement;
      expect(contentContainer).not.toHaveClass('p-6', 'pt-0');
      // Check that the container with padding classes doesn't exist
      const paddedContainer = document.querySelector('.p-6.pt-0');
      expect(paddedContainer).not.toBeInTheDocument();
    });

    it('removes padding for cards with title when noPadding is true', () => {
      render(<Card title="Title" noPadding>No padding with title</Card>);
      
      const contentContainer = screen.getByText('No padding with title').parentElement;
      expect(contentContainer).not.toHaveClass('p-6', 'pt-0');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Card className="custom-card-class">Custom styled</Card>);
      
      // Get the root card element which has the custom class
      const cardElement = screen.getByText('Custom styled').closest('.bg-white');
      expect(cardElement).toHaveClass('custom-card-class');
    });

    it('combines custom className with default classes', () => {
      render(<Card className="border-2 border-red-500">Combined classes</Card>);
      
      const cardElement = screen.getByText('Combined classes').closest('.bg-white');
      expect(cardElement).toHaveClass('bg-white', 'rounded-3xl', 'shadow', 'border-2', 'border-red-500');
    });

    it('applies empty string className by default', () => {
      render(<Card>Default className</Card>);
      
      const cardElement = screen.getByText('Default className').closest('.bg-white');
      // Should not have any extra classes beyond the base ones
      expect(cardElement).toHaveClass('bg-white', 'rounded-3xl', 'shadow');
    });
  });

  describe('Content Variations', () => {
    it('handles text content', () => {
      render(<Card>Simple text content</Card>);
      
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('handles JSX content', () => {
      render(
        <Card>
          <div data-testid="jsx-content">
            <p>Paragraph content</p>
            <button>Button in card</button>
          </div>
        </Card>
      );
      
      expect(screen.getByTestId('jsx-content')).toBeInTheDocument();
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByText('Button in card')).toBeInTheDocument();
    });

    it('handles multiple children elements', () => {
      render(
        <Card>
          <h4>Heading</h4>
          <p>Paragraph</p>
          <ul>
            <li>List item</li>
          </ul>
        </Card>
      );
      
      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('List item')).toBeInTheDocument();
    });

    it('handles empty content', () => {
      render(<Card>{''}</Card>);
      
      const contentContainer = document.querySelector('.p-6.pt-0');
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('has correct structure with title and action', () => {
      const action = <button>Action</button>;
      render(<Card title="Structure Test" action={action}>Content</Card>);
      
      // Get the root card element
      const cardElement = screen.getByText('Content').closest('.bg-white');
      const children = Array.from(cardElement?.children || []);
      
      // Should have header div and content div
      expect(children).toHaveLength(2);
    });

    it('has correct structure without title', () => {
      render(<Card>Content only</Card>);
      
      const cardElement = screen.getByText('Content only').closest('.bg-white');
      const children = Array.from(cardElement?.children || []);
      
      // Should have only content div
      expect(children).toHaveLength(1);
    });

    it('maintains proper DOM hierarchy', () => {
      render(<Card title="Hierarchy Test">Nested content</Card>);
      
      const card = screen.getByText('Nested content').closest('.bg-white');
      const title = screen.getByText('Hierarchy Test');
      const content = screen.getByText('Nested content');
      
      expect(card).toContainElement(title);
      expect(card).toContainElement(content);
    });
  });

  describe('Header Flexbox Layout', () => {
    it('uses flexbox for header when title and action exist', () => {
      const action = <button>Flex test</button>;
      render(<Card title="Flex Title" action={action}>Content</Card>);
      
      const headerContainer = screen.getByText('Flex Title').parentElement;
      expect(headerContainer).toHaveClass('flex', 'justify-between', 'items-center');
    });

    it('aligns title and action correctly', () => {
      const action = <button data-testid="alignment-test">Right side</button>;
      render(<Card title="Left side" action={action}>Content</Card>);
      
      const headerContainer = screen.getByText('Left side').parentElement;
      const title = screen.getByText('Left side');
      const actionContainer = screen.getByTestId('alignment-test').parentElement;
      
      expect(headerContainer).toContainElement(title);
      expect(headerContainer).toContainElement(actionContainer);
    });
  });

  describe('Responsive Behavior', () => {
    it('maintains structure on different screen sizes', () => {
      render(<Card title="Responsive Test" className="w-full md:w-1/2">Responsive content</Card>);
      
      const cardElement = screen.getByText('Responsive content').closest('.bg-white');
      expect(cardElement).toHaveClass('w-full', 'md:w-1/2');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Card title="Accessible Title">Accessible content</Card>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('Accessible Title');
    });

    it('maintains focus within card content', () => {
      render(
        <Card title="Focus Test">
          <button data-testid="focusable">Focusable element</button>
        </Card>
      );
      
      const button = screen.getByTestId('focusable');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long titles', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines depending on the card width and responsive behavior';
      render(<Card title={longTitle}>Content</Card>);
      
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles special characters in title', () => {
      const specialTitle = 'Card Title with "Quotes" & Symbols!';
      render(<Card title={specialTitle}>Content</Card>);
      
      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it('handles null or undefined children gracefully', () => {
      render(<Card title="Null Content">{null}</Card>);
      
      const title = screen.getByText('Null Content');
      expect(title).toBeInTheDocument();
    });

    it('combines all possible props', () => {
      const action = <button data-testid="all-props-action">Action</button>;
      render(
        <Card 
          title="All Props Test" 
          action={action} 
          className="custom-combined" 
          noPadding
        >
          Combined props content
        </Card>
      );
      
      expect(screen.getByText('All Props Test')).toBeInTheDocument();
      expect(screen.getByTestId('all-props-action')).toBeInTheDocument();
      expect(screen.getByText('Combined props content')).toBeInTheDocument();
      
      const cardElement = screen.getByText('Combined props content').closest('.bg-white');
      expect(cardElement).toHaveClass('custom-combined');
      
      const contentContainer = screen.getByText('Combined props content').parentElement;
      expect(contentContainer).not.toHaveClass('p-6');
    });
  });
}); 