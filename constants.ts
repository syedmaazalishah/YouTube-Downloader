import type { Video, Playlist } from './types';

export const VIDEO_QUALITIES = ['1080p', '720p', '480p', '360p', '240p'];
export const AUDIO_QUALITIES = ['256k', '128k', '64k'];

export const MOCK_VIDEO: Video = {
  id: 'dQw4w9WgXcQ',
  title: 'Synthwave Dreams - A Retro Journey',
  thumbnailUrl: 'https://picsum.photos/seed/synthwave/480/270',
  duration: '3:32',
  author: 'Lofi Girl',
  views: '1.2B views',
  videoFormats: [
    { quality: '1080p', size: '95 MB' },
    { quality: '720p', size: '50 MB' },
    { quality: '480p', size: '25 MB' },
    { quality: '360p', size: '15 MB' },
  ],
  audioFormats: [
    { quality: '256k', size: '8 MB' },
    { quality: '128k', size: '4 MB' },
    { quality: '64k', size: '2 MB' },
  ],
};

export const MOCK_PLAYLIST: Playlist = {
  id: 'PL-playlist-id',
  title: 'Ultimate Gaming Music Mix',
  thumbnailUrl: 'https://picsum.photos/seed/gaming/480/270',
  videoCount: 25,
  author: 'Gaming Sound FX',
  videos: Array.from({ length: 25 }, (_, i) => ({
    id: `video_id_${i + 1}`,
    title: `Epic Track ${i + 1} - The Legend Continues`,
    thumbnailUrl: `https://picsum.photos/seed/track${i}/100/56`,
    duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    author: 'Gaming Sound FX',
    views: `${(Math.random() * 10).toFixed(1)}M views`,
    videoFormats: MOCK_VIDEO.videoFormats,
    audioFormats: MOCK_VIDEO.audioFormats,
  })),
};
