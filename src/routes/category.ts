import { Router } from 'express';
import { createdNewCategory, deleteCategoryById, getCategories, getCategory, updateCategoryById } from '../controllers/category';
import { authenticate } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleMiddleware';
import { UserRole } from '../../generated/prisma';
import { validate } from '../middlewares/validate';
import { createCategorySchema, updateCategorySchema } from '../validators/category';


const router = Router();

router.get('', getCategories); // tüm kategorileri getirir
router.get('/:id', getCategory) // id'ye göre kategori getirir
// admin yetkisi olmadan kategorileri oluşturamaz 
router.post('/', authenticate, requireRole(UserRole.ADMIN), validate(createCategorySchema), createdNewCategory)
// admin yetkisi olmadan kategorileri güncelleme yetkisi yoktur
router.put('/:id', authenticate, requireRole(UserRole.ADMIN), validate(updateCategorySchema), updateCategoryById);
// admin yetkisi olmadan kategorileri silme yetkisi yoktur
router.delete('/:id', authenticate, requireRole(UserRole.ADMIN), deleteCategoryById);

export default router;