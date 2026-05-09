'use client';

import { motion } from 'framer-motion';
import { 
  Inbox, Zap, ShieldAlert, Star, Send, FileText, 
  Trash2, Settings, Brain, LayoutGrid, Globe, Shield
} from 'lucide-react';

interface MailSidebarProps {
  activeFolder: string;
  onFolderSelect: (folder: string) => void;
  isCollapsed?: boolean;
}

export default function MailSidebar({ activeFolder, onFolderSelect, isCollapsed = false }: MailSidebarProps) {
  const folders = [
    { id: 'inbox', label: 'Universal Inbox', icon: <Inbox size={20} />, count: 12 },
    { id: 'priority', label: 'AI Priority', icon: <Zap size={20} />, count: 3, color: 'text-blue-500' },
    { id: 'security', label: 'Security Alerts', icon: <Shield size={20} />, count: 1, color: 'text-red-500' },
    { id: 'starred', label: 'Flagged', icon: <Star size={20} /> },
    { id: 'sent', label: 'Dispatched', icon: <Send size={20} /> },
    { id: 'drafts', label: 'Drafts', icon: <FileText size={20} /> },
    { id: 'trash', label: 'Purged', icon: <Trash2 size={20} /> },
  ];

  return (
    <div className={`h-full bg-[#050505] border-r border-white/5 flex flex-col transition-all duration-500 ${isCollapsed ? 'w-24' : 'w-72'}`}>
       
       {/* Brand Logo */}
       <div className="p-10 mb-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <Brain className="text-white" size={24} />
             </div>
             {!isCollapsed && (
                <div className="animate-materialize">
                   <h1 className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">ShivAI <span className="text-blue-500">Mail</span></h1>
                   <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mt-1">Comm OS v2</p>
                </div>
             )}
          </div>
       </div>

       {/* Folder List */}
       <div className="flex-1 px-4 space-y-2">
          {folders.map((folder) => (
             <button
                key={folder.id}
                onClick={() => onFolderSelect(folder.id)}
                className={`
                   w-full group relative flex items-center gap-4 p-4 rounded-2xl transition-all
                   ${activeFolder === folder.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.03] border border-transparent'}
                `}
             >
                {activeFolder === folder.id && (
                   <motion.div 
                     layoutId="sidebar-active"
                     className="absolute inset-0 bg-blue-500/5 rounded-2xl" 
                   />
                )}
                
                <div className={`
                   ${activeFolder === folder.id ? (folder.color || 'text-blue-400') : 'text-gray-500'}
                   group-hover:scale-110 transition-transform
                `}>
                   {folder.icon}
                </div>

                {!isCollapsed && (
                   <div className="flex-1 flex justify-between items-center animate-materialize">
                      <span className={`text-xs font-bold ${activeFolder === folder.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`}>
                         {folder.label}
                      </span>
                      {folder.count && (
                         <span className={`text-[10px] font-black ${activeFolder === folder.id ? 'text-blue-500' : 'text-gray-700'}`}>
                            {folder.count}
                         </span>
                      )}
                   </div>
                )}
             </button>
          ))}
       </div>

       {/* Bottom Ecosystem Access */}
       <div className="p-8 space-y-4">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
             <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#0a0a0a] rounded-xl flex items-center justify-center border border-white/10 group-hover:text-blue-400 transition-colors">
                   <Globe size={18} />
                </div>
                {!isCollapsed && (
                   <div className="animate-materialize">
                      <p className="text-[10px] font-black uppercase text-gray-500">Identity</p>
                      <p className="text-[9px] text-gray-600 font-bold">@shivam.shiv.ai</p>
                   </div>
                )}
             </div>
          </div>
          
          <button className="w-full p-4 hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-4 text-gray-600 hover:text-white">
             <Settings size={20} />
             {!isCollapsed && <span className="text-xs font-bold">Core Settings</span>}
          </button>
       </div>
    </div>
  );
}
