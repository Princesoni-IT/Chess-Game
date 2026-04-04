import { useState } from 'react'
import './ChessBoard.css'

const initialPosition = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖'],
]

const blackPieces = ['♜','♞','♝','♛','♚','♟']

export default function ChessBoard() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="board-wrapper">
      <div className="board-glow" />
      <div className="board-container">
        <div className="chess-board">
          {initialPosition.map((row, r) =>
            row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0
              const isSelected = selected?.r === r && selected?.c === c
              return (
                <div
                  key={`${r}-${c}`}
                  className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelected(isSelected ? null : { r, c })}
                >
                  {piece && (
                    <span
                      className={`piece ${blackPieces.includes(piece) ? 'black' : 'white'} chess-move`}
                      style={{ animationDelay: `${(r + c) * 0.1}s` }}
                    >
                      {piece}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>
        <div className="floating-badge top-right">♟ Our Chess Board</div>
        <div className="floating-badge bottom-left">🏆 Play &amp; Win</div>
      </div>
    </div>
  )
}