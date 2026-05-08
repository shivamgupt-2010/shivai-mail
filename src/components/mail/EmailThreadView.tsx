'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Reply, Forward, Trash, Archive, Star, 
  MoreVertical, Printer, ChevronLeft, Brain, 
  Sparkles, CheckCircle, Smartphone, Globe
} from 'lucide-react';
import { GlassCard, NeonButton, cn } from '../ui/GlassUI';

export default function EmailThreadView({ mailId, onBack }: { mailId: string, onBack: () => void }) {
  // Simplified version: always show the same mock thread
  return (
    <div className="flex-1 h-full bg-[#080808] border-l border-white/5 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <header className="p-4 border-b border-white/5 flex items-center justify-between bg-[#080808]/80 backdrop-blur-md">
         <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl lg:hidden text-gray-400">
               <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
               <ToolbarButton icon={<Archive size={18} />} label="Archive" />
               <ToolbarButton icon={<Trash size={18} />} label="Delete" />
               <ToolbarButton icon={<Star size={18} />} label="Star" />
            </div>
         </div>
         <div className="flex items-center gap-2">
            <NeonButton variant="ghost" className="h-10 py-0 flex items-center gap-2 group">
               <Brain size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold">AI Summarize</span>
            </NeonButton>
            <ToolbarButton icon={<MoreVertical size={18} />} />
         </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
         <div className="max-w-4xl mx-auto">
            {/* AI Summary Box */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-12 p-6 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-3xl relative overflow-hidden"
            >
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                     <Sparkles size={16} className="text-white" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-blue-300">Intelligent Summary</h4>
               </div>
               <p className="text-blue-100/80 text-sm leading-relaxed font-medium">
                  This message is a security alert regarding a new login to your ShivAI Identity. 
                  The login originated from a Windows device in Mumbai. Since this is an unknown location for you, 
                  the system has flagged it for your immediate review.
               </p>
               <div className="absolute right-4 top-4 text-[10px] font-black uppercase text-blue-500/30">ShivAI v2.1</div>
            </motion.div>

            {/* Email Header */}
            <div className="mb-12">
               <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Action Required: New Identity Login detected</h1>
               
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                        S
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-bold text-white">ShivAI Security</h3>
                           <span className="text-[10px] text-gray-500 font-bold tracking-tight">&lt;security@shiv.ai&gt;</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">To: shivam@shiv.ai</p>
                     </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">10:45 AM (32 mins ago)</span>
               </div>
            </div>

            {/* Email Body */}
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-base space-y-6">
               <p>Hello Shivam,</p>
               <p>A new login was detected for your <strong>ShivAI Identity</strong>. If this was you, you can safely ignore this email.</p>
               
               <GlassCard className="p-6 bg-white/5 border-white/10" hover={false}>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <Smartphone className="text-blue-400" size={20} />
                        <div>
                           <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Device</p>
                           <p className="text-sm font-bold text-white">Chrome on Windows 11</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Globe className="text-blue-400" size={20} />
                        <div>
                           <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Location</p>
                           <p className="text-sm font-bold text-white">Mumbai, Maharashtra, IN</p>
                        </div>
                     </div>
                  </div>
               </GlassCard>

               <p>If you don't recognize this activity, please click the button below to secure your identity and log out of all active sessions.</p>
               
               <div className="py-8">
                  <NeonButton variant="red" className="px-12 py-4 h-auto text-lg">Secure My Account</NeonButton>
               </div>

               <p className="text-gray-500 text-sm italic">
                  This is an automated security event from the ShivAI Ecosystem. Do not share your login credentials with anyone.
               </p>
            </div>

            {/* Action Footer */}
            <div className="mt-12 pt-12 border-t border-white/5 flex gap-4">
               <button className="flex-1 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-bold transition-all group">
                  <Reply size={20} className="text-gray-500 group-hover:text-blue-400 transition-colors" /> Reply
               </button>
               <button className="flex-1 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-bold transition-all group">
                  <Forward size={20} className="text-gray-500 group-hover:text-blue-400 transition-colors" /> Forward
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode, label?: string }) {
  return (
    <button className="p-3 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all group flex items-center gap-2">
       {icon}
       {label && <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>}
    </button>
  );
}
