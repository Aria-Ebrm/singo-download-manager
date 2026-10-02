import { useState, useEffect } from 'react';
import type { DownloadTask } from './types/download';
import { Sidebar } from './components/Sidebar';
import { DownloadCard } from './components/DownloadCard';
import { AddModal } from './components/AddModal';
import { Icon } from './components/Icon';

export function App() {
  const [tasks, setTasks] = useState<DownloadTask[]>([
    {
      id: 'demo-1',
      url: 'https://releases.ubuntu.com/24.04/ubuntu-24.04-desktop-amd64.iso',
      fileName: 'ubuntu-24.04-desktop-amd64.iso',
      fileSize: 6140000000,
      downloadedBytes: 3840000000,
      speed: 18450000, // ~18 MB/s
      status: 'downloading',
      progressPercent: 62.5,
      destinationPath: 'C:\\Users\\Aria\\Downloads',
      createdAt: Date.now() - 360000,
      category: 'programs',
      parts: [
        { id: 1, from: 0, to: 1535000000, current: 1535000000 },
        { id: 2, from: 1535000001, to: 3070000000, current: 2305000000 },
        { id: 3, from: 3070000001, to: 4605000000, current: 3070000001 },
        { id: 4, from: 4605000001, to: 6140000000, current: 4605000001 }
      ]
    },
    {
      id: 'demo-2',
      url: 'https://speed.hetzner.de/1GB.bin',
      fileName: '1GB.bin',
      fileSize: 1048576000,
      downloadedBytes: 1048576000,
      speed: 0,
      status: 'completed',
      progressPercent: 100,
      destinationPath: 'C:\\Users\\Aria\\Downloads',
      createdAt: Date.now() - 1200000,
      category: 'compressed',
      parts: []
    }
  ]);

  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  // Dynamic simulation for active tasks when running in dev/preview
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.status === 'downloading') {
            const added = t.speed / 4;
            const nextBytes = Math.min(t.fileSize, t.downloadedBytes + added);
            const nextPercent = (nextBytes / t.fileSize) * 100;
            return {
              ...t,
              downloadedBytes: nextBytes,
              progressPercent: nextPercent,
              status: nextPercent >= 100 ? 'completed' : 'downloading',
              speed: nextPercent >= 100 ? 0 : t.speed,
            };
          }
          return t;
        })
      );
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const handleAddDownload = (url: string, customName?: string) => {
    let guessedName = customName || 'download.bin';
    if (!customName) {
      try {
        const path = new URL(url).pathname.split('/').pop();
        if (path) guessedName = decodeURIComponent(path);
      } catch {}
    }

    const newTask: DownloadTask = {
      id: Date.now().toString(),
      url,
      fileName: guessedName,
      fileSize: 150000000, // Initial estimate
      downloadedBytes: 0,
      speed: 12000000,
      status: 'downloading',
      progressPercent: 0,
      destinationPath: 'C:\\Users\\Aria\\Downloads',
      createdAt: Date.now(),
      category: guessedName.endsWith('.mp4') ? 'videos' : 'compressed',
      parts: [
        { id: 1, from: 0, to: 37500000, current: 0 },
        { id: 2, from: 37500001, to: 75000000, current: 37500001 },
        { id: 3, from: 75000001, to: 112500000, current: 75000001 },
        { id: 4, from: 112500001, to: 150000000, current: 112500001 }
      ]
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handlePause = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'paused', speed: 0 } : t))
    );
  };

  const handleResume = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'downloading', speed: 14000000 } : t
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const counts: Record<string, number> = {
    all: tasks.length,
    downloading: tasks.filter((t) => t.status === 'downloading').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    paused: tasks.filter((t) => t.status === 'paused').length,
    documents: tasks.filter((t) => t.category === 'documents').length,
    compressed: tasks.filter((t) => t.category === 'compressed').length,
    videos: tasks.filter((t) => t.category === 'videos').length,
    music: tasks.filter((t) => t.category === 'music').length,
    programs: tasks.filter((t) => t.category === 'programs').length,
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesCategory =
      category === 'all'
        ? true
        : category === 'downloading'
        ? t.status === 'downloading'
        : category === 'completed'
        ? t.status === 'completed'
        : category === 'paused'
        ? t.status === 'paused'
        : t.category === category;

    const matchesSearch = t.fileName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafafa]">
      {/* Sidebar */}
      <Sidebar
        currentCategory={category}
        onSelectCategory={setCategory}
        counts={counts}
      />

      {/* Main Content Surface */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fafafa] relative overflow-hidden">
        {/* Subtle Geist mesh decorative gradient bloom behind top header */}
        <div className="absolute top-0 right-0 w-96 h-48 geist-mesh-gradient pointer-events-none" />

        {/* Top Navbar */}
        <header className="h-14 border-b border-[#ebebeb] bg-white/70 backdrop-blur-md px-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3 w-80">
            <div className="relative w-full">
              <Icon
                name="search"
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8f8f]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search downloads..."
                className="w-full rounded-md border border-[#ebebeb] bg-[#fafafa] pl-8 pr-3 py-1.5 text-xs text-[#171717] placeholder-[#a1a1a1] focus:border-[#171717] focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddOpen(true)}
              className="rounded-full bg-[#171717] px-4 py-1.5 text-xs font-medium text-white hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Icon name="plus" size={14} className="brightness-200 invert" />
              <span>Add URL</span>
            </button>
          </div>
        </header>

        {/* Downloads Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 z-0">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 rounded-xl border border-dashed border-[#ebebeb] p-8 text-center bg-white/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fafafa] border border-[#ebebeb] mb-3">
                <Icon name="inbox" size={24} className="text-[#8f8f8f]" />
              </div>
              <h3 className="text-sm font-semibold text-[#171717]">No downloads here</h3>
              <p className="mt-1 text-xs text-[#8f8f8f] max-w-xs">
                Click the "Add URL" button above or drag links from your browser to begin downloading.
              </p>
              <button
                onClick={() => setIsAddOpen(true)}
                className="mt-4 rounded-full border border-[#ebebeb] bg-white px-4 py-1.5 text-xs font-medium text-[#171717] hover:bg-[#fafafa] transition-colors cursor-pointer"
              >
                Add first task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <DownloadCard
                key={task.id}
                task={task}
                onPause={handlePause}
                onResume={handleResume}
                onDelete={handleDelete}
                onOpenFolder={() => {}}
              />
            ))
          )}
        </div>
      </main>

      {/* Add Modal */}
      <AddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddDownload}
      />
    </div>
  );
}

export default App;
