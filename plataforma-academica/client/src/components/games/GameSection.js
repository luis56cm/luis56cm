import React, { useState } from 'react';
import TRexGame from './TRexGame';
import MemoryGame from './MemoryGame';
import WhackAMole from './WhackAMole';

const GameSection = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Zona de Descanso</h2>
      
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedGame('trex')}
          className="px-4 py-2 rounded transition-colors duration-200"
          style={{ 
            backgroundColor: selectedGame === 'trex' ? '#F09B93' : '#EBD6D7',
            color: selectedGame === 'trex' ? 'white' : '#439093'
          }}
        >
          T-Rex Runner
        </button>
        <button
          onClick={() => setSelectedGame('memory')}
          className="px-4 py-2 rounded transition-colors duration-200"
          style={{ 
            backgroundColor: selectedGame === 'memory' ? '#439093' : '#EBD6D7',
            color: selectedGame === 'memory' ? 'white' : '#439093'
          }}
        >
          Juego de Memoria
        </button>
        <button
          onClick={() => setSelectedGame('whackamole')}
          className="px-4 py-2 rounded transition-colors duration-200"
          style={{ 
            backgroundColor: selectedGame === 'whackamole' ? '#E9DD8A' : '#EBD6D7',
            color: selectedGame === 'whackamole' ? 'white' : '#439093'
          }}
        >
          Whack-a-Mole
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {selectedGame === 'trex' && <TRexGame />}
        {selectedGame === 'memory' && <MemoryGame />}
        {selectedGame === 'whackamole' && <WhackAMole />}
      </div>
    </div>
  );
};

export default GameSection;
