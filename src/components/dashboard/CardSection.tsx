// src/components/dashboard/CardSection.tsx
import { Card } from "../../types";
import { formatCardNumber, formatCurrency } from "../../utils/formatters";
import Button from "../common/Button";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { assets } from "../../mocks/assets";

interface CardSectionProps {
  cards: Card[];
}

const CardSection: React.FC<CardSectionProps> = ({ cards }) => {
  const isMobile = useIsMobile();
  const displayCards = isMobile ? cards.slice(0, 1) : cards;

  return (
    <div className="col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary-title">My Cards</h2>
        <Button variant="text" className="font-semibold text-primary-title">
          See All
        </Button>
      </div>

      <div className="flex flex-nowrap gap-8 overflow-x-scroll scrolling-touch items-start mb-4">
        {displayCards.map((card, index) =>
          index % 2 === 0 ? (
            <div
              key={card.id}
              className="flex-none w-2/3 md:w-1/3 mr-3 md:pb-4 min-w-84 h-[235px] bg-gradient-to-r from-[#5B5A6F] to-black rounded-3xl shadow text-white overflow-hidden"
            >
              <div className="flex flex-col h-[165px] p-6 justify-between">
                <div className="flex justify-between">
                  <div className="top-4 left-6 ml-0.5">
                    <p className="text-gray-300 text-xs">Balance</p>
                    <p className="text-xl font-semibold mt-1">
                      {formatCurrency(card.balance)}
                    </p>
                  </div>
                  <div className="top-4 right-4">
                    <img
                      src={assets.cardBackgrounds.chip}
                      alt="chip"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                <div className="flex justify-stretch">
                  <div>
                    <p className="text-xs text-gray-300">CARD HOLDER</p>
                    <p className="text-sm">{card.cardholderName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">VALID THRU</p>
                    <p className="text-sm">{card.expiry}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between p-6 h-[70px] bg-gradient-to-b from-white/15 to-transparent">
                <p className="text-[22px]">
                  {formatCardNumber(card.cardNumber, 1)}
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full opacity-50"></div>
                  <div className="w-8 h-8 bg-white rounded-full ml-[-12px] opacity-50"></div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={card.id}
              className="flex-none w-2/3 md:w-1/3 mr-3 md:pb-4 min-w-84 h-[235px] rounded-3xl shadow overflow-hidden"
            >
              <div className="flex flex-col h-[165px] p-6 justify-between">
                <div className="flex justify-between">
                  <div className="top-4 left-6 ml-0.5">
                    <p className="text-[#718EBF] text-xs">Balance</p>
                    <p className="text-xl font-semibold mt-1">
                      {formatCurrency(card.balance)}
                    </p>
                  </div>
                  <div className="top-4 right-4">
                    <img
                      className="filter invert"
                      src={assets.cardBackgrounds.chip}
                      alt="chip"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                <div className="flex justify-stretch">
                  <div>
                    <p className="text-xs text-[#718EBF]">CARD HOLDER</p>
                    <p className="text-sm">{card.cardholderName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#718EBF]">VALID THRU</p>
                    <p className="text-sm">{card.expiry}</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#DFEAF2] border-opacity-50 border" />
              <div className="flex justify-between p-6 h-[70px] bg-gradient-to-b from-white/15 to-transparent">
                <p className="text-[22px]">
                  {formatCardNumber(card.cardNumber, 1)}
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#9199AF] rounded-full opacity-50"></div>
                  <div className="w-8 h-8 bg-[#9199AF] rounded-full ml-[-12px] opacity-50"></div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CardSection;
