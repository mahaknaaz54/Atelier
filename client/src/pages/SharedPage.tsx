import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsApi } from '../lib/api';

interface Project {
  name: string;
  sceneState: {
    wallColor: string;
    floorColor: string;
    ceilingColor: string;
    activePreset: string;
  };
  updatedAt: string;
}

export default function SharedPage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!shareId) return;
    projectsApi.getByShareId(shareId)
      .then((res) => setProject(res.data.project))
      .catch(() => setError('Project not found or is private.'))
      .finally(() => setLoading(false));
  }, [shareId]);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col items-center justify-center p-8">
      <Link to="/" className="font-headline text-2xl font-bold mb-12">Atelier<span className="text-[#FFB4AA]">.</span></Link>

      {loading && <div className="font-headline text-[#c4c9ac] uppercase tracking-widest animate-pulse">Loading design...</div>}
      {error && <div className="font-headline text-red-400">{error}</div>}

      {project && (
        <div className="glass-panel p-10 rounded-2xl ghost-border shadow-ambient max-w-sm w-full text-center">
          <div className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#c4c9ac] mb-2">Shared Design</div>
          <h1 className="font-headline text-2xl font-bold mb-1">{project.name}</h1>
          <div className="font-headline text-xs text-[#D8BAFA] mb-6">{project.sceneState.activePreset}</div>

          <div className="grid grid-cols-3 gap-3 mb-6 h-24 rounded-xl overflow-hidden ghost-border">
            {[project.sceneState.wallColor, project.sceneState.floorColor, project.sceneState.ceilingColor].map((c, i) => (
              <div key={i} style={{ background: c }} />
            ))}
          </div>

          <Link to="/auth" className="block w-full bg-[#FFB4AA] text-[#1a2200] py-3 rounded-xl font-headline font-bold uppercase tracking-widest hover:brightness-105 transition-all">
            Open in Atelier
          </Link>
          <p className="font-body text-xs text-[#c4c9ac] mt-3">Sign in to load and customize this design</p>
        </div>
      )}
    </div>
  );
}
