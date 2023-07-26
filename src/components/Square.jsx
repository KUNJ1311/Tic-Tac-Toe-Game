const Square = ({ value, onClick }) => {
  return (
    <button type="button" className="button square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
