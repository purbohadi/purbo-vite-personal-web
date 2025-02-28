// src/components/dashboard/QuickTransfer.tsx
import { useEffect, useRef, useState } from "react";
import { Contact } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { isNotEmpty } from "../../utils/validators";
import { useDebounce } from "../../hooks/useDebounce";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import Avatar from "../common/Avatar";

interface QuickTransferProps {
  contacts: Contact[];
  onTransfer: (contactId: string, amount: number) => Promise<boolean>;
}

const QuickTransfer: React.FC<QuickTransferProps> = ({
  contacts,
  onTransfer,
}) => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if scrolling is needed
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        // Show scroll button if content width exceeds container width
        setShowScrollButton(container.scrollWidth > container.clientWidth);
      }
    };

    // Check on initial load
    checkScroll();

    // Add resize listener
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [contacts]);

  // Scroll to the right
  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Use debounce to prevent too frequent updates
  const debouncedAmount = useDebounce(amount, 300);

  const handleContactSelect = (id: string) => {
    setSelectedContact(id === selectedContact ? null : id);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const handleTransfer = async () => {
    if (!selectedContact || !isValidAmount) return;

    setIsTransferring(true);
    try {
      const success = await onTransfer(selectedContact, parseFloat(amount));
      if (success) {
        // Reset form on success
        setAmount("");
        setSelectedContact(null);
      }
    } finally {
      setIsTransferring(false);
    }
  };

  // Validate amount
  const isValidAmount =
    amount &&
    isNotEmpty(amount) &&
    !isNaN(parseFloat(amount)) &&
    parseFloat(amount) > 0;
  const canTransfer = selectedContact && isValidAmount && !isTransferring;

  // Find selected contact for display
  const selectedContactObj = selectedContact
    ? contacts.find((c) => c.id === selectedContact)
    : null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-title">
        Quick Transfer
      </h3>
      <Card>
        <div className="relative">
          {/* Contacts Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto py-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex flex-col items-center p-2 cursor-pointer min-w-[80px] transition-colors ${
                  selectedContact === contact.id
                    ? "bg-blue-100 opacity-100"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => handleContactSelect(contact.id)}
              >
                <Avatar
                  src={contact.avatar}
                  alt={contact.name}
                  size="lg"
                  className={`mb-2 ${
                    selectedContact === contact.id ? "ring-2 ring-blue-500" : ""
                  }`}
                />
                <p className="text-sm text-center truncate w-full hover:font-medium">
                  {contact.name}
                </p>
                <p className="text-xs text-[#718EBF] truncate w-full text-center hover:font-medium">
                  {contact.role}
                </p>
              </div>
            ))}
          </div>

          {/* Right scroll indicator */}
          {showScrollButton && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-row justify-between mt-4">
          <div className="text-[#718EBF] text-base py-2">Write Amount</div>
          <Input
            customBorderClassname="rounded-3xl"
            fullWidth={false}
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            leftIcon={<span className="text-gray-500">$</span>}
            error={
              amount && !isValidAmount
                ? "Please enter a valid amount"
                : undefined
            }
            rightIcon={
              <Button
                variant="custom"
                onClick={handleTransfer}
                disabled={!canTransfer}
                isLoading={isTransferring}
                rightIcon={
                  <svg
                    width="26"
                    height="23"
                    viewBox="0 0 26 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.9824 0.923369C26.1091 0.333347 25.5307 -0.164153 24.9664 0.0511577L0.490037 9.39483C0.195457 9.50731 0.000610804 9.78965 1.43342e-06 10.105C-0.000607937 10.4203 0.193121 10.7034 0.487294 10.817L7.36317 13.4726V21.8369C7.36317 22.1897 7.60545 22.4963 7.94873 22.5779C8.28972 22.659 8.64529 22.4967 8.80515 22.1796L11.6489 16.5364L18.5888 21.6868C19.011 22.0001 19.6178 21.8008 19.7714 21.2974C26.251 0.0528342 25.9708 0.97674 25.9824 0.923369ZM19.9404 3.60043L8.01692 12.092L2.88664 10.1106L19.9404 3.60043ZM8.8866 13.3428L19.2798 5.94118C10.3366 15.3758 10.8037 14.8792 10.7647 14.9317C10.7067 15.0096 10.8655 14.7058 8.8866 18.6327V13.3428ZM18.6293 19.8197L12.5206 15.2862L23.566 3.63395L18.6293 19.8197Z"
                      fill="white"
                    />
                  </svg>
                }
              >
                Send
              </Button>
            }
          />
        </div>

        {amount && parseFloat(amount) > 0 && selectedContactObj && (
          <div className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded-lg">
            You'll send {formatCurrency(parseFloat(amount))} to{" "}
            {selectedContactObj.name}
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuickTransfer;
