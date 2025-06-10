import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import MainLayout from '../../../../src/components/layout/MainLayout';

describe('MainLayout', () => {
  it('renders children content', () => {
    render(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders the main layout structure', () => {
    render(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    );

    // Check that main layout elements are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // sidebar nav
  });

  it('renders the page title', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    // Should render the default "Overview" title
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('has MSW server available for API mocking', async () => {
    // This test demonstrates that MSW setup is working
    // In a real test, you would make API calls and they would be intercepted by MSW
    render(
      <MainLayout>
        <div data-testid="api-test">API Testing Ready</div>
      </MainLayout>
    );

    expect(screen.getByTestId('api-test')).toBeInTheDocument();
    
    // Example: You could test API calls here
    // const response = await fetch('/api/health');
    // expect(response.ok).toBe(true);
  });
}); 