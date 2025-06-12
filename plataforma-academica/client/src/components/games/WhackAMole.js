import React, { useState, useEffect, useCallback } from 'react';
import './WhackAMole.css';

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState('normal');

  const difficultySettings = {
    easy: { interval: 1200, duration: 1000 },
    normal: { interval: 1000, duration: 800 },
    hard: { interval: 800, duration: 600 }
  };

  const startGame = useCallback(() => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setMoles(Array(9).fill(false));
  }, []);

  useEffect(() => {
    let moleInterval;
    let timerInterval;

    if (gameActive && timeLeft > 0) {
      moleInterval = setInterval(() => {
        setMoles(currentMoles => {
          const newMoles = Array(9).fill(false);
          const randomIndex = Math.floor(Math.random() * 9);
          newMoles[randomIndex] = true;
          return newMoles;
        });
      }, difficultySettings[difficulty].interval);

      timerInterval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setGameActive(false);
            setHighScore(current => Math.max(current, score));
            clearInterval(moleInterval);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(moleInterval);
      clearInterval(timerInterval);
    };
  }, [gameActive, difficulty, score, timeLeft]);

  const whackMole = (index) => {
    if (moles[index] && gameActive) {
      setScore(current => current + 1);
      setMoles(current => {
        const newMoles = [...current];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg">
          Puntuación: {score}
          <br />
          Tiempo: {timeLeft}s
          <br />
          Récord: {highScore}
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mr-4 px-2 py-1 rounded border"
          disabled={gameActive}
        >
          <option value="easy">Fácil</option>
          <option value="normal">Normal</option>
          <option value="hard">Difícil</option>
        </select>

        <button
          onClick={startGame}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          {timeLeft === 30 ? 'Iniciar Juego' : 'Reiniciar'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {moles.map((isMoleVisible, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-green-100 rounded-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            onClick={() => whackMole(index)}
          >
            <div className="mole-hole">
              {isMoleVisible && (
                <div className="text-4xl transform translate-y-0">
                  🦔
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!gameActive && timeLeft === 0 && (
        <div className="mt-4 text-xl font-bold text-green-600">
          ¡Juego terminado! Puntuación final: {score}
          {score === highScore && score > 0 && ' - ¡Nuevo récord!'}
        </div>
      )}
    </div>
  );
};

export default WhackAMole;