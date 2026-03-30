import { Request, Response } from 'express';
export declare class FeedbackController {
    private feedbackService;
    constructor();
    create: (req: Request, res: Response) => Promise<void>;
    getAll: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
    getOne: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
export default FeedbackController;
//# sourceMappingURL=FeedbackController.d.ts.map