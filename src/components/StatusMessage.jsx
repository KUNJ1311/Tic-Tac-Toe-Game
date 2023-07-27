const StatusMessage = ({ isNext, winner, squares }) => {
  const noMovesLeft = squares.every(squareValue => squareValue !== null);

  const nextPlayer = isNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner.winner) {
      return (
        <>
          Winner is player{' '}
          <span
            className={winner.winner === 'X' ? 'text-green' : 'text-orange'}
          >
            {winner.winner}
          </span>
        </>
      );
    }

    if (!winner.winner && noMovesLeft) {
      return (
        <>
          <span className="text-orange">O</span> and{' '}
          <span className="text-green">X</span> tied
        </>
      );
    }

    if (!winner.winner && !noMovesLeft) {
      return (
        <>
          Next player is{' '}
          <span className={isNext ? 'text-green' : 'text-orange'}>
            {nextPlayer}
          </span>
        </>
      );
    }

    return null;
  };
  return <h2 className="status-message">{renderStatusMessage()}</h2>;
};

export default StatusMessage;
