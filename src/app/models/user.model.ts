export interface User {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    getIdToken: () => Promise<string>;
    getIdTokenResult: () => Promise<{
        token: string;
        authTime: string;
        expirationTime: string;
        issuedAtTime: string;
        signInProvider: string;
        claims: Record<string, any>;
        signInSecondFactor: any;
    }>;
    delete: () => Promise<void>;
    linkWithCredential: (credential: any) => Promise<User>;
    linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: any) => Promise<any>;
    linkWithPopup: (provider: any) => Promise<User>;
    linkWithRedirect: (provider: any) => Promise<void>;
}

