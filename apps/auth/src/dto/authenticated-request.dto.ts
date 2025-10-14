import { Request } from 'express';
import { JwtPayload } from './index';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
