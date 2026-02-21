import React, { useState, useCallback } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { VideoDetails } from './components/VideoDetails';
import { PlaylistDetails } from './components/PlaylistDetails';
import { DownloadManager } from './components/DownloadManager';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { MessageCard } from './components/MessageCard';
import type { Video, Playlist, DownloadItem, MediaInfo, Quality } from './types';
import { MOCK_VIDEO, MOCK_PLAYLIST } from './constants';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  const handleFetchInfo = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a valid YouTube URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setMediaInfo(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (url.includes('playlist')) {
      setMediaInfo({ type: 'playlist', data: MOCK_PLAYLIST });
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setMediaInfo({ type: 'video', data: MOCK_VIDEO });
    } else {
      setError('Invalid YouTube URL provided. Please check and try again.');
    }
    
    setIsLoading(false);
  }, [url]);
  
  const triggerBrowserDownload = (title: string, quality: Quality) => {
    // Sanitize filename to be safe for filesystems
    const sanitizedTitle = title.replace(/[^a-z0-9_\-]/gi, '_').replace(/_{2,}/g, '_');
    const filename = `${sanitizedTitle}_${quality}.mp4`; // Assume mp4 for simplicity

    const fileContent = `This is a simulated download of "${title}" in ${quality}.\nIn a real application, this file would contain the actual video data.`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const createDownload = (title: string, quality: Quality) => {
    const newDownload: DownloadItem = {
      id: Date.now() + Math.random(),
      title: `${title} - ${quality}`,
      progress: 0,
      status: 'downloading',
      timestamp: Date.now(),
    };
    
    setDownloads(prev => [newDownload, ...prev]);

    const interval = setInterval(() => {
      setDownloads(prev =>
        prev.map(d => {
          if (d.id === newDownload.id && d.status === 'downloading') {
            const newProgress = d.progress + Math.floor(Math.random() * 10) + 5;
            if (newProgress >= 100) {
              clearInterval(interval);
              triggerBrowserDownload(title, quality);
              return { ...d, progress: 100, status: 'completed' };
            }
            return { ...d, progress: newProgress };
          }
          return d;
        })
      );
    }, 300);
  };

  const handleCancelDownload = useCallback((id: number) => {
    setDownloads(prev =>
      prev.map(d => (d.id === id && d.status === 'downloading' ? { ...d, status: 'cancelled' } : d))
    );
  }, []);

  const handleDownloadVideo = useCallback((video: Video, videoQuality: Quality, audioQuality: Quality) => {
    createDownload(video.title, videoQuality);
  }, []);

  const handleDownloadPlaylist = useCallback((playlist: Playlist, videoQuality: Quality, audioQuality: Quality) => {
     playlist.videos.forEach((video, index) => {
        setTimeout(() => {
          createDownload(video.title, videoQuality);
        }, index * 500); // Stagger downloads
      });
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Download Videos & Playlists</h2>
            <p className="text-gray-400 text-center mb-6">Paste your link below to get started.</p>
            <UrlInputForm
              url={url}
              setUrl={setUrl}
              onSubmit={handleFetchInfo}
              isLoading={isLoading}
            />
          </div>

          <div className="mt-8">
            {isLoading && <Loader />}
            {error && <MessageCard type="error" message={error} />}
            {!isLoading && !error && !mediaInfo && (
               <MessageCard type="info" message="Enter a YouTube URL to fetch video or playlist details." />
            )}
            
            {mediaInfo?.type === 'video' && (
              <VideoDetails video={mediaInfo.data} onDownload={handleDownloadVideo} />
            )}
            {mediaInfo?.type === 'playlist' && (
              <PlaylistDetails playlist={mediaInfo.data} onDownload={handleDownloadPlaylist} />
            )}
          </div>
          
          {downloads.length > 0 && (
            <DownloadManager 
              downloads={downloads} 
              onCancel={handleCancelDownload} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;