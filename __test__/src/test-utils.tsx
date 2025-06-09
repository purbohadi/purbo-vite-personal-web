import { RenderOptions, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // Turn off caching for tests
      gcTime: 0,
      staleTime: 0,
    },
  },
});

const MockProviders = ({
  children,
  initialEntries = ['/']
}: {
  children: ReactNode;
  initialEntries?: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
);

const customRender = (
  ui: ReactElement,
  initialEntries?: string[],
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: (props: any) => (
      <MockProviders {...props} {...options} initialEntries={initialEntries} />
    ),
    ...options
  });

const renderHookWrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
);

export * from '@testing-library/react';
export { customRender as render, renderHookWrapper, MockProviders }; 