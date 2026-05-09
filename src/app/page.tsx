'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Shield, Smartphone, Globe, LayoutGrid, CheckCircle, Menu, X, Brain, Lock } from 'lucide-react';
import { identity } from '@/lib/identity';
import { ShivAIUser } from '@/lib/sdk';
import MailSidebar from '@/components/layout/MailSidebar';
import InboxFeed from '@/components/mail/InboxFeed';
import EmailThreadView from '@/components/mail/EmailThreadView';
import { GlassCard, NeonButton } from '@/components/ui/GlassUI';

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
  const [authLoading, setAuthErrorLoading] = useState(false);

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
    setAuthErrorLoading(true);
    setAuthError('');
    try {
        const { data, error } = await identity.login(loginEmail, loginPassword);
        if (error) throw error;
        window.location.reload();
    } catch (err: any) {
        setAuthError(err.message || 'Access Denied');
    } finally {
        setAuthErrorLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#050505]">
       <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl animate-pulse flex items-center justify-center">
             <Mail className="text-white" size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/50">Decrypting Inbox</p>
       </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      
      <GlassCard className="max-w-md w-full p-10 text-center relative z-10 border-white/5 bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[2.5rem]">
         <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl mx-auto flex items-center justify-center mb-8">
            <Mail className="text-blue-500" size={32} />
         </div>
         <h1 className="text-3xl font-black text-white mb-2 tracking-tighter italic uppercase">ShivAI Mail</h1>
         <p className="text-gray-500 text-sm mb-10">Access your encrypted communications hub.</p>
         
         <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
               <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 ml-1">ShivAI Email</label>
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
               {authLoading ? 'Verifying...' : 'Continue to Inbox'}
               {!authLoading && <CheckCircle size={20} />}
            </button>
         </form>

         <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-xs text-gray-600 font-medium">Don't have an address?</p>
            <button 
              onClick={() => window.location.href = 'https://shivai-identity-prod.vercel.app'} 
              className="text-xs font-black uppercase text-blue-400 hover:text-blue-300 tracking-widest transition-colors"
            >
               Create ShivAI Identity
            </button>
         </div>
      </GlassCard>
    </div>
  );

  return (
    <main className="h-screen bg-[#050505] flex overflow-hidden">
       {/* Sidebar */}
       <div className="hidden lg:block h-full shrink-0">
          <MailSidebar 
            activeFolder={activeFolder} 
            onFolderSelect={(f) => { setActiveFolder(f); setSelectedMailId(null); }}
            isCollapsed={isSidebarCollapsed}
          />
       </div>

       {/* Mobile Header */}
       <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={18} />
             </div>
             <span className="font-black text-white tracking-tighter">SHIVAI <span className="text-blue-500">MAIL</span></span>
          </div>
          <button className="text-gray-400">
             <Menu size={24} />
          </button>
       </div>

       {/* Main Layout */}
       <div className={cn(
         "flex-1 flex pt-16 lg:pt-0 relative",
         selectedMailId ? "overflow-hidden" : "overflow-y-auto"
       )}>
          
          {/* Feed Layer */}
          <div className={cn(
            "flex-1 transition-all duration-500 ease-in-out",
            selectedMailId ? "lg:w-1/3 lg:flex-none border-r border-white/5" : "w-full"
          )}>
             <InboxFeed 
               onMailSelect={setSelectedMailId} 
               selectedId={selectedMailId || undefined} 
             />
          </div>

          {/* Thread View Layer */}
          <AnimatePresence>
            {selectedMailId && (
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={cn(
                  "fixed inset-0 z-50 lg:relative lg:inset-auto lg:flex-1 bg-[#080808]",
                  "pt-16 lg:pt-0"
                )}
              >
                 <EmailThreadView 
                    mailId={selectedMailId} 
                    onBack={() => setSelectedMailId(null)} 
                 />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick AI Action Bubble (Desktop Only) */}
          <div className="hidden xl:block fixed bottom-8 right-8">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20 group relative"
             >
                <div className="absolute -top-12 right-0 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest">
                   Ask AI Assistant
                </div>
                <Brain className="text-white" size={24} />
             </motion.button>
          </div>
       </div>
    </main>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
