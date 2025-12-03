import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import '../styles/PlayerList.css';

const PlayerList = () => {
  const { players, currentPlayerIndex, addPlayer, removePlayer, selectPlayer } = useGame();
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = (e) => {
    e.preventDefault();
    addPlayer(newPlayerName);
    setNewPlayerName('');
  };

  const handlePlayerClick = (index) => {
    selectPlayer(index);
  };

  return (
    <div className="player-list">
      <h2>Игроки</h2>
      <form onSubmit={handleAddPlayer} className="add-player-form">
        <input
          type="text"
          placeholder="Введите имя игрока"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
      <ul className="players">
        {players.map((player, index) => (
          <li
            key={player.id}
            className={`player-item ${index === currentPlayerIndex ? 'current' : ''}`}
            onClick={() => handlePlayerClick(index)}
            title="Кликните, чтобы выбрать этого игрока"
          >
            <span className="player-name">{player.name}</span>
            <span className="player-score">{player.score} очков</span>
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                removePlayer(player.id);
              }}
              title="Удалить игрока"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {players.length === 0 && <p>Нет игроков. Добавьте первого!</p>}
      <p className="hint">Кликните на игрока, чтобы сделать его текущим.</p>
    </div>
  );
};

export default PlayerList;