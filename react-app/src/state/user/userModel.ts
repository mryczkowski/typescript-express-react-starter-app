export interface User {
    id: number;
    email: string;
    password?: string;
    oauthProvider: string;
    oauthProviderAccountId: string;
    isVerified: boolean;
}