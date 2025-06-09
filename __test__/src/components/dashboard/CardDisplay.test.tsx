import { render, screen } from '@testing-library/react';
import CardDisplay from '@/components/dashboard/CardDisplay';
import { CardSummary } from '@/types';

// Mock the formatCardNumber utility
jest.mock('@/utils/formatters', () => ({
  formatCardNumber: jest.fn((cardNumber: string) => '**** **** **** 1234'),
}));

const mockCard: CardSummary = {
  id: '1',
  cardNumber: '1234567812345678',
  cardholderName: 'John Doe',
  expiry: '12/25',
  balance: 5432.10,
  formattedBalance: '5,432.10',
  type: 'visa'
};

describe('CardDisplay', () => {
  it('renders without crashing', () => {
    render(<CardDisplay card={mockCard} />);
    expect(screen.getByText('CARD BALANCE')).toBeInTheDocument();
  });

  it('displays the card balance', () => {
    render(<CardDisplay card={mockCard} />);
    expect(screen.getByText('$5,432.10')).toBeInTheDocument();
  });

  it('displays the cardholder name', () => {
    render(<CardDisplay card={mockCard} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays the expiry date', () => {
    render(<CardDisplay card={mockCard} />);
    expect(screen.getByText('12/25')).toBeInTheDocument();
  });

  it('displays masked card number', () => {
    render(<CardDisplay card={mockCard} />);
    expect(screen.getByText('**** **** **** 1234')).toBeInTheDocument();
  });

  it('displays VISA logo for visa card type', () => {
    render(<CardDisplay card={mockCard} />);
    expect(screen.getByText('VISA')).toBeInTheDocument();
  });

  it('displays Mastercard circles for mastercard type', () => {
    const mastercardMock = { ...mockCard, type: 'mastercard' as const };
    render(<CardDisplay card={mastercardMock} />);
    
    // Should not show VISA text for mastercard
    expect(screen.queryByText('VISA')).not.toBeInTheDocument();
  });

  it('has proper styling structure', () => {
    const { container } = render(<CardDisplay card={mockCard} />);
    const cardElement = container.querySelector('.bg-gradient-to-r');
    expect(cardElement).toHaveClass('bg-gradient-to-r', 'from-gray-800', 'to-gray-900');
  });
}); 