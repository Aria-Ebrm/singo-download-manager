import React, { useState } from 'react';
import { Icon } from './Icon';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (url: string, fileName?: string) => void;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [url, setUrl] = useState('');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAdd(url.trim(), fileName.trim() || undefined);
    setUrl('');
    setFileName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-xl border border-[#ebebeb] bg-white p-6 shadow-2xl transition-all"
        style={{ animation: 'scaleIn 0.15s ease-out' }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb]">
          <div className="flex items-center gap-2">
            <Icon name="download" size={20} className="text-[#171717]" />
            <h2 className="text-base font-semibold text-[#171717] tracking-tight">Add New Download</h2>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-md p-1.5 text-[#8f8f8f] hover:bg-[#fafafa] hover:text-[#171717] transition-colors cursor-pointer"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-[#4d4d4d] uppercase mb-1.5">Download URL</label>
            <div className="relative">
              <input
                type="url"
                required
                autoFocus
                placeholder="https://example.com/file.zip"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (!fileName) {
                    try {
                      const parsed = new URL(e.target.value).pathname.split('/').pop();
                      if (parsed) setFileName(decodeURIComponent(parsed));
                    } catch {}
                  }
                }}
                className="w-full rounded-md border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm text-[#171717] placeholder-[#a1a1a1] focus:border-[#171717] focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-[#4d4d4d] uppercase mb-1.5">Save As (Optional)</label>
            <input
              type="text"
              placeholder="filename.zip"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full rounded-md border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm text-[#171717] placeholder-[#a1a1a1] focus:border-[#171717] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#ebebeb] bg-white px-3.5 py-1.5 text-xs font-medium text-[#171717] hover:bg-[#fafafa] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#171717] px-5 py-1.5 text-xs font-medium text-white hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Icon name="arrow-down" size={14} className="brightness-200 invert" />
              Start Download
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
