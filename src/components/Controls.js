import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/Controls.css';

const Controls = () => {
  const {
    players,
    currentPlayerIndex,
    gameStarted,
    setGameStarted,
    isModalOpen,
    timer,
    timerActive,
    resetGame,
  } = useGame();

  const handleStartGame = () => {
    if (players.length < 2) {
      alert('Добавьте хотя бы двух игроков!');
      return;
    }
    setGameStarted(true);
  };

  return (
    <div className="controls">
      <h2>Управление</h2>
      <div className="control-buttons">
        {!gameStarted ? (
          <button className="btn start-btn" onClick={handleStartGame}>
            Начать игру
          </button>
        ) : (
          <div className="timer-display">
            Таймер: <span className="timer-value">{timer} сек</span>
            {timerActive && <div className="timer-progress" />}
          </div>
        )}
        <button className="btn reset-btn" onClick={resetGame}>
          Сбросить игру
        </button>
      </div>
      <div className="game-status">
        <p>
          Статус: <strong>{gameStarted ? 'Игра идет' : 'Ожидание'}</strong>
        </p>
        <p>
          Текущий игрок:{' '}
          <strong>
            {players[currentPlayerIndex]?.name || 'Нет игрока'}
          </strong>
        </p>
        {isModalOpen && <p className="modal-active">Вопрос открыт!</p>}
      </div>
    </div>
  );
};

export default Controls;