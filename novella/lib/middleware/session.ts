import type { Request, Response, NextFunction } from 'express';

export const SESSION_HEADER = 'x-novella-session';

export function requireSession(req: Request, res: Response, next: NextFunction): void {
  const sessionId = req.header(SESSION_HEADER);
  if (!sessionId || sessionId.length < 8) {
    res.status(401).json({ error: 'Missing or invalid session. Refresh the page.' });
    return;
  }
  res.locals.sessionId = sessionId;
  next();
}

export function getSessionId(res: Response): string {
  return res.locals.sessionId as string;
}
