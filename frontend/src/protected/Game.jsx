import { useState, useEffect, useCallback } from 'react'
import { Chess } from 'chess.js'
import './Game.css'

const blackPieces = ['p', 'r', 'n', 'b', 'q', 'k']

const PIECE_SYMBOLS = {
  wk: '♔', wq: '♕', wr: '♖', wb: '♗', wn: '♘', wp: '♙',
  bk: '♚', bq: '♛', br: '♜', bb: '♝', bn: '♞', bp: '♟',
}

export default function Game({ mode, onBack }) {
  const [game, setGame]           = useState(new Chess())
  const [board, setBoard]         = useState([])
  const [selected, setSelected]   = useState(null)
  const [validMoves, setValidMoves] = useState([])
  const [status, setStatus]       = useState('')
  const [captured, setCaptured]   = useState({ w: [], b: [] })
  const [moveHistory, setMoveHistory] = useState([])

  // Update board from game state
  const updateBoard = useCallback((g) => {
    const b = []
    for (let r = 0; r < 8; r++) {
      const row = []
      for (let c = 0; c < 8; c++) {
        const sq = String.fromCharCode(97 + c) + (8 - r)
        row.push({ square: sq, piece: g.get(sq) })
      }
      b.push(row)
    }
    setBoard(b)
    updateStatus(g)
  }, [])

  const updateStatus = (g) => {
    if (g.isCheckmate())     setStatus(g.turn() === 'w' ? '🏆 Black Wins!' : '🏆 White Wins!')
    else if (g.isDraw())     setStatus('🤝 Draw!')
    else if (g.isCheck())    setStatus(g.turn() === 'w' ? '⚠️ White in Check!' : '⚠️ Black in Check!')
    else setStatus(g.turn() === 'w' ? "⚪ White's Turn" : "⚫ Black's Turn")
  }

  useEffect(() => {
    updateBoard(game)
  }, [])

  // Computer move (random)
  const computerMove = useCallback((g) => {
    const moves = g.moves()
    if (moves.length === 0) return
    const move = moves[Math.floor(Math.random() * moves.length)]
    const newGame = new Chess(g.fen())
    const result = newGame.move(move)
    if (result?.captured) {
      setCaptured(prev => ({
        ...prev,
        b: [...prev.b, result.captured]
      }))
    }
    setMoveHistory(prev => [...prev, result.san])
    setGame(newGame)
    updateBoard(newGame)
  }, [updateBoard])

  const handleSquareClick = (square, piece) => {
    const g = game

    // Agar game khatam ho gaya
    if (g.isGameOver()) return

    // Computer mode mein — sirf white ki baari
    if (mode === 'computer' && g.turn() === 'b') return

    if (selected) {
      // Move attempt
      if (validMoves.includes(square)) {
        const newGame = new Chess(g.fen())
        const result = newGame.move({
          from: selected,
          to: square,
          promotion: 'q'
        })

        if (result) {
          if (result.captured) {
            const capturer = result.color === 'w' ? 'w' : 'b'
            setCaptured(prev => ({
              ...prev,
              [capturer]: [...prev[capturer], result.captured]
            }))
          }
          setMoveHistory(prev => [...prev, result.san])
          setGame(newGame)
          updateBoard(newGame)
          setSelected(null)
          setValidMoves([])

          // Computer ki baari
          if (mode === 'computer' && !newGame.isGameOver()) {
            setTimeout(() => computerMove(newGame), 500)
          }
          return
        }
      }

      // Same square click — deselect
      if (selected === square) {
        setSelected(null)
        setValidMoves([])
        return
      }
    }

    // Select piece
    if (piece && piece.color === g.turn()) {
      const moves = g.moves({ square, verbose: true }).map(m => m.to)
      setSelected(square)
      setValidMoves(moves)
    } else {
      setSelected(null)
      setValidMoves([])
    }
  }

  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setSelected(null)
    setValidMoves([])
    setCaptured({ w: [], b: [] })
    setMoveHistory([])
    updateBoard(newGame)
  }

  return (
    <div className="game-page">
      <div className="game-container">

        {/* Header */}
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <h2 className="game-title">
            {mode === 'computer' ? '🤖 vs Computer' : '👥 vs Friend'}
          </h2>
          <button className="reset-btn" onClick={resetGame}>🔄 New Game</button>
        </div>

        <div className="game-layout">

          {/* Board */}
          <div className="board-section">
            {/* Black captured */}
            <div className="captured-bar">
              {captured.w.map((p, i) => (
                <span key={i} className="captured-piece">
                  {PIECE_SYMBOLS['b' + p]}
                </span>
              ))}
            </div>

            {/* Chess Board */}
            <div className="game-board">
              {board.map((row, r) =>
                row.map(({ square, piece }, c) => {
                  const isLight    = (r + c) % 2 === 0
                  const isSelected = selected === square
                  const isValid    = validMoves.includes(square)
                  const isCheck    = piece?.type === 'k' &&
                                     piece?.color === game.turn() &&
                                     game.isCheck()
                  return (
                    <div
                      key={square}
                      className={[
                        'game-square',
                        isLight    ? 'light' : 'dark',
                        isSelected ? 'selected' : '',
                        isValid    ? 'valid-move' : '',
                        isCheck    ? 'in-check' : '',
                      ].join(' ')}
                      onClick={() => handleSquareClick(square, piece)}
                    >
                      {/* Coordinate labels */}
                      {c === 0 && (
                        <span className="rank-label">{8 - r}</span>
                      )}
                      {r === 7 && (
                        <span className="file-label">
                          {String.fromCharCode(97 + c)}
                        </span>
                      )}

                      {/* Valid move dot */}
                      {isValid && !piece && (
                        <div className="move-dot" />
                      )}

                      {/* Piece */}
                      {piece && (
                        <span className={`game-piece ${piece.color === 'w' ? 'white' : 'black'}`}>
                          {PIECE_SYMBOLS[piece.color + piece.type]}
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* White captured */}
            <div className="captured-bar">
              {captured.b.map((p, i) => (
                <span key={i} className="captured-piece">
                  {PIECE_SYMBOLS['w' + p]}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="game-sidebar">
            {/* Status */}
            <div className="status-card">
              <div className="status-text">{status}</div>
              {game.isGameOver() && (
                <button className="btn btn-primary" onClick={resetGame}>
                  Play Again
                </button>
              )}
            </div>

            {/* Players */}
            <div className="players-card">
              <div className={`player ${game.turn() === 'b' ? 'active' : ''}`}>
                <span className="player-icon">⚫</span>
                <span>{mode === 'computer' ? 'Computer' : 'Player 2'}</span>
                {game.turn() === 'b' && !game.isGameOver() && (
                  <span className="thinking">thinking...</span>
                )}
              </div>
              <div className="vs-divider">VS</div>
              <div className={`player ${game.turn() === 'w' ? 'active' : ''}`}>
                <span className="player-icon">⚪</span>
                <span>Player 1</span>
              </div>
            </div>

            {/* Move History */}
            <div className="history-card">
              <h4>Move History</h4>
              <div className="moves-list">
                {moveHistory.length === 0 && (
                  <p className="no-moves">No moves yet</p>
                )}
                {Array.from({ length: Math.ceil(moveHistory.length / 2) }, (_, i) => (
                  <div key={i} className="move-row">
                    <span className="move-num">{i + 1}.</span>
                    <span className="move-white">{moveHistory[i * 2]}</span>
                    <span className="move-black">{moveHistory[i * 2 + 1] || ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}