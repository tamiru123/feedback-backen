import { Request, Response, NextFunction } from 'express';
export declare const validate: (validations: any[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const loginValidation: import("express-validator").ValidationChain[];
export declare const feedbackValidation: import("express-validator").ValidationChain[];
export declare const updateFeedbackValidation: import("express-validator").ValidationChain[];
//# sourceMappingURL=validation.d.ts.map