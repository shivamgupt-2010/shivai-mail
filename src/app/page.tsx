'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Shield, Smartphone, Globe, LayoutGrid, CheckCircle, Menu, X, Brain } from 'lucide-react';
import { identity } from '@/lib/identity';
import { ShivAIUser } from '@shivai/identity-sdk';
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

  useEffect(() => {
    const checkAuth = async () => {
      const u = await identity.getCurrentUser();
      setUser(u);
      setLoading(false);
    };
    checkAuth();
  }, []);

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
      
      <GlassCard className="max-w-md w-full p-12 text-center relative z-10 border-white/5">
         <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl mx-auto flex items-center justify-center mb-8">
            <Shield className="text-blue-500" size={40} />
         </div>
         <h1 className="text-4xl font-black text-white mb-4 tracking-tighter italic">AUTHENTICATION REQUIRED</h1>
         <p className="text-gray-500 text-sm mb-12 leading-relaxed">Please verify your ShivAI Identity to access your encrypted communications hub.</p>
         
         <div className="space-y-4">
            <NeonButton 
              onClick={() => window.location.href = 'https://shivai-identity-prod.vercel.app'} 
              className="w-full h-16 text-lg"
            >
               Continue with Identity
            </NeonButton>
            <p className="text-[10px] font-black uppercase text-gray-700 tracking-widest">Ecosystem Protected by ShivAI Root</p>
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
