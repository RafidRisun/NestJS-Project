import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class oneWeekUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const oneWeekUser = req.body?.oneWeekUser;

        if (!oneWeekUser || (oneWeekUser.toLowerCase() !== 'yes')) {
            throw new BadRequestException('You must be at least one week user!');
        }

        next();
    }
}
