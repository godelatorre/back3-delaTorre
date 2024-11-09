import { Router } from 'express';
import { AdoptionController } from '../controllers/adoption.controller.js';

const adoptionsController = new AdoptionController();

const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.get('/:aid', adoptionsController.getAdoption);
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
