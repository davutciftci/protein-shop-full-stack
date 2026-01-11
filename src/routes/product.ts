import { Router } from "express";
import { UserRole } from "../../generated/prisma";
import { getProduct, getProducts, createNewProduct, deleteProductById, updateProductById } from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { requireRole } from "../middlewares/roleMiddleware";
import { validate } from "../middlewares/validate";
import { createProductSchema, updateProductSchema } from "../validators/product";


const router = Router();

router.use((req, res, next) => {
    console.log(`[$ProductRoutes] ${req.method} ${req.originalUrl}`)
    next()
})

router.get("/", getProducts)
router.get("/:id", getProduct);

router.post("/", authenticate, requireRole(UserRole.ADMIN), validate(createProductSchema), createNewProduct)
router.put("/:id", authenticate, requireRole(UserRole.ADMIN), validate(updateProductSchema), updateProductById);
router.delete("/:id", authenticate, requireRole(UserRole.ADMIN), deleteProductById);

export default router;