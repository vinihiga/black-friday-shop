import express, { type Express } from "express";
import customLogger from "./middlewares/customLogger.ts";
import customRouter from "./routes/customRouter.ts";

const app: Express = express();

app.use(express.json());
app.use(customLogger);
app.use("/cart", customRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[INFO] Server running on port ${PORT}`);
});
