import React, { createContext, useState, useContext, useEffect } from 'react';
import { categories } from '../data/categories';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const STORAGE_KEY = 'jeopardy_game_state';

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return null;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
};

export const GameProvider = ({ children }) => {
  const loaded = loadState();
  const timerStartValue = 20;

  const [players, setPlayers] = useState(loaded?.players || []);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(loaded?.currentPlayerIndex || 0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(timerStartValue);
  const [timerActive, setTimerActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(loaded?.gameStarted || false);
  const [answeredQuestions, setAnsweredQuestions] = useState(loaded?.answeredQuestions || []);

  // Сохраняем состояние при изменении
  useEffect(() => {
    const state = {
      players,
      currentPlayerIndex,
      gameStarted,
      answeredQuestions,
    };
    saveState(state);
  }, [players, currentPlayerIndex, gameStarted, answeredQuestions]);

  // Инициализация игроков
  const addPlayer = (name) => {
    if (name.trim() === '') return;
    const newPlayer = { id: Date.now(), name, score: 0 };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
  };

  const removePlayer = (id) => {
    const updatedPlayers = players.filter(p => p.id !== id);
    setPlayers(updatedPlayers);
    // Если удаляем текущего игрока, сдвигаем индекс
    if (currentPlayerIndex >= updatedPlayers.length) {
      setCurrentPlayerIndex(Math.max(0, updatedPlayers.length - 1));
    }
  };

  const selectPlayer = (index) => {
    if (index >= 0 && index < players.length) {
      setCurrentPlayerIndex(index);
    }
  };

  const selectQuestion = (categoryId, questionId) => {
    const category = categories.find(c => c.id === categoryId);
    const question = category.questions.find(q => q.id === questionId);
    setSelectedCategory(category);
    setSelectedQuestion(question);
    setIsModalOpen(true);
    setTimer(timerStartValue);
    setTimerActive(true);
  };

  const answerQuestion = (isCorrect) => {
    if (isCorrect && selectedQuestion) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].score += selectedQuestion.points;
      setPlayers(updatedPlayers);
    }
    // Помечаем вопрос как отвеченный
    setAnsweredQuestions([...answeredQuestions, selectedQuestion.id]);
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setTimerActive(false);
    // Автоматический переход к следующему игроку
    if (players.length > 0) {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const passTurn = () => {
    // Переход хода без ответа
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setTimerActive(false);
    if (players.length > 0) {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const resetGame = () => {
    if (window.confirm('Вы уверены? Все данные игры будут удалены.')) {
      localStorage.removeItem(STORAGE_KEY);
      setPlayers([]);
      setCurrentPlayerIndex(0);
      setGameStarted(false);
      setAnsweredQuestions([]);
      setIsModalOpen(false);
      setSelectedQuestion(null);
      setTimerActive(false);
    }
  };

  // Таймер
  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      // Время вышло, останавливаем таймер
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const value = {
    players,
    currentPlayerIndex,
    selectedCategory,
    selectedQuestion,
    isModalOpen,
    timer,
    timerActive,
    gameStarted,
    answeredQuestions,
    categories,
    addPlayer,
    removePlayer,
    selectPlayer,
    selectQuestion,
    answerQuestion,
    passTurn,
    resetGame,
    setGameStarted,
    setCurrentPlayerIndex,
    setIsModalOpen,
      timerStartValue,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};