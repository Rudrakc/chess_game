import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const PIECES = {
  'wp': '♙', 'wr': '♖', 'wn': '♘', 'wb': '♗', 'wq': '♕', 'wk': '♔',
  'bp': '♟', 'br': '♜', 'bn': '♞', 'bb': '♝', 'bq': '♛', 'bk': '♚'
};

const initializeBoard = () => {
  const board = Array(8).fill().map(() => Array(8).fill(null));
  // Set up pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = 'wp';
    board[6][i] = 'bp';
  }
  // Set up other pieces
  const backRow = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  for (let i = 0; i < 8; i++) {
    board[0][i] = 'w' + backRow[i];
    board[7][i] = 'b' + backRow[i];
  }
  return board;
};

const ChessPiece = ({ piece, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { piece, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', fontSize: '2.5rem' }}
    >
      {PIECES[piece]}
    </div>
  );
};

const Square = ({ children, position, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item) => onDrop(item.position, position),
  }));

  return (
    <div ref={drop} className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export const ChessBoard = () => {
  const [board, setBoard] = useState(initializeBoard());
  const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const movePiece = (from, to) => {
    const newBoard = board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    setBoard(newBoard);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-9 grid-rows-9 gap-0 border-4 border-[#292929] shadow-2xl">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={row}>
            <div className="flex items-center justify-center bg-[#292929] text-white">
              {row}
            </div>
            {cols.map((col, colIndex) => (
              <div
                key={`${row}${col}`}
                className={`w-20 h-20 flex items-center justify-center
                  ${(rowIndex + colIndex) % 2 === 0 ? "bg-white" : "bg-[#292929]"}`}
              >
                <Square position={[7-rowIndex, colIndex]} onDrop={movePiece}>
                  {board[7-rowIndex][colIndex] && (
                    <ChessPiece
                      piece={board[7-rowIndex][colIndex]}
                      position={[7-rowIndex, colIndex]}
                    />
                  )}
                </Square>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div className="col-span-9 grid grid-cols-9">
          <div className="bg-[#292929]"></div>
          {cols.map((col) => (
            <div
              key={col}
              className="flex items-center justify-center bg-[#292929] text-white"
            >
              {col}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default ChessBoard;