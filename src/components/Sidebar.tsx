import React from 'react';
import { Icon } from './Icon';

interface SidebarProps {
  currentCategory: string;
  onSelectCategory: (cat: any) => void;
  counts: Record<string, number>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  onSelectCategory,
  counts
}) => {
  const categories = [
    { id: 'all', label: 'All Downloads', icon: 'layers' },
    { id: 'downloading', label: 'Downloading', icon: 'circle-arrow-down' },
    { id: 'completed', label: 'Completed', icon: 'circle-check' },
    { id: 'paused', label: 'Paused', icon: 'circle-pause' },
  ];

  const types = [
    { id: 'documents', label: 'Documents', icon: 'file-text' },
    { id: 'compressed', label: 'Compressed', icon: 'archive' },
    { id: 'videos', label: 'Videos', icon: 'film' },
    { id: 'music', label: 'Music', icon: 'music' },
    { id: 'programs', label: 'Programs', icon: 'terminal' },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-[#ebebeb] bg-[#fafafa] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* App Title / Brand */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#171717] text-white">
            <Icon name="zap" size={16} className="invert brightness-200" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-[#171717]">Singo</h1>
            <p className="text-[10px] font-mono text-[#8f8f8f] uppercase">Download Manager</p>
          </div>
        </div>

        {/* Status filters */}
        <div>
          <span className="px-2 text-[11px] font-mono font-medium tracking-wider text-[#a1a1a1] uppercase">Status</span>
          <nav className="mt-2 space-y-1">
            {categories.map((c) => {
              const active = currentCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCategory(c.id)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    active 
                      ? 'bg-white text-[#171717] shadow-xs border border-[#ebebeb]' 
                      : 'text-[#4d4d4d] hover:bg-[#f2f2f2] hover:text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name={c.icon} size={15} className={active ? 'text-[#171717]' : 'text-[#8f8f8f]'} />
                    <span>{c.label}</span>
                  </div>
                  {counts[c.id] !== undefined && counts[c.id] > 0 && (
                    <span className="font-mono text-[10px] text-[#8f8f8f]">{counts[c.id]}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* File categories */}
        <div>
          <span className="px-2 text-[11px] font-mono font-medium tracking-wider text-[#a1a1a1] uppercase">Categories</span>
          <nav className="mt-2 space-y-1">
            {types.map((t) => {
              const active = currentCategory === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectCategory(t.id)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    active 
                      ? 'bg-white text-[#171717] shadow-xs border border-[#ebebeb]' 
                      : 'text-[#4d4d4d] hover:bg-[#f2f2f2] hover:text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name={t.icon} size={15} className={active ? 'text-[#171717]' : 'text-[#8f8f8f]'} />
                    <span>{t.label}</span>
                  </div>
                  {counts[t.id] !== undefined && counts[t.id] > 0 && (
                    <span className="font-mono text-[10px] text-[#8f8f8f]">{counts[t.id]}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#ebebeb] pt-3 text-[11px] text-[#8f8f8f] font-mono flex items-center justify-between px-2">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Core Ready
        </span>
        <span>v1.0.0</span>
      </div>
    </aside>
  );
};
