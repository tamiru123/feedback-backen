import { Request, Response } from 'express';
import { CreateFeedbackRequest, UpdateFeedbackRequest } from '../types';
export declare class FeedbackController {
    private feedbackService;
    constructor();
    create: (req: Request<{}, {}, CreateFeedbackRequest>, res: Response) => Promise<void>;
    getAll: (req: Request, res: Response) => Promise<void>;
    getOne: (req: Request<{
        id: string;
    }>, res: Response) => Promise<void>;
    update: (req: Request<{
        id: string;
    }, {}, UpdateFeedbackRequest>, res: Response) => Promise<void>;
    delete: (req: Request<{
        id: string;
    }>, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=FeedbackController.d.ts.map