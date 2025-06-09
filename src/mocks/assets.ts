// This file provides URLs to fallback assets when real images aren't available
import catherineImg from '../assets/avatars/catherine.jpg';
import liviaImg from '../assets/avatars/livia.jpg';
import randyImg from '../assets/avatars/randy.jpg';
import workmanImg from '../assets/avatars/workman.jpg';

import cardChip from '../assets/icons/card-chip.png';

export const assets = {
    placeholderAvatar: 'https://via.placeholder.com/150',
    
    defaultUserImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    
    avatars: {
      catherine: catherineImg,
      livia: liviaImg,
      randy: randyImg,
      workman: workmanImg,
      sarah: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
      tom: '',
      amir: '',
      kent: '',
    },
    
    cardBackgrounds: {
      visa: 'https://images.unsplash.com/photo-1616437260392-453e8ab72cab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      mastercard: 'https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      chip: cardChip,
    },
    
    categoryIcons: {
      entertainment: 'https://img.icons8.com/ios-filled/50/000000/film-reel.png',
      bills: 'https://img.icons8.com/ios-filled/50/000000/bill.png',
      investment: 'https://img.icons8.com/ios-filled/50/000000/bonds.png',
      shopping: 'https://img.icons8.com/ios-filled/50/000000/shopping-bag.png',
      transfer: 'https://img.icons8.com/ios-filled/50/000000/bank-transfer.png',
      income: 'https://img.icons8.com/ios-filled/50/000000/receive-cash.png'
    },
    
    // Logo for the application
    logo: 'https://img.icons8.com/ios-filled/50/4F46E5/lightning-bolt.png'
  };