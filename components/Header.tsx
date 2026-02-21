import React from 'react';
import { YoutubeIcon } from './icons/YoutubeIcon';

export const Header: React.FC = () => (
  <header className="text-center mb-8">
    <div className="flex items-center justify-center gap-3 mb-2">
       <YoutubeIcon className="h-10 w-10 text-red-500" />
       <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">YT Snap</h1>
    </div>
    <p className="text-gray-400">Your Fast & Friendly YouTube Downloader</p>
  </header>
);
