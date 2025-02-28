export interface UserProfile {
    id: string;
    name: string;
    username: string;
    email: string;
    dob: string;
    presentAddress: string;
    permanentAddress: string;
    city: string;
    postalCode: string;
    country: string;
    profileImage: string;
    joinDate: string;
    phoneNumber?: string;
    password?: string;
  }
  
  export interface UserPreferences {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      newsletter: boolean;
    };
    language: string;
    timezone: string;
    currency: string;
  }
  
  export interface UserSecurity {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    activeSessions: UserSession[];
  }
  
  export interface UserSession {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    ipAddress: string;
    isCurrent: boolean;
  }
  
  export interface Contact {
    id: string;
    name: string;
    role: string;
    avatar: string;
    email?: string;
    phone?: string;
  }

  export interface CompleteUserData {
    profile: UserProfile;
    preferences: UserPreferences;
    security: UserSecurity;
  }