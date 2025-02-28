import { UserProfile, UserPreferences, UserSecurity, CompleteUserData } from '../types';
import { assets } from './assets';

// User profile data
const profile: UserProfile = {
  id: "user-001",
  name: "Catherine Reed",
  username: "catherine_reed",
  email: "catherinereed@gmail.com",
  dob: "12 January 1990",
  presentAddress: "San Jose, California, USA",
  permanentAddress: "San Jose, California, USA",
  city: "San Jose",
  postalCode: "95113",
  country: "USA",
  profileImage: assets.avatars.catherine,
  phoneNumber: "+1 555-123-4567",
  joinDate: ""
};
  
  // User preferences
  const preferences: UserPreferences = {
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true,
    },
    language: "english",
    timezone: "UTC-8:00",
    currency: "USD",
  };
  
  // User security settings
  const security: UserSecurity = {
    twoFactorEnabled: false,
    lastPasswordChange: "3 months ago",
    activeSessions: [
      {
        id: "session-001",
        device: "MacBook Pro",
        location: "San Jose, CA",
        lastActive: "2 minutes ago",
        ipAddress: "192.168.1.1",
        isCurrent: true
      },
      {
        id: "session-002",
        device: "iPhone 13",
        location: "San Jose, CA",
        lastActive: "1 hour ago",
        ipAddress: "192.168.1.2",
        isCurrent: false
      },
      {
        id: "session-003",
        device: "iPad Pro",
        location: "San Francisco, CA",
        lastActive: "2 days ago",
        ipAddress: "192.168.2.5",
        isCurrent: false
      }
    ]
  };
  
  // Complete user data
  export const userData: CompleteUserData = {
    profile,
    preferences,
    security
  };