'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, Zap, Clock, MessageSquare, AlertCircle, TrendingUp } from 'lucide-react';

interface IntelligencePanelProps {
  mailId: string | null;
}

export default function IntelligencePanel({ mailId }: IntelligencePanelProps) {
  if (!mailId) return (
    <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-6">
       <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
          <Brain className="text-blue-500/30" size={32} />
       </div>
       <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Select Intelligence</h3>
          <p className="text-[10px] text-gray-600 mt-2 max-w-[180px] mx-auto leading-relaxed">AI is standing by to process and analyze incoming communications.</p>
       </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden animate-materialize">
       <div className="p-8 space-y-8 overflow-y-auto scrollbar-hide flex-1">
          
          {/* AI Summary Section */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                   <Zap className="text-blue-400" size={16} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">AI Summary</h3>
             </div>
             <div className="p-5 bg-white/5 rounded-2xl border border-white/5 leading-relaxed text-xs text-gray-300 italic">
                "The sender is requesting a status update on the Project Alpha deployment. They've emphasized the deadline of Friday and suggested a follow-up call tomorrow at 10 AM."
             </div>
          </section>

          {/* Threat Intelligence */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                   <Shield className="text-emerald-400" size={16} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Security Check</h3>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-[#050505] border border-white/5 rounded-2xl">
                   <p className="text-[9px] font-black text-gray-600 uppercase mb-1">Sender Trust</p>
                   <p className="text-xs font-bold text-emerald-400">Verified</p>
                </div>
                <div className="p-4 bg-[#050505] border border-white/5 rounded-2xl">
                   <p className="text-[9px] font-black text-gray-600 uppercase mb-1">Risk Level</p>
                   <p className="text-xs font-bold text-gray-400">Minimal</p>
                </div>
             </div>
          </section>

          {/* Action Extraction */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                   <TrendingUp className="text-purple-400" size={16} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-400">Extracted Actions</h3>
             </div>
             <div className="space-y-2">
                <ActionItem text="Send Project Alpha status" done={false} />
                <ActionItem text="Schedule follow-up call" done={false} />
             </div>
          </section>

          {/* Communication Health */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20">
                   <MessageSquare className="text-pink-400" size={16} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-pink-400">Tone Analysis</h3>
             </div>
             <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">Professional</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">Urgent</span>
             </div>
          </section>

       </div>

       {/* Bottom AI Footer */}
       <div className="p-8 border-t border-white/5 bg-[#080808]">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest">AI Core Synced</span>
             </div>
          </div>
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-500/10">
             Generate Smart Reply
          </button>
       </div>
    </div>
  );
}

function ActionItem({ text, done }: { text: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
       <div className={`w-4 h-4 rounded-md border ${done ? 'bg-blue-500 border-blue-500' : 'border-white/20'} flex items-center justify-center`}>
          {done && <Zap size={10} className="text-white" />}
       </div>
       <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors font-medium">{text}</span>
    </div>
  );
}
