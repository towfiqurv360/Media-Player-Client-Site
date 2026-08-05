import React, { useState } from 'react';
import { Play, Link as LinkIcon, AlertCircle } from 'lucide-react';
import AnimePlayer from './components/AnimePlayer';

function App() {
  const [inputLink, setInputLink] = useState('');
  const [activeMagnet, setActiveMagnet] = useState('');
  const [error, setError] = useState('');

  const handlePlay = (e) => {
    e.preventDefault();
    setError('');

    const link = inputLink.trim();

    if (link === '') {
      setError('Please enter a valid magnet link.');
      return;
    }


    if (!link.startsWith('magnet:?')) {
      setError('Invalid format! The link must start with "magnet:?"');
      return;
    }

    setActiveMagnet(link);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-gray-200 font-sans selection:bg-red-500/30">
      { }
      <nav className="border-b border-gray-800 bg-[#141416]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <Play className="text-red-500 fill-red-500" size={24} />
            <h1 className="text-xl font-bold tracking-wider text-white">Stream<span className="text-red-500">X</span></h1>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        { }
        <div className="mb-10 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Stream Torrents instantly. <br className="hidden md:block" /> No downloads required.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Paste your magnet link below and start watching with dual-audio support, exactly like a professional streaming platform.
          </p>

          <form onSubmit={handlePlay} className="max-w-2xl mx-auto mt-8 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={inputLink}
                  onChange={(e) => {
                    setInputLink(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Paste magnet link here (starts with magnet:?)..."
                  className={`w-full pl-12 pr-4 py-4 bg-gray-900/50 border rounded-xl focus:outline-none focus:ring-1 transition-all text-white placeholder-gray-500
                    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-red-500 focus:ring-red-500'}`}
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Play size={20} />
                Watch Now
              </button>
            </div>

            { }
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-sm mt-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        { }
        {activeMagnet ? (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-medium text-gray-300">
                { }
                Now Playing: Custom Stream
              </h3>
            </div>
            <AnimePlayer magnetLink={activeMagnet} title="Custom Torrent Stream" />
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-900/30 rounded-xl border border-gray-800/50 flex flex-col items-center justify-center text-gray-600">
            <Play size={48} className="mb-4 opacity-20" />
            <p>Your video will appear here</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;