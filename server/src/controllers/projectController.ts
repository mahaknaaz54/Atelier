import { Response } from 'express';
import Project from '../models/Project';
import { AuthRequest } from '../middleware/auth';

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const getProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const getProjectByShareId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!project) {
      res.status(404).json({ message: 'Project not found or not public' });
      return;
    }
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, sceneState, thumbnail } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Project name is required' });
      return;
    }
    const project = await Project.create({
      userId: req.userId,
      name,
      description,
      sceneState,
      thumbnail,
    });
    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, sceneState, thumbnail, isPublic } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, description, sceneState, thumbnail, isPublic },
      { new: true, runValidators: true }
    );
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};
