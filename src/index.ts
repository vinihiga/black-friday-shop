import express, { type Express, type Request, type Response } from "express";
import customLogger from "./middlewares/customLogger.ts";
import customRouter from "./routes/customRouter.ts";

const app: Express = express();

app.use(express.json());
app.use(customLogger);
app.use("/cart", customRouter);

app.listen(3000);
