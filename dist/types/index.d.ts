export interface UserAttributes {
    id: number;
    username: string;
    email: string | null;
    password: string;
    role: 'admin' | 'user';
    isActive: boolean;
    lastLoginAt: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface FeedbackAttributes {
    id: number;
    rating: number;
    wordRating: string;
    topics: string[];
    ipAddress: string | null;
    userAgent: string | null;
    userId: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    user: {
        id: number;
        username: string;
        email: string | null;
        role: string;
    };
}
export interface CreateFeedbackRequest {
    rating: number;
    wordRating: string;
    topics: string[];
}
export interface UpdateFeedbackRequest {
    rating?: number;
    wordRating?: string;
    topics?: string[];
}
export interface FeedbackStats {
    total: number;
    averageRating: number;
    ratingCounts: Record<number, number>;
    wordRatingCounts: Record<string, number>;
    topicCounts: Record<string, number>;
}
export interface AuthRequest extends Request {
    user?: {
        id: number;
        username: string;
        role: string;
    };
}
//# sourceMappingURL=index.d.ts.map