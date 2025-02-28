import { CardSummary } from '../../types';
import { formatCardNumber } from '../../utils/formatters';

interface CardDisplayProps {
  card: CardSummary;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  // Format card number with masking
  const displayNumber = formatCardNumber(card.cardNumber);
  
  return (
    <div className="relative w-full max-w-sm h-48 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 text-white overflow-hidden">
      <div className="absolute top-4 right-4">
        {card.type === 'visa' ? (
          <div className="text-lg font-bold text-white">VISA</div>
        ) : (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full ml-[-12px] opacity-80"></div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-gray-300 text-sm">CARD BALANCE</p>
        <p className="text-2xl font-bold mt-1">${card.formattedBalance}</p>
      </div>
      
      <div className="mt-8">
        <p className="text-xl font-mono tracking-wider">{displayNumber}</p>
      </div>
      
      <div className="flex justify-between mt-6">
        <div>
          <p className="text-xs text-gray-300">CARD HOLDER</p>
          <p className="text-sm">{card.cardholderName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-300">EXPIRES</p>
          <p className="text-sm">{card.expiry}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;