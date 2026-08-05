import express, { type Express } from "express";
import customLogger from "../shared/middlewares/customLogger.ts";
import customRouter from "./routes/customRouter.ts";

const app: Express = express();

app.use(express.json());
app.use(customLogger("catalog"));
app.use("/catalog", customRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[LOG] [catalog] Server running on port ${PORT}`);
});
