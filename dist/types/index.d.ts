import { Request } from 'express';
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
export interface User {
    id: number;
    username: string;
    email: string | null;
    role: 'admin' | 'user';
}
export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    user: User;
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
export interface Feedback {
    id: number;
    rating: number;
    wordRating: string;
    topics: string[];
    createdAt: string;
    updatedAt?: string;
}
export interface CreateFeedbackRequest {
    rating: number;
    wordRating: string;
    topics: string[];
    feedback?: string;
}
export interface UpdateFeedbackRequest {
    rating?: number;
    wordRating?: string;
    topics?: string[];
    feedback?: string;
}
export interface FeedbackStats {
    total: number;
    averageRating: number;
    ratingCounts: Record<number, number>;
    wordRatingCounts: Record<string, number>;
    topicCounts: Record<string, number>;
}
export interface SectorAttributes {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Sector {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
}
export interface QuestionAttributes {
    id: number;
    sectorId: number;
    type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'rating';
    text: string;
    options: string[] | null;
    required: boolean;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Question {
    id: number;
    sectorId: number;
    type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'rating';
    text: string;
    options: string[] | null;
    required: boolean;
    order: number;
    isActive: boolean;
}
export interface AuthRequest extends Request {
    user?: {
        id: number;
        username: string;
        role: string;
    };
}
//# sourceMappingURL=index.d.ts.map