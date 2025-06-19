import { render, screen } from '@testing-library/react';
import SectionTitle from '../../../src/components/SectionTitle';

describe('SectionTitle', () => {
  it('renders the title correctly', () => {
    render(<SectionTitle title="Test Title" darkMode={false} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
}); 