import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectByShareId,
} from '../controllers/projectController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public share route
router.get('/share/:shareId', getProjectByShareId);

// Protected routes
router.use(authMiddleware);
router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
