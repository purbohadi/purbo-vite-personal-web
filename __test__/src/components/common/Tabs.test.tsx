import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../test-utils';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../../src/components/common/Tabs';

describe('Tabs Component', () => {
  const DefaultTabsSetup = () => (
    <Tabs>
      <Tab label="First Tab">First tab content</Tab>
      <Tab label="Second Tab">Second tab content</Tab>
      <Tab label="Third Tab">Third tab content</Tab>
    </Tabs>
  );

  describe('Basic Rendering', () => {
    it('renders tabs with labels', () => {
      render(<DefaultTabsSetup />);
      
      expect(screen.getByText('First Tab')).toBeInTheDocument();
      expect(screen.getByText('Second Tab')).toBeInTheDocument();
      expect(screen.getByText('Third Tab')).toBeInTheDocument();
    });

    it('renders tab buttons as button elements', () => {
      render(<DefaultTabsSetup />);
      
      const tabButtons = screen.getAllByRole('button');
      expect(tabButtons).toHaveLength(3);
    });

    it('shows first tab content by default', () => {
      render(<DefaultTabsSetup />);
      
      expect(screen.getByText('First tab content')).toBeInTheDocument();
      expect(screen.queryByText('Second tab content')).not.toBeInTheDocument();
      expect(screen.queryByText('Third tab content')).not.toBeInTheDocument();
    });

    it('applies default tab structure', () => {
      render(<DefaultTabsSetup />);
      
      const tabContainer = screen.getByText('First Tab').closest('.border-b');
      expect(tabContainer).toBeInTheDocument();
      
      const contentContainer = screen.getByText('First tab content').parentElement;
      expect(contentContainer).toHaveClass('p-6');
    });
  });

  describe('Tab Navigation', () => {
    it('switches content when tab is clicked', () => {
      render(<DefaultTabsSetup />);
      
      expect(screen.getByText('First tab content')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Second Tab'));
      
      expect(screen.getByText('Second tab content')).toBeInTheDocument();
      expect(screen.queryByText('First tab content')).not.toBeInTheDocument();
    });

    it('switches to third tab when clicked', () => {
      render(<DefaultTabsSetup />);
      
      fireEvent.click(screen.getByText('Third Tab'));
      
      expect(screen.getByText('Third tab content')).toBeInTheDocument();
      expect(screen.queryByText('First tab content')).not.toBeInTheDocument();
      expect(screen.queryByText('Second tab content')).not.toBeInTheDocument();
    });

    it('can switch back to previously active tab', () => {
      render(<DefaultTabsSetup />);
      
      fireEvent.click(screen.getByText('Second Tab'));
      expect(screen.getByText('Second tab content')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('First Tab'));
      expect(screen.getByText('First tab content')).toBeInTheDocument();
      expect(screen.queryByText('Second tab content')).not.toBeInTheDocument();
    });
  });

  describe('Active Tab Styling', () => {
    it('applies active styles to first tab by default', () => {
      render(<DefaultTabsSetup />);
      
      const firstTab = screen.getByText('First Tab');
      expect(firstTab).toHaveClass('border-black', 'text-black');
    });

    it('applies inactive styles to non-active tabs', () => {
      render(<DefaultTabsSetup />);
      
      const secondTab = screen.getByText('Second Tab');
      const thirdTab = screen.getByText('Third Tab');
      
      expect(secondTab).toHaveClass('border-transparent', 'text-[#718EBF]');
      expect(thirdTab).toHaveClass('border-transparent', 'text-[#718EBF]');
    });

    it('updates active styles when tab changes', () => {
      render(<DefaultTabsSetup />);
      
      fireEvent.click(screen.getByText('Second Tab'));
      
      const firstTab = screen.getByText('First Tab');
      const secondTab = screen.getByText('Second Tab');
      
      expect(firstTab).toHaveClass('border-transparent', 'text-[#718EBF]');
      expect(secondTab).toHaveClass('border-black', 'text-black');
    });

    it('applies hover styles to inactive tabs', () => {
      render(<DefaultTabsSetup />);
      
      const secondTab = screen.getByText('Second Tab');
      expect(secondTab).toHaveClass('hover:text-gray-700');
    });
  });

  describe('Default Tab', () => {
    it('starts with specified default tab', () => {
      render(
        <Tabs defaultTab={1}>
          <Tab label="First">First content</Tab>
          <Tab label="Second">Second content</Tab>
          <Tab label="Third">Third content</Tab>
        </Tabs>
      );
      
      expect(screen.getByText('Second content')).toBeInTheDocument();
      expect(screen.queryByText('First content')).not.toBeInTheDocument();
      
      const secondTab = screen.getByText('Second');
      expect(secondTab).toHaveClass('border-black', 'text-black');
    });

    it('handles invalid default tab gracefully', () => {
      render(
        <Tabs defaultTab={10}>
          <Tab label="Only Tab">Only content</Tab>
        </Tabs>
      );
      
      expect(screen.getByText('Only content')).toBeInTheDocument();
    });
  });

  describe('Disabled Tabs', () => {
    it('renders disabled tab with proper styling', () => {
      render(
        <Tabs>
          <Tab label="Active">Active content</Tab>
          <Tab label="Disabled" disabled>Disabled content</Tab>
        </Tabs>
      );
      
      const disabledTab = screen.getByText('Disabled');
      expect(disabledTab).toHaveClass('opacity-50', 'cursor-not-allowed');
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });

    it('prevents clicking on disabled tabs', () => {
      const mockOnChange = jest.fn();
      render(
        <Tabs onChange={mockOnChange}>
          <Tab label="Active">Active content</Tab>
          <Tab label="Disabled" disabled>Disabled content</Tab>
        </Tabs>
      );
      
      fireEvent.click(screen.getByText('Disabled'));
      
      expect(mockOnChange).not.toHaveBeenCalled();
      expect(screen.getByText('Active content')).toBeInTheDocument();
      expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
    });

    it('does not apply cursor-pointer to disabled tabs', () => {
      render(
        <Tabs>
          <Tab label="Enabled">Enabled content</Tab>
          <Tab label="Disabled" disabled>Disabled content</Tab>
        </Tabs>
      );
      
      const enabledTab = screen.getByText('Enabled');
      const disabledTab = screen.getByText('Disabled');
      
      expect(enabledTab).toHaveClass('cursor-pointer');
      expect(disabledTab).toHaveClass('cursor-not-allowed');
      expect(disabledTab).not.toHaveClass('cursor-pointer');
    });
  });

  describe('onChange Callback', () => {
    it('calls onChange when tab is switched', () => {
      const mockOnChange = jest.fn();
      render(
        <Tabs onChange={mockOnChange}>
          <Tab label="First">First content</Tab>
          <Tab label="Second">Second content</Tab>
        </Tabs>
      );
      
      fireEvent.click(screen.getByText('Second'));
      
      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('calls onChange with correct index for any tab', () => {
      const mockOnChange = jest.fn();
      render(
        <Tabs onChange={mockOnChange}>
          <Tab label="Zero">Zero content</Tab>
          <Tab label="One">One content</Tab>
          <Tab label="Two">Two content</Tab>
        </Tabs>
      );
      
      fireEvent.click(screen.getByText('Two'));
      expect(mockOnChange).toHaveBeenCalledWith(2);
      
      fireEvent.click(screen.getByText('Zero'));
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('does not call onChange for disabled tabs', () => {
      const mockOnChange = jest.fn();
      render(
        <Tabs onChange={mockOnChange}>
          <Tab label="Active">Active content</Tab>
          <Tab label="Disabled" disabled>Disabled content</Tab>
        </Tabs>
      );
      
      fireEvent.click(screen.getByText('Disabled'));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to container', () => {
      render(
        <Tabs className="custom-tabs-class">
          <Tab label="Custom">Custom content</Tab>
        </Tabs>
      );
      
      const tabsContainer = screen.getByText('Custom').closest('div.custom-tabs-class');
      expect(tabsContainer).toBeInTheDocument();
    });

    it('combines custom className with default behavior', () => {
      render(
        <Tabs className="border-red-500">
          <Tab label="Styled">Styled content</Tab>
        </Tabs>
      );
      
      expect(screen.getByText('Styled content')).toBeInTheDocument();
      const container = screen.getByText('Styled').closest('div.border-red-500');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Tab Structure', () => {
    it('has correct tab button structure', () => {
      render(<DefaultTabsSetup />);
      
      const tabButtons = screen.getAllByRole('button');
      tabButtons.forEach(button => {
        expect(button).toHaveClass('py-4', 'px-6', 'text-center', 'border-b-2');
      });
    });

    it('has proper container hierarchy', () => {
      render(<DefaultTabsSetup />);
      
      const borderContainer = screen.getByText('First Tab').closest('.border-b');
      const flexContainer = borderContainer?.querySelector('.flex');
      
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toContainElement(screen.getByText('First Tab'));
    });

    it('wraps content in proper container', () => {
      render(<DefaultTabsSetup />);
      
      const content = screen.getByText('First tab content');
      const contentContainer = content.parentElement;
      
      expect(contentContainer).toHaveClass('p-6');
    });
  });

  describe('Tab Component', () => {
    it('renders Tab component content correctly', () => {
      render(<Tab label="Test">Tab content here</Tab>);
      
      expect(screen.getByText('Tab content here')).toBeInTheDocument();
    });

    it('wraps Tab content in div', () => {
      render(<Tab label="Wrapper Test">Wrapped content</Tab>);
      
      const content = screen.getByText('Wrapped content');
      expect(content.parentElement?.tagName).toBe('DIV');
    });
  });

  describe('Content Variations', () => {
    it('handles complex tab content', () => {
      render(
        <Tabs>
          <Tab label="Complex">
            <div data-testid="complex-content">
              <h3>Heading in tab</h3>
              <p>Paragraph in tab</p>
              <button>Button in tab</button>
            </div>
          </Tab>
        </Tabs>
      );
      
      expect(screen.getByTestId('complex-content')).toBeInTheDocument();
      expect(screen.getByText('Heading in tab')).toBeInTheDocument();
      expect(screen.getByText('Paragraph in tab')).toBeInTheDocument();
      expect(screen.getByText('Button in tab')).toBeInTheDocument();
    });

    it('handles empty tab content', () => {
      render(
        <Tabs>
          <Tab label="Empty">{''}</Tab>
        </Tabs>
      );
      
      const contentContainer = screen.getByText('Empty').closest('.border-b')?.nextElementSibling;
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('p-6');
    });

    it('handles multiple elements in tab content', () => {
      render(
        <Tabs>
          <Tab label="Multiple">
            <span>First element</span>
            <span>Second element</span>
          </Tab>
        </Tabs>
      );
      
      expect(screen.getByText('First element')).toBeInTheDocument();
      expect(screen.getByText('Second element')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper button roles for tabs', () => {
      render(<DefaultTabsSetup />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });

    it('supports keyboard navigation', () => {
      render(<DefaultTabsSetup />);
      
      const secondTab = screen.getByText('Second Tab');
      secondTab.focus();
      expect(secondTab).toHaveFocus();
      
      fireEvent.keyDown(secondTab, { key: 'Enter' });
      fireEvent.click(secondTab); // Simulate the actual click
      
      expect(screen.getByText('Second tab content')).toBeInTheDocument();
    });

    it('has accessible disabled state', () => {
      render(
        <Tabs>
          <Tab label="Enabled">Enabled content</Tab>
          <Tab label="Disabled" disabled>Disabled content</Tab>
        </Tabs>
      );
      
      const disabledTab = screen.getByText('Disabled');
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('handles single tab', () => {
      render(
        <Tabs>
          <Tab label="Only">Only content</Tab>
        </Tabs>
      );
      
      expect(screen.getByText('Only')).toBeInTheDocument();
      expect(screen.getByText('Only content')).toBeInTheDocument();
      
      const onlyTab = screen.getByText('Only');
      expect(onlyTab).toHaveClass('border-black', 'text-black');
    });

    it('handles tabs with special characters in labels', () => {
      render(
        <Tabs>
          <Tab label="Tab & Special!">Content with special chars</Tab>
          <Tab label='Tab "Quotes"'>Quoted content</Tab>
        </Tabs>
      );
      
      expect(screen.getByText('Tab & Special!')).toBeInTheDocument();
      expect(screen.getByText('Tab "Quotes"')).toBeInTheDocument();
    });

    it('maintains state through rapid clicks', () => {
      render(<DefaultTabsSetup />);
      
      const secondTab = screen.getByText('Second Tab');
      const thirdTab = screen.getByText('Third Tab');
      
      fireEvent.click(secondTab);
      fireEvent.click(thirdTab);
      fireEvent.click(secondTab);
      
      expect(screen.getByText('Second tab content')).toBeInTheDocument();
      expect(screen.queryByText('Third tab content')).not.toBeInTheDocument();
    });

    it('handles mixed disabled and enabled tabs', () => {
      render(
        <Tabs>
          <Tab label="First">First content</Tab>
          <Tab label="Disabled" disabled>Disabled content</Tab>
          <Tab label="Third">Third content</Tab>
        </Tabs>
      );
      
      fireEvent.click(screen.getByText('Third'));
      expect(screen.getByText('Third content')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Disabled'));
      expect(screen.getByText('Third content')).toBeInTheDocument(); // Should remain on third
    });
  });

  describe('Performance', () => {
    it('handles many tabs efficiently', () => {
      const manyTabs = Array.from({ length: 10 }, (_, i) => (
        <Tab key={i} label={`Tab ${i + 1}`}>Content {i + 1}</Tab>
      ));
      
      render(<Tabs>{manyTabs}</Tabs>);
      
      expect(screen.getAllByRole('button')).toHaveLength(10);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Tab 5'));
      expect(screen.getByText('Content 5')).toBeInTheDocument();
    });
  });
}); 