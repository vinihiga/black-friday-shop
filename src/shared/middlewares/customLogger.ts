import type { NextFunction, Request, Response } from "express";

const customLogger =
  (appName: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `[LOG] [${appName}] Receiving request from ${req.ip} to ${req.path}`,
    );
    next();
  };

export default customLogger;
