export type Quality = string;

export interface VideoFormat {
  quality: Quality;
  size: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  author: string;
  views: string;
  videoFormats: VideoFormat[];
  audioFormats: VideoFormat[];
}

export interface Playlist {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoCount: number;
  author: string;
  videos: Video[];
}

export interface DownloadItem {
  id: number;
  title: string;
  progress: number;
  status: 'downloading' | 'completed' | 'failed' | 'cancelled';
  timestamp: number;
}

export type MediaInfo = { type: 'video', data: Video } | { type: 'playlist', data: Playlist };
