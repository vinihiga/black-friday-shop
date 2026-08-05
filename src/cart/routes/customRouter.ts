import { Router } from "express";
import { getCart, payCart } from "../controllers/cartController.ts";

const customRouter = Router();

customRouter.get("/", getCart);
customRouter.post("/", payCart);

export default customRouter;
