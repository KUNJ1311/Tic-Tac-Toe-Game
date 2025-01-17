import { useState } from 'react';
import './App.scss';
import StatusMessage from './components/StatusMessage';
import Board from './components/Board';
import { calculateWinner } from './winner';
import History from './components/History';

const NEW_GAME = [
  {
    squares: Array(9).fill(null),
    isNext: false,
  },
];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);
  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : history[history.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (squarevalue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isNext ? 'X' : 'O';
          }
          return squarevalue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquareState,
        isNext: !lastGamingState.isNext,
      });
    });
    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <h1>
        <span className="text-orange">TICK</span> TACK{' '}
        <span className="text-green">TOE</span>
      </h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        className={`btn-reset ${winner ? 'active' : ''}`}
        onClick={onNewGameStart}
      >
        Start new game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls">
        <span className="name">Kunj</span>
      </div>
    </div>
  );
}

export default App;
