import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const emojis = ['🎓', '📚', '✏️', '🎨', '🔬', '🎭', '🎪', '🎯'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (clickedIndex) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedIndex) ||
      matchedPairs.includes(cards[clickedIndex].emoji)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedCards;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].emoji]);
        setFlippedCards([]);
        
        if (matchedPairs.length + 1 === emojis.length) {
          setGameComplete(true);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg font-bold">Movimientos: {moves}</div>
        <button 
          onClick={initializeGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="w-24 h-24 bg-blue-100 rounded-lg cursor-pointer flex items-center justify-center text-4xl transition-transform hover:scale-105 active:scale-95"
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              {(flippedCards.includes(index) || matchedPairs.includes(card.emoji))
                ? card.emoji
                : '❔'}
            </div>
          </div>
        ))}
      </div>

      {gameComplete && (
        <div className="mt-4 text-xl font-bold text-green-600">
          ¡Felicitaciones! Completaste el juego en {moves} movimientos
        </div>
      )}
    </div>
  );
};

export default MemoryGame;