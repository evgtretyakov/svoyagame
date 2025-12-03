import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/GameBoard.css';

const GameBoard = () => {
  const { categories, selectQuestion, answeredQuestions } = useGame();

  const handleQuestionClick = (categoryId, question) => {
    if (answeredQuestions.includes(question.id)) {
      alert('Этот вопрос уже отвечен!');
      return;
    }
    selectQuestion(categoryId, question.id);
  };

  return (
    <div className="game-board">
      <h2>Категории вопросов</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-column">
            <h3 className="category-title">{category.title}</h3>
            <div className="questions-list">
              {category.questions.map(question => (
                <button
                  key={question.id}
                  className={`question-card ${answeredQuestions.includes(question.id) ? 'answered' : ''}`}
                  onClick={() => handleQuestionClick(category.id, question)}
                  disabled={answeredQuestions.includes(question.id)}
                >
                  <span className="points">{question.points}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;