'use client';

import { 
  Inbox, Star, Send, Trash, Archive, Shield, 
  Settings, Mail, Plus, Search, Brain, ChevronDown, 
  Clock, AlertCircle, LayoutDashboard, Menu
} from 'lucide-react';
import { cn } from '../ui/GlassUI';

interface SidebarProps {
  activeFolder: string;
  onFolderSelect: (folder: string) => void;
  isCollapsed?: boolean;
}

export default function MailSidebar({ activeFolder, onFolderSelect, isCollapsed = false }: SidebarProps) {
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={20} />, count: 12, color: 'text-blue-400' },
    { id: 'priority', label: 'Priority', icon: <Star size={20} />, count: 3, color: 'text-amber-400' },
    { id: 'sent', label: 'Sent', icon: <Send size={20} />, count: 0, color: 'text-emerald-400' },
    { id: 'archive', label: 'Archive', icon: <Archive size={20} />, count: 0, color: 'text-gray-400' },
    { id: 'trash', label: 'Trash', icon: <Trash size={20} />, count: 0, color: 'text-red-400' },
  ];

  return (
    <aside className={cn(
      "h-full bg-[#080808] border-r border-white/5 flex flex-col transition-all duration-300",
      isCollapsed ? "w-20" : "w-72"
    )}>
      {/* Brand */}
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Mail size={22} className="text-white" />
          </div>
          {!isCollapsed && <span className="text-lg font-black tracking-tighter text-white">SHIVAI <span className="text-blue-500">MAIL</span></span>}
        </div>
      </div>

      {/* Compose Button */}
      <div className="px-4 mb-8">
        <button className={cn(
          "w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-3 text-white transition-all group",
          !isCollapsed && "px-4 justify-start"
        )}>
          <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
             <Plus size={18} />
          </div>
          {!isCollapsed && <span className="font-bold text-sm">Compose</span>}
        </button>
      </div>

      {/* Folders */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => onFolderSelect(folder.id)}
            className={cn(
              "w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative",
              activeFolder === folder.id ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" : "text-gray-500 hover:bg-white/5 hover:text-gray-300 border border-transparent"
            )}
          >
             <div className={cn(
               "transition-transform group-active:scale-90",
               activeFolder === folder.id ? folder.color : "text-gray-500 group-hover:text-gray-300"
             )}>
                {folder.icon}
             </div>
             {!isCollapsed && (
               <>
                 <span className="text-sm font-bold flex-1 text-left">{folder.label}</span>
                 {folder.count > 0 && (
                   <span className={cn(
                     "px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight",
                     activeFolder === folder.id ? "bg-blue-500 text-white" : "bg-white/5 text-gray-500"
                   )}>
                      {folder.count}
                   </span>
                 )}
               </>
             )}
          </button>
        ))}

        <div className="pt-8 pb-4">
           {!isCollapsed && <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4">Ecosystem</p>}
           <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" isCollapsed={isCollapsed} color="text-indigo-400" />
           <SidebarItem icon={<Shield size={20} />} label="Security" isCollapsed={isCollapsed} color="text-emerald-400" />
           <SidebarItem icon={<Settings size={20} />} label="Settings" isCollapsed={isCollapsed} color="text-gray-400" />
        </div>
      </nav>

      {/* Intelligence Indicator */}
      {!isCollapsed && (
        <div className="p-4 mt-auto">
           <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                 <Brain className="text-blue-400" size={16} />
                 <span className="text-[10px] font-black uppercase text-blue-300 tracking-widest">Mail Intel</span>
              </div>
              <p className="text-[10px] text-blue-200/60 leading-relaxed font-medium">AI is prioritizing 4 important threads for you.</p>
           </div>
        </div>
      )}
    </aside>
  );
}

function SidebarItem({ icon, label, isCollapsed, color }: { icon: React.ReactNode, label: string, isCollapsed: boolean, color: string }) {
  return (
    <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all group">
       <div className={cn("group-hover:text-blue-400 transition-colors", color)}>{icon}</div>
       {!isCollapsed && <span className="text-sm font-bold">{label}</span>}
    </button>
  );
}
