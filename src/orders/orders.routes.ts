import { Router } from 'express';
import ordersController from './orders.controller';

const router = Router();

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getOne);
router.post('/', ordersController.create);
router.patch('/:id', ordersController.update);
router.delete('/:id', ordersController.delete);

export default router;