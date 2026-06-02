import MusicPlayer from './components/MusicPlayer';
import SnakeGame from './components/SnakeGame';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-center p-6 gap-8 overflow-hidden">
      <h1 className="text-5xl font-bold tracking-tighter uppercase glitch-text text-cyan-400 drop-shadow-[2px_2px_0_#ff00ff]">
        Neon Snake & Sounds
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-start w-full max-w-4xl">
        <SnakeGame />
        <MusicPlayer />
      </div>
      
      <p className="text-magenta-500 font-mono text-xs uppercase animate-pulse">
        System_Ready_Input_Allowed
      </p>
    </div>
  );
}
