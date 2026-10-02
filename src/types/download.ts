export interface DownloadPart {
  id: number;
  from: number;
  to: number;
  current: number;
}

export type DownloadStatus = 
  | 'idle'
  | 'connecting'
  | 'downloading'
  | 'paused'
  | 'completed'
  | 'error';

export interface DownloadTask {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
  downloadedBytes: number;
  speed: number; // bytes/sec
  status: DownloadStatus;
  progressPercent: number;
  parts: DownloadPart[];
  destinationPath: string;
  createdAt: number;
  category: 'all' | 'documents' | 'compressed' | 'videos' | 'music' | 'programs';
}
