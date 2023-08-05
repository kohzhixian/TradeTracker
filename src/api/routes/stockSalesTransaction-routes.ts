import { Router } from "express";
import stockSalesTransactionController from "../controllers/stockSalesTransaction-controller";

const router = Router();

router.post('/createSalesTransaction', stockSalesTransactionController.createSalesTransaction);

export = router;