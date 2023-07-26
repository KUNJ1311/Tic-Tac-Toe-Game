import { useState } from 'react';
import './App.scss';
import Board from './components/Board';
import { calculateWinner } from './winner';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(false);

  const nextPlayer = isNext ? 'X' : 'O';

  const winner = calculateWinner(squares);
  const statusMessage = winner.winner
    ? `Winner is ${winner.winner}`
    : `Next player is ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    if (squares[clickedPosition] || winner.winner) {
      return;
    }
    setSquares(currentSquares => {
      return currentSquares.map((squarevalue, position) => {
        if (clickedPosition === position) {
          return isNext ? 'X' : 'O';
        }
        return squarevalue;
      });
    });
    setIsNext(prev => !prev);
  };

  return (
    <div className="app">
      <p>{statusMessage}</p>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
