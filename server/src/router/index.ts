/** Router principal */
import { Router } from 'express';
import todo from './todo';

const router = Router();

/** El ruteo de cada segmento está en su propio archivo */
router.use('/api/todos', todo);

export default router;
