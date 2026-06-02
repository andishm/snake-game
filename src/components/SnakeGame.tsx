import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<number>();

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || 
            newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = window.setInterval(moveSnake, 100);
    return () => window.clearInterval(gameLoopRef.current);
  }, [direction, food, gameOver]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 border border-green-500/30 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)]">
      <div className="flex justify-between w-full mb-4 px-2">
        <h2 className="text-3xl font-mono font-bold text-green-400 [text-shadow:2px_0_0_#ff00ff,-2px_0_0_#00ffff]">Score: {score}</h2>
        {gameOver && <button onClick={resetGame} className="text-white bg-green-600 px-3 py-1 rounded">Restart</button>}
      </div>
      <div 
        className="grid border border-green-500/50 bg-gray-950" 
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const segmentIndex = snake.findIndex((s) => s.x === x && s.y === y);
          const isSnake = segmentIndex !== -1;
          const isFood = food.x === x && food.y === y;

          let snakeStyle = {};
          let snakeClasses = "";

          if (isSnake) {
            snakeClasses = "bg-green-500 shadow-[0_0_10px_#22c55e]";
            // Trail effect: decrease opacity the further back in the tail
            const opacity = Math.max(0.3, 1 - segmentIndex / snake.length);
            snakeStyle = { opacity: opacity };
          }

          return (
            <div
              key={i}
              className={`w-5 h-5 ${isSnake ? snakeClasses : isFood ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : ''}`}
              style={isSnake ? snakeStyle : {}}
            />
          );
        })}
      </div>
    </div>
  );
}
