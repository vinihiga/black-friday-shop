import {} from "../shared/lib/instrumentation.ts";
import express, { type Express } from "express";
import customLogger from "../shared/middlewares/customLogger.ts";
import customRouter from "./routes/customRouter.ts";

const app: Express = express();

app.use(express.json());
app.use(customLogger("cart"));
app.use("/cart", customRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[LOG] [cart] Server running on port ${PORT}`);
});
