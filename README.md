# Python Chess Game ♟

A fully-featured desktop chess game with AI opponent, local multiplayer, and planned online multiplayer.

## Features

### ✅ Completed (Phase 1 & 2)
- **Complete Chess Board**: Full 8x8 board with all pieces
- **Valid Move Detection**: Legal moves for all pieces (Pawn, Knight, Bishop, Rook, Queen, King)
- **Check & Checkmate**: Automatic detection and game end
- **Pawn Promotion**: Auto-promotes to Queen
- **Local Multiplayer**: Play with a friend on the same computer
- **Move History**: Track all moves in algebraic notation
- **Clean UI**: Dark theme with highlighted moves

### ✅ AI Opponent (Phase 3)
- **Three Difficulty Levels**:
  - Easy: Random move selection
  - Medium: Minimax depth 2
  - Hard: Minimax depth 3 with advanced evaluation
- **Choose Your Color**: Play as White or Black
- **Smart Evaluation**: Position-based scoring for better play

### 🚧 Coming Soon (Phase 4)
- **Online Multiplayer**: Play with friends over the internet
- **Room Codes**: Easy join system
- **Castling**: Special king-rook move
- **En Passant**: Special pawn capture
- **Piece Images**: Replace Unicode symbols with custom graphics
- **Sound Effects**: Move sounds and game notifications
- **Timer**: Optional time controls

## Installation

### Requirements
- Python 3.8 or higher
- Pygame library

### Setup

1. **Install Python** (if not already installed)
   - Download from [python.org](https://www.python.org/downloads/)
   - Make sure to check "Add Python to PATH" during installation

2. **Install Pygame**
   ```bash
   pip install pygame
   ```

3. **Run the Game**
   ```bash
   python main.py
   ```

## How to Play

### Controls
- **Mouse Click**: Select pieces and make moves
- **Valid Moves**: Highlighted with gray circles
- **Selected Piece**: Yellow highlighted square

### Game Modes

#### 1. Single Player (AI)
- Choose difficulty: Easy, Medium, or Hard
- Select your color: White or Black
- AI will automatically make moves for the opponent

#### 2. Local Multiplayer
- Two players on the same computer
- Players alternate turns
- Perfect for face-to-face games

#### 3. Online Multiplayer
- Coming in Phase 4!
- Create or join games with room codes

### Chess Rules
- Click a piece to select it
- Click a highlighted square to move
- Capture opponent pieces by moving to their square
- Protect your King from checkmate!

## Project Structure

```
chess_game/
├── main.py          # Entry point
├── menu.py          # All UI screens and navigation
├── board.py         # Chess board logic and rendering
├── pieces.py        # Chess piece classes and movement
├── ai.py            # AI opponent with minimax
├── online.py        # Online multiplayer (TODO)
├── utils.py         # Helper functions
├── constants.py     # Game constants and settings
├── assets/          # Images and sounds (future)
│   ├── pieces/
│   └── sounds/
└── README.md        # This file
```

## Development Phases

### ✅ Phase 1: Basic Foundation (COMPLETE)
- Chess board UI rendering
- Piece movement and selection
- Valid move highlighting
- Basic game rules (check, checkmate)

### ✅ Phase 2: Local Multiplayer (COMPLETE)
- Turn-based system
- Move history tracking
- Game over detection
- Restart functionality

### ✅ Phase 3: AI Opponent (COMPLETE)
- Random move AI (Easy)
- Minimax algorithm (Medium/Hard)
- Difficulty levels
- Position evaluation

### 🚧 Phase 4: Online Multiplayer (TODO)
- Socket programming
- Room code system
- Move synchronization
- Connection handling

## Technical Details

### AI Algorithm
The AI uses the **Minimax algorithm** with **alpha-beta pruning**:
- **Easy**: Depth 1 (random moves)
- **Medium**: Depth 2 (looks 2 moves ahead)
- **Hard**: Depth 3 (looks 3 moves ahead)

### Evaluation Function
The AI evaluates positions based on:
- Material count (piece values)
- Pawn advancement
- Center control
- Piece positioning

## Known Limitations
- Castling not yet implemented
- En passant not yet implemented
- No piece images (using Unicode symbols)
- No sound effects
- No timer/clock
- Online multiplayer not implemented

## Future Enhancements
1. Add piece images and animations
2. Sound effects for moves
3. Game timer with time controls
4. Save/load games
5. Move undo/redo
6. Opening book for AI
7. Endgame tablebase
8. Analysis mode
9. Multiple board themes
10. Tournament mode

## Credits
Created as a Python learning project demonstrating:
- Object-oriented programming
- Game development with Pygame
- AI algorithms (Minimax)
- UI/UX design
- Software architecture

## License
Open source - feel free to learn from and modify!

---

**Note**: This is a learning project. The AI is not chess-engine strength but plays a decent game at the Hard level. The focus is on clean code architecture and game development fundamentals.