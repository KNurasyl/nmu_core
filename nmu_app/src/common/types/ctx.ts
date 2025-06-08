import { Request, Response } from 'express';
import { JwtPayload } from './jwt-payload';

export interface GqlContext {
  req: Request & { cookies?: Record<string, string> };
  res: Response;
  user: JwtPayload | null;
}
