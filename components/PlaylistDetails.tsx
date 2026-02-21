import React, { useState } from 'react';
import type { Playlist, Quality, Video } from '../types';
import { QualitySelector } from './QualitySelector';
import { DownloadIcon } from './icons/DownloadIcon';
import { ListIcon } from './icons/ListIcon';

interface PlaylistDetailsProps {
  playlist: Playlist;
  onDownload: (playlist: Playlist, videoQuality: Quality, audioQuality: Quality) => void;
}

const PlaylistItem: React.FC<{video: Video, index: number}> = ({ video, index }) => (
  <li className="flex items-center gap-4 p-3 hover:bg-gray-700/50 rounded-lg transition-colors duration-150">
    <span className="text-sm text-gray-500 font-mono w-6 text-right">{index + 1}</span>
    <img src={video.thumbnailUrl} alt={video.title} className="w-16 h-9 rounded object-cover" />
    <div className="flex-grow">
      <p className="text-sm font-semibold text-white truncate">{video.title}</p>
      <p className="text-xs text-gray-400">{video.duration}</p>
    </div>
  </li>
);

export const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({ playlist, onDownload }) => {
  const [videoQuality, setVideoQuality] = useState<Quality>(playlist.videos[0]?.videoFormats[0]?.quality || '720p');
  const [audioQuality, setAudioQuality] = useState<Quality>(playlist.videos[0]?.audioFormats[0]?.quality || '128k');

  const handleDownloadAll = () => {
    onDownload(playlist, videoQuality, audioQuality);
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700 animate-fade-in">
      <div className="p-6 bg-gray-800">
        <div className="flex flex-col sm:flex-row gap-6">
          <img src={playlist.thumbnailUrl} alt={playlist.title} className="w-full sm:w-48 h-auto rounded-lg shadow-lg" />
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-white mb-2">{playlist.title}</h3>
            <p className="text-sm text-gray-400 mb-1">by {playlist.author}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <ListIcon className="h-4 w-4" />
              <span>{playlist.videoCount} videos</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <QualitySelector
                label="Video Quality (for all)"
                formats={playlist.videos[0]?.videoFormats}
                selectedValue={videoQuality}
                onValueChange={setVideoQuality}
              />
              <QualitySelector
                label="Audio Quality (for all)"
                formats={playlist.videos[0]?.audioFormats}
                selectedValue={audioQuality}
                onValueChange={setAudioQuality}
              />
            </div>
            <button
              onClick={handleDownloadAll}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-red-500/50"
            >
              <DownloadIcon className="h-5 w-5" />
              Download All ({playlist.videoCount})
            </button>
          </div>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto p-4 custom-scrollbar">
        <ul className="space-y-1">
          {playlist.videos.map((video, index) => (
            <PlaylistItem key={video.id} video={video} index={index} />
          ))}
        </ul>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
};
