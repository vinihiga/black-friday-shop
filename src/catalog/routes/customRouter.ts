import { Router } from "express";
import { updateStock } from "../controllers/catalogController.ts";

const customRouter = Router();

customRouter.put("/", updateStock);

export default customRouter;
