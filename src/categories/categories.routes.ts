import { Router } from 'express';
import categoriesController from './categories.controller';

const router = Router();

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getOne);
router.post('/', categoriesController.create)
export default router;
