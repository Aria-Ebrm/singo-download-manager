import React from 'react';
import type { DownloadTask } from '../types/download';
import { Icon } from './Icon';

interface DownloadCardProps {
  task: DownloadTask;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenFolder: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({
  task,
  onPause,
  onResume,
  onDelete,
  onOpenFolder
}) => {
  const isDownloading = task.status === 'downloading';
  const isCompleted = task.status === 'completed';
  const isPaused = task.status === 'paused';

  return (
    <div className="group relative rounded-xl border border-[#ebebeb] bg-white p-4 transition-all duration-200 hover:border-[#a1a1a1] hover:shadow-xs">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Icon & Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ebebeb] bg-[#fafafa]">
            <Icon 
              name={
                task.category === 'videos' ? 'video' :
                task.category === 'music' ? 'music' :
                task.category === 'documents' ? 'file-text' :
                task.category === 'programs' ? 'box' : 'file'
              } 
              size={20} 
              className="text-[#171717]" 
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-[#171717] tracking-tight">{task.fileName}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-[#8f8f8f] font-mono">
              <span>{formatBytes(task.downloadedBytes)} / {formatBytes(task.fileSize)}</span>
              <span>•</span>
              <span className="font-sans font-medium capitalize" style={{
                color: isDownloading ? '#0070f3' : isCompleted ? '#171717' : isPaused ? '#f5a623' : '#8f8f8f'
              }}>
                {task.status}
              </span>
              {isDownloading && (
                <>
                  <span>•</span>
                  <span className="text-[#0070f3] font-medium">{formatBytes(task.speed)}/s</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isDownloading ? (
            <button
              onClick={() => onPause(task.id)}
              title="Pause"
              className="rounded-md border border-[#ebebeb] bg-white p-2 text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717] transition-colors cursor-pointer"
            >
              <Icon name="pause" size={15} />
            </button>
          ) : isPaused ? (
            <button
              onClick={() => onResume(task.id)}
              title="Resume"
              className="rounded-md border border-[#ebebeb] bg-white p-2 text-[#0070f3] hover:bg-[#fafafa] transition-colors cursor-pointer"
            >
              <Icon name="play" size={15} />
            </button>
          ) : null}

          {isCompleted && (
            <button
              onClick={() => onOpenFolder(task.id)}
              title="Open Folder"
              className="rounded-md border border-[#ebebeb] bg-white p-2 text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717] transition-colors cursor-pointer"
            >
              <Icon name="folder" size={15} />
            </button>
          )}

          <button
            onClick={() => onDelete(task.id)}
            title="Delete"
            className="rounded-md border border-[#ebebeb] bg-white p-2 text-[#8f8f8f] hover:border-red-200 hover:bg-red-50 hover:text-[#ee0000] transition-colors cursor-pointer"
          >
            <Icon name="trash" size={15} />
          </button>
        </div>
      </div>

      {/* Progress & Dynamic Segment Visualization */}
      <div className="mt-3.5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8f8f8f]">
          <span>Progress</span>
          <span className="font-semibold text-[#171717]">{task.progressPercent.toFixed(1)}%</span>
        </div>
        
        {/* Main continuous progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f2f2f2]">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${task.progressPercent}%`,
              backgroundColor: isCompleted ? '#171717' : '#0070f3' 
            }}
          />
        </div>

        {/* Dynamic Part Visualizer (similar to IDM / AB download manager) */}
        {task.parts && task.parts.length > 0 && isDownloading && (
          <div className="flex h-1 w-full gap-0.5 overflow-hidden rounded-full bg-[#f2f2f2] opacity-75">
            {task.parts.map((p) => {
              const partTotal = p.to - p.from || 1;
              const partDone = p.current - p.from;
              const pct = Math.min(100, Math.max(0, (partDone / partTotal) * 100));
              return (
                <div key={p.id} className="relative flex-1 bg-neutral-200">
                  <div 
                    className="h-full bg-[#0070f3] transition-all duration-200"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
