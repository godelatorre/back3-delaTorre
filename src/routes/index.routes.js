import { Router } from 'express';
import users from '../modules/users/routes/users.router.js';
import pets from '../modules/pets/routes/pets.routes.js';
import sessions from '../modules/sessions/routes/sessions.routes.js';
import mocks from '../modules/mocks/routes/mock.router.js';
import adoptions from '../modules/adoptions/routes/adoption.router.js';

const router = Router();

router.use('/users', users);
router.use('/pets', pets);
router.use('/sessions', sessions);
router.use('/mocks', mocks);
router.use('/adoptions', adoptions);

export default router;
