import { Request } from 'express';
import { JwtPayload } from '../../../auth/src/dto';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
