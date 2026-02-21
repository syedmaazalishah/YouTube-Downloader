import React, { useState, useMemo } from 'react';
import type { DownloadItem } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XIcon } from './icons/XIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface DownloadItemProps {
  item: DownloadItem;
  onCancel: (id: number) => void;
}

const DownloadItemCard: React.FC<DownloadItemProps> = ({ item, onCancel }) => {
  const isCompleted = item.status === 'completed';
  const isCancelled = item.status === 'cancelled';
  const isDownloading = item.status === 'downloading';

  return (
    <div className={`bg-gray-700/50 p-4 rounded-lg border ${isCancelled ? 'border-red-900/30 opacity-60' : 'border-transparent'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-200 truncate pr-4">{item.title}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            {new Date(item.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold whitespace-nowrap ${
            isCompleted ? 'text-green-400' : 
            isCancelled ? 'text-red-400' : 
            'text-blue-400'
          }`}>
            {isCompleted ? 'Completed' : isCancelled ? 'Cancelled' : `${item.progress}%`}
          </span>
          {isDownloading && (
            <button 
              onClick={() => onCancel(item.id)}
              className="text-gray-400 hover:text-red-400 transition-colors p-1 hover:bg-red-400/10 rounded"
              title="Cancel Download"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ease-linear ${
            isCompleted ? 'bg-green-500' : 
            isCancelled ? 'bg-red-500' : 
            'bg-blue-500'
          }`}
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    </div>
  );
};

type SortOption = 'date' | 'name' | 'progress' | 'status';

export const DownloadManager: React.FC<{ 
  downloads: DownloadItem[];
  onCancel: (id: number) => void;
}> = ({ downloads, onCancel }) => {
  const [sortBy, setSortBy] = useState<SortOption>('date');

  const sortedDownloads = useMemo(() => {
    return [...downloads].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.progress - a.progress;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return b.timestamp - a.timestamp;
      }
    });
  }, [downloads, sortBy]);

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {downloads.some(d => d.status === 'downloading') ? (
            <DownloadIcon className="h-6 w-6 text-blue-400 animate-pulse" />
          ) : (
            <CheckCircleIcon className="h-6 w-6 text-green-400" />
          )}
          Downloads
        </h2>
        
        <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-1.5">
          <span className="text-xs text-gray-400 font-medium">Sort by:</span>
          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-transparent text-xs text-gray-200 pr-6 focus:outline-none cursor-pointer font-semibold"
            >
              <option value="date" className="bg-gray-800">Newest First</option>
              <option value="name" className="bg-gray-800">Name</option>
              <option value="progress" className="bg-gray-800">Progress</option>
              <option value="status" className="bg-gray-800">Status</option>
            </select>
            <ChevronDownIcon className="h-3 w-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-gray-700 max-h-[500px] overflow-y-auto custom-scrollbar">
        {sortedDownloads.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic">
            No downloads yet.
          </div>
        ) : (
          <div className="space-y-3">
            {sortedDownloads.map(item => (
              <DownloadItemCard key={item.id} item={item} onCancel={onCancel} />
            ))}
          </div>
        )}
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
    </div>
  );
};
