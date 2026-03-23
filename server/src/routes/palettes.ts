import { Router } from 'express';
import { getPalettes, createPalette } from '../controllers/paletteController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getPalettes);
router.post('/', authMiddleware, createPalette);

export default router;
