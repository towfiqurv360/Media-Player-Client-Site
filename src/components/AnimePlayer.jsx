import React, { useEffect, useRef, useState } from 'react';
import Artplayer from 'artplayer';

const AnimePlayer = ({ magnetLink, title }) => {
    const playerRef = useRef(null);
    const artRef = useRef(null);
    const [audioIndex, setAudioIndex] = useState(0); // 0 = Japanese, 1 = English

    useEffect(() => {
        if (!magnetLink) return;


        const streamUrl = `https://media-player-server-site.onrender.com/stream?magnet=${encodeURIComponent(magnetLink)}&audioIndex=${audioIndex}`;

        artRef.current = new Artplayer({
            container: playerRef.current,
            url: streamUrl,
            title: title || 'Now Playing',
            theme: '#ef4444',
            volume: 0.8,
            autoplay: true,
            pip: true,
            autoSize: true,
            setting: true,
            playbackRate: true,
            fullscreen: true,
            fullscreenWeb: true,
            miniProgressBar: true,


            controls: [
                {
                    position: 'right',
                    html: 'Audio: ' + (audioIndex === 0 ? 'JP' : 'EN'),
                    selector: [
                        { default: audioIndex === 0, html: 'Japanese (Original)', index: 0 },
                        { default: audioIndex === 1, html: 'English (Dub)', index: 1 },
                    ],
                    onSelect: function (item) {
                        setAudioIndex(item.index);

                        const newUrl = `https://media-player-server-site.onrender.com/stream?magnet=${encodeURIComponent(magnetLink)}&audioIndex=${item.index}`;
                        artRef.current.switchUrl(newUrl);
                        return 'Audio: ' + (item.index === 0 ? 'JP' : 'EN');
                    },
                },
            ],
        });

        return () => {
            if (artRef.current && artRef.current.destroy) {
                artRef.current.destroy(false);
            }
        };
    }, [magnetLink, audioIndex, title]);

    if (!magnetLink) return null;

    return (
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 ring-1 ring-white/10">
            <div ref={playerRef} className="w-full h-full"></div>
        </div>
    );
};

export default AnimePlayer;