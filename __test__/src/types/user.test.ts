import {
    UserProfile,
    UserPreferences,
    UserSecurity,
    UserSession,
    Contact,
    CompleteUserData,
} from '../../../src/types/user';

describe('User Types', () => {
    describe('UserProfile', () => {
        it('should create a valid UserProfile object', () => {
            const userProfile: UserProfile = {
                id: 'user-123',
                name: 'John Doe',
                username: 'johndoe',
                email: 'john@example.com',
                dob: '1990-01-01',
                presentAddress: '123 Main St',
                permanentAddress: '123 Main St',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
                profileImage: 'https://example.com/avatar.jpg',
                joinDate: '2023-01-01',
                phoneNumber: '+1234567890',
                password: 'hashedPassword123',
            };

            expect(userProfile).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
                email: expect.any(String),
                dob: expect.any(String),
                presentAddress: expect.any(String),
                permanentAddress: expect.any(String),
                city: expect.any(String),
                postalCode: expect.any(String),
                country: expect.any(String),
                profileImage: expect.any(String),
                joinDate: expect.any(String),
            });
        });

        it('should allow optional fields to be undefined', () => {
            const userProfile: UserProfile = {
                id: 'user-123',
                name: 'John Doe',
                username: 'johndoe',
                email: 'john@example.com',
                dob: '1990-01-01',
                presentAddress: '123 Main St',
                permanentAddress: '123 Main St',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
                profileImage: 'https://example.com/avatar.jpg',
                joinDate: '2023-01-01',
            };

            expect(userProfile.phoneNumber).toBeUndefined();
            expect(userProfile.password).toBeUndefined();
        });
    });

    describe('UserPreferences', () => {
        it('should create a valid UserPreferences object', () => {
            const preferences: UserPreferences = {
                notifications: {
                    email: true,
                    push: false,
                    sms: true,
                    newsletter: false,
                },
                language: 'en',
                timezone: 'UTC',
                currency: 'USD',
            };

            expect(preferences).toMatchObject({
                notifications: {
                    email: expect.any(Boolean),
                    push: expect.any(Boolean),
                    sms: expect.any(Boolean),
                    newsletter: expect.any(Boolean),
                },
                language: expect.any(String),
                timezone: expect.any(String),
                currency: expect.any(String),
            });
        });

        it('should validate notification settings structure', () => {
            const preferences: UserPreferences = {
                notifications: {
                    email: true,
                    push: true,
                    sms: true,
                    newsletter: true,
                },
                language: 'en',
                timezone: 'America/New_York',
                currency: 'USD',
            };

            expect(Object.keys(preferences.notifications)).toEqual([
                'email',
                'push',
                'sms',
                'newsletter',
            ]);
            expect(Object.values(preferences.notifications)).toEqual([
                true,
                true,
                true,
                true,
            ]);
        });
    });

    describe('UserSession', () => {
        it('should create a valid UserSession object', () => {
            const session: UserSession = {
                id: 'session-123',
                device: 'Chrome on Windows',
                location: 'New York, NY',
                lastActive: '2023-12-25T10:00:00Z',
                ipAddress: '192.168.1.1',
                isCurrent: true,
            };

            expect(session).toMatchObject({
                id: expect.any(String),
                device: expect.any(String),
                location: expect.any(String),
                lastActive: expect.any(String),
                ipAddress: expect.any(String),
                isCurrent: expect.any(Boolean),
            });
        });

        it('should handle current and non-current sessions', () => {
            const currentSession: UserSession = {
                id: 'current-session',
                device: 'Chrome',
                location: 'New York',
                lastActive: '2023-12-25T10:00:00Z',
                ipAddress: '192.168.1.1',
                isCurrent: true,
            };

            const pastSession: UserSession = {
                id: 'past-session',
                device: 'Safari',
                location: 'California',
                lastActive: '2023-12-24T08:00:00Z',
                ipAddress: '192.168.1.2',
                isCurrent: false,
            };

            expect(currentSession.isCurrent).toBe(true);
            expect(pastSession.isCurrent).toBe(false);
        });
    });

    describe('UserSecurity', () => {
        it('should create a valid UserSecurity object', () => {
            const security: UserSecurity = {
                twoFactorEnabled: true,
                lastPasswordChange: '2023-12-01T00:00:00Z',
                activeSessions: [
                    {
                        id: 'session-1',
                        device: 'Chrome',
                        location: 'New York',
                        lastActive: '2023-12-25T10:00:00Z',
                        ipAddress: '192.168.1.1',
                        isCurrent: true,
                    },
                ],
            };

            expect(security).toMatchObject({
                twoFactorEnabled: expect.any(Boolean),
                lastPasswordChange: expect.any(String),
                activeSessions: expect.any(Array),
            });
            expect(security.activeSessions).toHaveLength(1);
            expect(security.activeSessions[0]).toMatchObject({
                id: expect.any(String),
                device: expect.any(String),
                location: expect.any(String),
                lastActive: expect.any(String),
                ipAddress: expect.any(String),
                isCurrent: expect.any(Boolean),
            });
        });

        it('should handle multiple active sessions', () => {
            const security: UserSecurity = {
                twoFactorEnabled: false,
                lastPasswordChange: '2023-11-01T00:00:00Z',
                activeSessions: [
                    {
                        id: 'session-1',
                        device: 'Chrome',
                        location: 'New York',
                        lastActive: '2023-12-25T10:00:00Z',
                        ipAddress: '192.168.1.1',
                        isCurrent: true,
                    },
                    {
                        id: 'session-2',
                        device: 'Safari',
                        location: 'California',
                        lastActive: '2023-12-24T08:00:00Z',
                        ipAddress: '192.168.1.2',
                        isCurrent: false,
                    },
                ],
            };

            expect(security.activeSessions).toHaveLength(2);
            expect(security.activeSessions.filter(s => s.isCurrent)).toHaveLength(1);
        });
    });

    describe('Contact', () => {
        it('should create a valid Contact object', () => {
            const contact: Contact = {
                id: 'contact-123',
                name: 'Jane Smith',
                role: 'Developer',
                avatar: 'https://example.com/jane.jpg',
                email: 'jane@example.com',
                phone: '+1234567890',
            };

            expect(contact).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
                role: expect.any(String),
                avatar: expect.any(String),
            });
        });

        it('should allow optional email and phone fields', () => {
            const contact: Contact = {
                id: 'contact-456',
                name: 'Bob Wilson',
                role: 'Manager',
                avatar: 'https://example.com/bob.jpg',
            };

            expect(contact.email).toBeUndefined();
            expect(contact.phone).toBeUndefined();
        });
    });

    describe('CompleteUserData', () => {
        it('should create a valid CompleteUserData object', () => {
            const userData: CompleteUserData = {
                profile: {
                    id: 'user-123',
                    name: 'John Doe',
                    username: 'johndoe',
                    email: 'john@example.com',
                    dob: '1990-01-01',
                    presentAddress: '123 Main St',
                    permanentAddress: '123 Main St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                    profileImage: 'https://example.com/avatar.jpg',
                    joinDate: '2023-01-01',
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: false,
                        sms: true,
                        newsletter: false,
                    },
                    language: 'en',
                    timezone: 'UTC',
                    currency: 'USD',
                },
                security: {
                    twoFactorEnabled: true,
                    lastPasswordChange: '2023-12-01T00:00:00Z',
                    activeSessions: [],
                },
            };

            expect(userData).toMatchObject({
                profile: expect.any(Object),
                preferences: expect.any(Object),
                security: expect.any(Object),
            });
        });

        it('should validate the structure of nested objects', () => {
            const userData: CompleteUserData = {
                profile: {
                    id: 'user-123',
                    name: 'John Doe',
                    username: 'johndoe',
                    email: 'john@example.com',
                    dob: '1990-01-01',
                    presentAddress: '123 Main St',
                    permanentAddress: '123 Main St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                    profileImage: 'https://example.com/avatar.jpg',
                    joinDate: '2023-01-01',
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: false,
                        sms: true,
                        newsletter: false,
                    },
                    language: 'en',
                    timezone: 'UTC',
                    currency: 'USD',
                },
                security: {
                    twoFactorEnabled: true,
                    lastPasswordChange: '2023-12-01T00:00:00Z',
                    activeSessions: [],
                },
            };

            // Validate profile structure
            expect(userData.profile).toHaveProperty('id');
            expect(userData.profile).toHaveProperty('name');
            expect(userData.profile).toHaveProperty('email');

            // Validate preferences structure
            expect(userData.preferences).toHaveProperty('notifications');
            expect(userData.preferences).toHaveProperty('language');
            expect(userData.preferences.notifications).toHaveProperty('email');

            // Validate security structure
            expect(userData.security).toHaveProperty('twoFactorEnabled');
            expect(userData.security).toHaveProperty('activeSessions');
            expect(Array.isArray(userData.security.activeSessions)).toBe(true);
        });
    });
});

// Type guard utility functions for testing
export const isUserProfile = (obj: any): obj is UserProfile => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.username === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.dob === 'string' &&
        typeof obj.presentAddress === 'string' &&
        typeof obj.permanentAddress === 'string' &&
        typeof obj.city === 'string' &&
        typeof obj.postalCode === 'string' &&
        typeof obj.country === 'string' &&
        typeof obj.profileImage === 'string' &&
        typeof obj.joinDate === 'string'
    );
};

export const isUserSession = (obj: any): obj is UserSession => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.device === 'string' &&
        typeof obj.location === 'string' &&
        typeof obj.lastActive === 'string' &&
        typeof obj.ipAddress === 'string' &&
        typeof obj.isCurrent === 'boolean'
    );
};

describe('Type Guards', () => {
    describe('isUserProfile', () => {
        it('should return true for valid UserProfile', () => {
            const profile = {
                id: 'user-123',
                name: 'John Doe',
                username: 'johndoe',
                email: 'john@example.com',
                dob: '1990-01-01',
                presentAddress: '123 Main St',
                permanentAddress: '123 Main St',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
                profileImage: 'https://example.com/avatar.jpg',
                joinDate: '2023-01-01',
            };

            expect(isUserProfile(profile)).toBe(true);
        });

        it('should return false for invalid UserProfile', () => {
            const invalidProfile = {
                id: 123, // Should be string
                name: 'John Doe',
            };

            expect(isUserProfile(invalidProfile)).toBe(false);
            expect(isUserProfile(null)).toBe(false);
            expect(isUserProfile(undefined)).toBe(false);
            expect(isUserProfile('string')).toBe(false);
        });
    });

    describe('isUserSession', () => {
        it('should return true for valid UserSession', () => {
            const session = {
                id: 'session-123',
                device: 'Chrome',
                location: 'New York',
                lastActive: '2023-12-25T10:00:00Z',
                ipAddress: '192.168.1.1',
                isCurrent: true,
            };

            expect(isUserSession(session)).toBe(true);
        });

        it('should return false for invalid UserSession', () => {
            const invalidSession = {
                id: 'session-123',
                device: 'Chrome',
                isCurrent: 'true', // Should be boolean
            };

            expect(isUserSession(invalidSession)).toBe(false);
        });
    });
});
