export interface Card {
    id: string;
    cardNumber: string;
    cardholderName: string;
    balance: number;
    formattedBalance: string; // Pre-formatted with currency symbol
    type: "visa" | "mastercard";
    expiry: string;
    cvv: string;
    isActive: boolean;
  }
  
  export interface CardSummary {
    id: string;
    cardNumber: string; // Masked version
    cardholderName: string;
    balance: number;
    formattedBalance: string;
    type: "visa" | "mastercard";
    expiry: string;
  }
