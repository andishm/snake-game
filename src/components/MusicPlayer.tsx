import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { tracks } from '../data';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="bg-gray-900 border border-green-500/30 p-6 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)] w-full max-w-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-green-500/20 rounded-full text-green-400">
          <Music size={24} />
        </div>
        <div>
          <h2 className="text-white font-bold">{currentTrack.title}</h2>
          <p className="text-green-400 text-sm">{currentTrack.artist}</p>
        </div>
      </div>
      
      <audio ref={audioRef} src={currentTrack.url} />

      <div className="flex justify-center items-center gap-6">
        <button onClick={skipBack} className="text-gray-400 hover:text-green-400 transition-colors">
          <SkipBack size={24} />
        </button>
        <button onClick={togglePlay} className="p-4 bg-green-500 rounded-full text-gray-950 hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.7)]">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={skipForward} className="text-gray-400 hover:text-green-400 transition-colors">
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
}
