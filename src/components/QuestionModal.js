import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import '../styles/QuestionModal.css';

const QuestionModal = () => {
  const {
    isModalOpen,
    selectedCategory,
    selectedQuestion,
    timer,
    timerActive,
    answerQuestion,
    passTurn,
    setIsModalOpen,
  } = useGame();

  const [showAnswer, setShowAnswer] = useState(false);

  // Сброс showAnswer при открытии нового вопроса
  useEffect(() => {
    if (isModalOpen) {
      setShowAnswer(false);
    }
  }, [isModalOpen]);

  if (!isModalOpen || !selectedQuestion) return null;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const isTimeUp = timer === 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{selectedCategory?.title} — {selectedQuestion.points} очков</h3>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="modal-body">
          <p className="question-text">{selectedQuestion.text}</p>

          {showAnswer || isTimeUp ? (
            <div className="answer-section">
              <h4>Ответ:</h4>
              <p className="answer-text">{selectedQuestion.answer}</p>
            </div>
          ) : (
            <button className="show-answer-btn" onClick={handleShowAnswer}>
              Показать ответ
            </button>
          )}

          <div className="timer-section">
            <div className="timer">
              Осталось времени: <strong>{timer} секунд</strong>
              {isTimeUp && <span className="time-up-label"> (Время вышло!)</span>}
            </div>
            <div className="timer-bar">
              <div
                className="timer-fill"
                style={{ width: `${(timer / 20) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="modal-btn correct-btn"
            onClick={() => answerQuestion(true)}
          >
            Ответ верный
          </button>
          <button
            className="modal-btn wrong-btn"
            onClick={() => answerQuestion(false)}
          >
            Ответ неверный
          </button>
          <button
            className="modal-btn pass-btn"
            onClick={passTurn}
          >
            Переход хода
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;