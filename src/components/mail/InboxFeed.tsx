'use client';

import { motion } from 'framer-motion';
import { Mail, Zap, ShieldAlert, Star, Paperclip, Search, Filter } from 'lucide-react';
import { DateTime } from 'luxon';

interface InboxFeedProps {
  onMailSelect: (id: string) => void;
  selectedId?: string;
}

const MOCK_MAILS = [
  { id: '1', sender: 'Satoshi Nakamoto', subject: 'The future of decentralized identity', preview: 'I wanted to discuss how ShivAI can integrate with the next generation of...', time: '10:24 AM', priority: true, threat: false },
  { id: '2', sender: 'Security Core', subject: 'New Login Detected: Pixel 9 Pro', preview: 'A new login was authorized from London, UK. If this was not you...', time: '09:15 AM', priority: true, threat: true },
  { id: '3', sender: 'Vercel Ship', subject: 'Your deployment is live!', preview: 'Success! Your latest changes have been pushed to production. View the log...', time: 'Yesterday', priority: false, threat: false },
  { id: '4', sender: 'Elon Musk', subject: 'SpaceX Collab', preview: 'Let us talk about putting ShivAI on the first Mars mission. We need a...', time: 'Oct 24', priority: true, threat: false },
];

export default function InboxFeed({ onMailSelect, selectedId }: InboxFeedProps) {
  return (
    <div className="h-full flex flex-col bg-[#050505]">
       {/* Search & Filter Header */}
       <header className="p-8 border-b border-white/5 space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Intelligent Feed</h2>
             <div className="flex items-center gap-2">
                <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
                   <Filter size={18} />
                </button>
             </div>
          </div>
          <div className="relative">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
             <input 
               type="text" 
               placeholder="Search neural index..." 
               className="w-full bg-white/5 border border-white/5 p-4 pl-12 rounded-[1.5rem] outline-none focus:border-blue-500/30 text-sm transition-all"
             />
          </div>
       </header>

       {/* Mail List */}
       <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="divide-y divide-white/5">
             {MOCK_MAILS.map((mail, i) => (
                <motion.div
                  key={mail.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onMailSelect(mail.id)}
                  className={`
                    group p-8 cursor-pointer transition-all relative overflow-hidden
                    ${selectedId === mail.id ? 'bg-blue-600/5' : 'hover:bg-white/[0.02]'}
                  `}
                >
                   {/* Selection Indicator */}
                   {selectedId === mail.id && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]" 
                      />
                   )}

                   <div className="flex justify-between items-start mb-3 relative z-10">
                      <div className="flex items-center gap-3">
                         {mail.priority && <Zap size={14} className="text-blue-500 fill-blue-500 shadow-[0_0_8px_#3b82f6]" />}
                         <span className={`text-sm font-black tracking-tight ${selectedId === mail.id ? 'text-blue-400' : 'text-gray-200'}`}>
                            {mail.sender}
                         </span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">{mail.time}</span>
                   </div>

                   <div className="relative z-10">
                      <h4 className={`text-xs font-bold mb-1 truncate ${selectedId === mail.id ? 'text-white' : 'text-gray-400'}`}>
                         {mail.subject}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-1 font-medium leading-relaxed">
                         {mail.preview}
                      </p>
                   </div>

                   {/* Threat Indicator */}
                   {mail.threat && (
                      <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full w-fit">
                         <ShieldAlert size={10} className="text-red-500" />
                         <span className="text-[8px] font-black uppercase tracking-widest text-red-500">Security Warning</span>
                      </div>
                   )}

                   <div className="absolute right-8 bottom-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star size={14} className="text-gray-600 hover:text-amber-500 transition-colors" />
                      <Paperclip size={14} className="text-gray-600" />
                   </div>
                </motion.div>
             ))}
          </div>
       </div>

       {/* Inbox Stats Footer */}
       <div className="p-6 bg-[#030303] border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
             <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Inbox Synchronized</span>
          </div>
          <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">v2.0.4-NEURAL</span>
       </div>
    </div>
  );
}
