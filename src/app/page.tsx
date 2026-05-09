'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Shield, Smartphone, Globe, LayoutGrid, CheckCircle, Menu, X, Brain, Lock } from 'lucide-react';
import { identity } from '@/lib/identity';
import { ShivAIUser } from '@/lib/sdk';

// Futuristic Components
import MailSidebar from '@/components/layout/MailSidebar';
import InboxFeed from '@/components/mail/InboxFeed';
import EmailThreadView from '@/components/mail/EmailThreadView';
import IntelligencePanel from '@/components/mail/IntelligencePanel';
import { GlassCard } from '@/components/ui/GlassUI';

export default function Home() {
  const [user, setUser] = useState<ShivAIUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const u = await identity.getCurrentUser();
      setUser(u);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
        const { data, error } = await identity.login(loginEmail, loginPassword);
        if (error) throw error;
        window.location.reload();
    } catch (err: any) {
        setAuthError(err.message || 'Access Denied');
    } finally {
        setAuthLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#050505]">
       <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl animate-pulse flex items-center justify-center border border-white/10">
             <Mail className="text-white" size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/50">Decrypting Comm OS</p>
       </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      
      <GlassCard className="max-w-md w-full p-10 text-center relative z-10 border-white/5 bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
         <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Mail className="text-blue-500" size={32} />
         </div>
         <h1 className="text-3xl font-black text-white mb-2 tracking-tighter italic uppercase">ShivAI Mail Hub</h1>
         <p className="text-gray-500 text-sm mb-10 font-medium">Access your intelligent communication engine.</p>
         
         <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
               <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 ml-1">Identity Handle</label>
               <div className="relative">
                  <Mail size={16} className="absolute left-4 top-4 text-gray-600" />
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="name@shiv.ai"
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                    required
                  />
               </div>
            </div>
            <div>
               <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 ml-1">Master Password</label>
               <div className="relative">
                  <Lock size={16} className="absolute left-4 top-4 text-gray-600" />
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                    required
                  />
               </div>
            </div>

            {authError && <p className="text-red-400 text-xs font-bold text-center bg-red-400/10 p-3 rounded-xl border border-red-400/20">{authError}</p>}

            <button 
              type="submit"
              disabled={authLoading}
              className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3"
            >
               {authLoading ? 'Verifying Neural Pattern...' : 'Open Comm Hub'}
               {!authLoading && <CheckCircle size={20} />}
            </button>
         </form>

         <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-xs text-gray-600 font-medium tracking-tight">Requires a verified ShivAI Identity</p>
            <button 
              onClick={() => window.open('https://shivai-identity.vercel.app', '_blank')} 
              className="text-xs font-black uppercase text-blue-400 hover:text-blue-300 tracking-widest transition-colors"
            >
               Generate Identity
            </button>
         </div>
      </GlassCard>
    </div>
  );

  return (
    <main className="h-screen bg-[#050505] flex overflow-hidden selection:bg-blue-500/30 selection:text-white">
       
       {/* Triple-Pane Orchestration */}
       <div className="flex w-full h-full">
          
          {/* Panel 1: Navigation (Persistent) */}
          <div className="h-full shrink-0">
             <MailSidebar 
               activeFolder={activeFolder} 
               onFolderSelect={(f) => { setActiveFolder(f); setSelectedMailId(null); }}
               isCollapsed={isSidebarCollapsed}
             />
          </div>

          {/* Panel 2: Intelligent Feed (Main Content) */}
          <div className="flex-1 min-w-[400px] border-r border-white/5 h-full overflow-hidden bg-[#050505]">
             <InboxFeed 
               onMailSelect={setSelectedMailId} 
               selectedId={selectedMailId || undefined} 
             />
          </div>

          {/* Panel 3: Contextual Intelligence (Right Side) */}
          <div className="hidden xl:block w-[450px] h-full shrink-0 bg-[#080808]/50 backdrop-blur-md">
             <IntelligencePanel mailId={selectedMailId} />
          </div>

          {/* Thread Overlay (Mobile/Tablet and Desktop Detail) */}
          <AnimatePresence>
            {selectedMailId && (
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed inset-0 lg:left-72 xl:right-[450px] z-[100] bg-[#050505] shadow-[-20px_0_100px_rgba(0,0,0,0.8)]"
              >
                 <EmailThreadView 
                    mailId={selectedMailId} 
                    onBack={() => setSelectedMailId(null)} 
                 />
              </motion.div>
            )}
          </AnimatePresence>

       </div>

       {/* Floating AI Orb Assistant */}
       <div className="fixed bottom-10 right-[480px] hidden xl:block z-[200]">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20 group relative"
          >
             <div className="absolute -top-12 right-0 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[8px] font-black uppercase text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest">
                Ask AI Assistant
             </div>
             <Brain className="text-white" size={24} />
          </motion.button>
       </div>

    </main>
  );
}
