import express, {
  json,
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";

const app: Express = express();

const myLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[LOG] Receiving request from ${req.ip} to ${req.path}`);
  next();
};

app.use(express.json());
app.use(myLogger);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World!",
  });
});

app.listen(3000);
