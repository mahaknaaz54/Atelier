import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authApi } from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = mode === 'register'
        ? await authApi.register({ name, email, password })
        : await authApi.login({ email, password });

      const { token, user } = payload.data;
      login(user, token);
      navigate('/app');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D8BAFA]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFB4AA]/6 blur-[100px] rounded-full pointer-events-none" />

      {/* Back to home */}
      <a
        href="/"
        className="absolute top-8 left-8 font-headline text-xs font-bold uppercase tracking-widest text-[#c4c9ac] hover:text-[#FFB4AA] transition-colors flex items-center gap-2"
      >
        ← Atelier<span className="text-[#FFB4AA]">.</span>
      </a>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel p-10 rounded-2xl ghost-border shadow-ambient w-full max-w-md relative z-10"
      >
        {/* Accent top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB4AA]/40 to-transparent rounded-t-2xl" />

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-headline text-3xl font-bold mb-2">
            Atelier<span className="text-[#FFB4AA]">.</span>
          </div>
          <p className="font-body text-sm text-[#c4c9ac]">
            {mode === 'login' ? 'Welcome back to your studio' : 'Begin your design journey'}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex bg-[#1c1b1b] rounded-xl p-1 mb-8 ghost-border">
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg font-headline text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                mode === m
                  ? 'bg-[#FFB4AA] text-[#1a2200]'
                  : 'text-[#c4c9ac] hover:text-[#e5e2e1]'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {mode === 'register' && (
              <div>
                <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#c4c9ac] block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full bg-[#1c1b1b] text-[#e5e2e1] placeholder-[#353534] px-4 py-3 rounded-xl ghost-border outline-none focus:ring-1 focus:ring-[#FFB4AA]/40 font-body text-sm transition-all"
                />
              </div>
            )}

            <div>
              <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#c4c9ac] block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="designer@studio.com"
                required
                className="w-full bg-[#1c1b1b] text-[#e5e2e1] placeholder-[#353534] px-4 py-3 rounded-xl ghost-border outline-none focus:ring-1 focus:ring-[#FFB4AA]/40 font-body text-sm transition-all"
              />
            </div>

            <div>
              <label className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#c4c9ac] block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#1c1b1b] text-[#e5e2e1] placeholder-[#353534] px-4 py-3 rounded-xl ghost-border outline-none focus:ring-1 focus:ring-[#FFB4AA]/40 font-body text-sm transition-all"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl font-body text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFB4AA] text-[#1a2200] py-4 rounded-xl font-headline font-bold uppercase tracking-widest hover:brightness-105 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed glow-primary-sm mt-2"
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Enter Studio' : 'Create Account'}
            </button>
          </motion.form>
        </AnimatePresence>

        <p className="font-body text-xs text-[#c4c9ac] text-center mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-[#D8BAFA] hover:text-[#FFB4AA] transition-colors font-bold"
          >
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
