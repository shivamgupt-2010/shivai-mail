'use client';

import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, CheckCircle, RefreshCw, Star, Paperclip, Clock } from 'lucide-react';
import { cn } from '../ui/GlassUI';
import { DateTime } from 'luxon';

interface Mail {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  isPriority?: boolean;
  hasAttachment?: boolean;
}

const MOCK_MAILS: Mail[] = [
  {
    id: '1',
    sender: 'ShivAI Security',
    subject: 'Action Required: New Identity Login detected',
    preview: 'A new login was detected for your account on Chrome Windows from Mumbai...',
    time: '10:45 AM',
    isRead: false,
    isStarred: true,
    isPriority: true,
  },
  {
    id: '2',
    sender: 'VibeConnect Team',
    subject: 'You have 4 new connection requests',
    preview: 'People from your industry are looking to connect with you. See their profiles...',
    time: 'Yesterday',
    isRead: false,
    isStarred: false,
    hasAttachment: true,
  },
  {
    id: '3',
    sender: 'Support @ ShivAI',
    subject: 'Welcome to the Ecosystem, Shivam!',
    preview: 'We are thrilled to have you here. Your identity is now fully verified across...',
    time: '2 days ago',
    isRead: true,
    isStarred: false,
    isPriority: true,
  },
  {
    id: '4',
    sender: 'Ecosystem Intel',
    subject: 'Weekly Behavioral Analysis Report',
    preview: 'Your activity score has increased by 12% this week. Security patterns are optimal.',
    time: 'May 01',
    isRead: true,
    isStarred: false,
  }
];

export default function InboxFeed({ onMailSelect, selectedId }: { onMailSelect: (id: string) => void, selectedId?: string }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#050505] overflow-hidden">
      {/* Feed Header */}
      <header className="p-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-gray-600 transition-all"
            />
          </div>
          <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all">
             <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 mt-6">
           <CategoryTab label="All Mail" active count={12} />
           <CategoryTab label="Priority" />
           <CategoryTab label="Updates" />
           <CategoryTab label="Social" />
        </div>
      </header>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
         <div className="space-y-1">
            {MOCK_MAILS.map((mail, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={mail.id}
                onClick={() => onMailSelect(mail.id)}
                className={cn(
                  "p-5 rounded-2xl cursor-pointer transition-all border border-transparent group",
                  selectedId === mail.id 
                    ? "bg-blue-600/10 border-blue-500/20 shadow-lg shadow-blue-500/5" 
                    : "hover:bg-white/5"
                )}
              >
                 <div className="flex gap-4 items-start">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-xs font-black",
                      mail.isRead ? "bg-white/5 text-gray-500" : "bg-blue-600/20 text-blue-400 border-blue-500/30"
                    )}>
                       {mail.sender[0]}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className={cn(
                            "text-sm font-bold truncate transition-colors",
                            mail.isRead ? "text-gray-400" : "text-white"
                          )}>
                             {mail.sender}
                             {mail.isPriority && <span className="ml-2 px-1.5 py-0.5 bg-amber-500/10 text-amber-500 text-[8px] uppercase tracking-tighter rounded border border-amber-500/20">AI Priority</span>}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-bold whitespace-nowrap">{mail.time}</span>
                       </div>
                       
                       <p className={cn(
                         "text-xs font-bold mb-1 truncate",
                         mail.isRead ? "text-gray-500" : "text-blue-200"
                       )}>
                          {mail.subject}
                       </p>
                       
                       <div className="flex justify-between items-center">
                          <p className="text-[11px] text-gray-600 truncate max-w-[80%]">{mail.preview}</p>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             {mail.hasAttachment && <Paperclip size={12} className="text-gray-600" />}
                             <Star size={14} className={cn(mail.isStarred ? "text-amber-400 fill-amber-400" : "text-gray-600 hover:text-amber-400")} />
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Load More */}
         <div className="py-8 flex justify-center">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-blue-400 transition-colors">
               <RefreshCw size={12} /> Syncing older threads...
            </button>
         </div>
      </div>
    </div>
  );
}

function CategoryTab({ label, active, count }: { label: string, active?: boolean, count?: number }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border",
      active 
        ? "bg-white/10 text-white border-white/20" 
        : "text-gray-500 hover:bg-white/5 border-transparent"
    )}>
       {label}
       {count && <span className="text-[9px] opacity-40">({count})</span>}
    </button>
  );
}
