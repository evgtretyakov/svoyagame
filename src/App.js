import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import PlayerList from './components/PlayerList';
import Controls from './components/Controls';
import QuestionModal from './components/QuestionModal';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <header className="App-header">
          <h1>Своя Игра - Корпоратив</h1>
          <p>Упрощенная версия Jeopardy!</p>
        </header>
        <main className="App-main">
          <div className="game-container">
            <div className="left-panel">
              <PlayerList />
              <Controls />
            </div>
            <div className="right-panel">
              <GameBoard />
            </div>
          </div>
          <QuestionModal />
        </main>
        <footer className="App-footer">
          <p>Игра для корпоратива. Удачи!</p>
        </footer>
      </div>
    </GameProvider>
  );
}

export default App;