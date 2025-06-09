import { render, screen } from '@testing-library/react';
import AuthLayout from '@/components/layout/AuthLayout';

describe('AuthLayout', () => {
  it('renders children correctly', () => {
    render(
      <AuthLayout title="Test Title">
        <div data-testid="test-child">Test Content</div>
      </AuthLayout>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <AuthLayout title="Login">
        <div data-testid="child-1">First Child</div>
        <div data-testid="child-2">Second Child</div>
      </AuthLayout>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders with subtitle when provided', () => {
    render(
      <AuthLayout title="Welcome" subtitle="Please sign in to continue">
        <div>Content</div>
      </AuthLayout>
    );
    
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Please sign in to continue')).toBeInTheDocument();
  });

  it('renders without subtitle when not provided', () => {
    render(
      <AuthLayout title="Register">
        <div>Content</div>
      </AuthLayout>
    );
    
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Please sign in to continue')).not.toBeInTheDocument();
  });

  it('has proper structure and styling', () => {
    render(
      <AuthLayout title="Test">
        <div>Content</div>
      </AuthLayout>
    );
    
    const title = screen.getByText('Test');
    expect(title.tagName).toBe('H2');
    expect(title).toHaveClass('text-3xl', 'font-extrabold', 'text-gray-900');
  });

  it('renders with empty children', () => {
    render(<AuthLayout title="Empty">{null}</AuthLayout>);
    // Should not crash and container should exist
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
}); 