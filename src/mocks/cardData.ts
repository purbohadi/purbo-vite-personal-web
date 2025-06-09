import { Card } from '../types';

export const cardData: Card[] = [
  {
    id: "card-001",
    cardNumber: "3778 1234 5678 1234",
    cardholderName: "Eddy Cusuma",
    balance: 5756,
    formattedBalance: "5,756",
    type: "visa",
    expiry: "12/22",
    cvv: "123",
    isActive: true
  },
  {
    id: "card-002",
    cardNumber: "3778 5678 1234 5678",
    cardholderName: "Mike Gormeo",
    balance: 5756,
    formattedBalance: "5,756",
    type: "mastercard",
    expiry: "10/23",
    cvv: "456",
    isActive: true
  },
  {
    id: "card-003",
    cardNumber: "4532 8721 5489 1023",
    cardholderName: "Catherine Reed",
    balance: 12480,
    formattedBalance: "12,480",
    type: "visa",
    expiry: "03/24",
    cvv: "789",
    isActive: true
  },
  {
    id: "card-004",
    cardNumber: "5412 3456 7890 1234",
    cardholderName: "Mike Gormeo",
    balance: 3250.75,
    formattedBalance: "3,250.75",
    type: "mastercard",
    expiry: "07/25",
    cvv: "321",
    isActive: false
  }
];