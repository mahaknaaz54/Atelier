import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsApi } from '../lib/api';
import { useSceneStore } from '../store/sceneStore';
import type { SceneSnapshot } from '../store/sceneStore';

interface Project {
  _id: string;
  name: string;
  description?: string;
  sceneState: SceneSnapshot;
  updatedAt: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const loadSceneSnapshot = useSceneStore((s) => s.loadSceneSnapshot);
  const navigate = useNavigate();

  useEffect(() => {
    projectsApi.getAll().then((res) => {
      setProjects(res.data.projects);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleLoad = (project: Project) => {
    loadSceneSnapshot(project.sceneState);
    navigate('/app');
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await projectsApi.delete(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      {/* Top bar */}
      <header className="fixed top-0 w-full z-50 h-16 glass-panel border-b border-white/5 flex items-center px-4 sm:px-8 gap-4 sm:gap-6">
        <Link to="/" className="font-headline text-lg sm:text-xl font-bold">Atelier<span className="text-[#FFB4AA]">.</span></Link>
        <div className="flex-1" />
        <Link to="/app" className="bg-[#FFB4AA] text-[#1a2200] px-4 sm:px-5 py-2 rounded-xl font-headline text-xs font-bold uppercase tracking-widest hover:brightness-105 transition-all whitespace-nowrap">
          + New Design
        </Link>
      </header>

      <main className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <span className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-[#D8BAFA] mb-3 block">My Studio</span>
          <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight">Saved Designs</h1>
          <p className="font-body text-[#c4c9ac] mt-2 text-sm sm:text-base">Load a previous project or start a new one in the 3D visualizer.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#1c1b1b] rounded-2xl h-48 animate-pulse ghost-border" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <div className="text-5xl sm:text-6xl mb-6">🏠</div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold mb-3">No saved designs yet</h2>
            <p className="font-body text-[#c4c9ac] mb-8 text-sm sm:text-base">Create your first room design in the 3D visualizer.</p>
            <Link to="/app" className="inline-block bg-[#FFB4AA] text-[#1a2200] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-headline font-bold uppercase tracking-widest hover:brightness-105 transition-all glow-primary-sm">
              Open Visualizer
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#1c1b1b] rounded-2xl overflow-hidden ghost-border group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Color preview */}
                <div className="h-28 sm:h-32 grid grid-cols-3 relative">
                  <div style={{ background: project.sceneState?.wallColor ?? '#2a2a2a' }} />
                  <div style={{ background: project.sceneState?.floorColor ?? '#1c1b1b' }} />
                  <div style={{ background: project.sceneState?.ceilingColor ?? '#131313' }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <button onClick={() => handleLoad(project)} className="bg-[#FFB4AA] text-[#1a2200] px-4 py-2 rounded-lg font-headline text-xs font-bold uppercase tracking-widest hover:brightness-105 transition-all">
                      Load Design
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-headline text-sm font-bold text-[#e5e2e1]">{project.name}</h3>
                      <p className="font-headline text-[10px] text-[#c4c9ac] mt-0.5">
                        {project.sceneState?.lightingMode ?? 'custom'} · {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deleting === project._id}
                      className="text-[#c4c9ac] hover:text-red-400 transition-colors text-sm disabled:opacity-40 flex-shrink-0"
                      title="Delete"
                    >
                      {deleting === project._id ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
