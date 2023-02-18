import { Router } from 'express';
import productsController from './products.controller';

const router = Router();

router.get('/', productsController.getAll);
router.post('/', productsController.create);
router.get('/:id', productsController.getOne);
router.patch('/:id', productsController.update);
router.delete('/:id', productsController.delete);

export default router;
