import React, { useState } from 'react';
import type { Video, Quality } from '../types';
import { QualitySelector } from './QualitySelector';
import { DownloadIcon } from './icons/DownloadIcon';

interface VideoDetailsProps {
  video: Video;
  onDownload: (video: Video, videoQuality: Quality, audioQuality: Quality) => void;
}

export const VideoDetails: React.FC<VideoDetailsProps> = ({ video, onDownload }) => {
  const [videoQuality, setVideoQuality] = useState<Quality>(video.videoFormats[0]?.quality || '720p');
  const [audioQuality, setAudioQuality] = useState<Quality>(video.audioFormats[0]?.quality || '128k');

  const handleDownload = () => {
    onDownload(video, videoQuality, audioQuality);
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700 animate-fade-in">
      <div className="flex flex-col md:flex-row">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full md:w-64 h-auto object-cover" />
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
          <p className="text-sm text-gray-400 mb-1">by {video.author}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span>{video.duration}</span>
            <span>•</span>
            <span>{video.views}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <QualitySelector
              label="Video Quality"
              formats={video.videoFormats}
              selectedValue={videoQuality}
              onValueChange={setVideoQuality}
            />
            <QualitySelector
              label="Audio Quality"
              formats={video.audioFormats}
              selectedValue={audioQuality}
              onValueChange={setAudioQuality}
            />
          </div>
          
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-red-500/50"
          >
            <DownloadIcon className="h-5 w-5" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
