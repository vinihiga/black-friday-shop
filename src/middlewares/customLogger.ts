import type { NextFunction, Request, Response } from "express";

const customLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[LOG] Receiving request from ${req.ip} to ${req.path}`);
  next();
};

export default customLogger;
