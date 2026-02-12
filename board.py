"""
Chess Board - Game logic and state management
"""

import pygame
from pieces import *
from constants import *

class ChessBoard:
    """Manages the chess board and game state"""
    
    def __init__(self):
        """Initialize the chess board"""
        self.board = [[None for _ in range(8)] for _ in range(8)]
        self.selected_piece = None
        self.valid_moves = []
        self.current_turn = 'white'
        self.move_history = []
        self.game_over = False
        self.winner = None
        
        self.setup_board()
    
    def setup_board(self):
        """Set up initial chess position"""
        # Pawns
        for col in range(8):
            self.board[1][col] = Pawn('black', (1, col))
            self.board[6][col] = Pawn('white', (6, col))
        
        # Rooks
        self.board[0][0] = Rook('black', (0, 0))
        self.board[0][7] = Rook('black', (0, 7))
        self.board[7][0] = Rook('white', (7, 0))
        self.board[7][7] = Rook('white', (7, 7))
        
        # Knights
        self.board[0][1] = Knight('black', (0, 1))
        self.board[0][6] = Knight('black', (0, 6))
        self.board[7][1] = Knight('white', (7, 1))
        self.board[7][6] = Knight('white', (7, 6))
        
        # Bishops
        self.board[0][2] = Bishop('black', (0, 2))
        self.board[0][5] = Bishop('black', (0, 5))
        self.board[7][2] = Bishop('white', (7, 2))
        self.board[7][5] = Bishop('white', (7, 5))
        
        # Queens
        self.board[0][3] = Queen('black', (0, 3))
        self.board[7][3] = Queen('white', (7, 3))
        
        # Kings
        self.board[0][4] = King('black', (0, 4))
        self.board[7][4] = King('white', (7, 4))
    
    def get_piece_at(self, row, col):
        """Get piece at position"""
        if 0 <= row < 8 and 0 <= col < 8:
            return self.board[row][col]
        return None
    
    def select_piece(self, row, col):
        """Select a piece and show valid moves"""
        piece = self.get_piece_at(row, col)
        
        # If clicking same piece, deselect
        if self.selected_piece and self.selected_piece.position == (row, col):
            self.selected_piece = None
            self.valid_moves = []
            return False
        
        # If there's a piece and it's the current player's turn
        if piece and piece.color == self.current_turn:
            self.selected_piece = piece
            self.valid_moves = piece.get_valid_moves(self.board)
            # Filter moves that would leave king in check
            self.valid_moves = self.filter_legal_moves(piece, self.valid_moves)
            return True
        
        return False
    
    def move_piece(self, target_row, target_col):
        """Move selected piece to target position"""
        if not self.selected_piece:
            return False
        
        # Check if move is valid
        if (target_row, target_col) not in self.valid_moves:
            return False
        
        old_row, old_col = self.selected_piece.position
        
        # Record move
        move_notation = self.get_move_notation(
            self.selected_piece, 
            (old_row, old_col), 
            (target_row, target_col),
            self.board[target_row][target_col] is not None
        )
        
        # Execute move
        captured_piece = self.board[target_row][target_col]
        self.board[target_row][target_col] = self.selected_piece
        self.board[old_row][old_col] = None
        self.selected_piece.position = (target_row, target_col)
        self.selected_piece.has_moved = True
        
        # Pawn promotion
        if isinstance(self.selected_piece, Pawn):
            if (self.selected_piece.color == 'white' and target_row == 0) or \
               (self.selected_piece.color == 'black' and target_row == 7):
                # Auto-promote to Queen for now
                self.board[target_row][target_col] = Queen(
                    self.selected_piece.color, 
                    (target_row, target_col)
                )
                self.board[target_row][target_col].has_moved = True
        
        # Add to move history
        self.move_history.append(move_notation)
        
        # Clear selection
        self.selected_piece = None
        self.valid_moves = []
        
        # Switch turns
        self.current_turn = 'black' if self.current_turn == 'white' else 'white'
        
        # Check for checkmate
        if self.is_checkmate(self.current_turn):
            self.game_over = True
            self.winner = 'black' if self.current_turn == 'white' else 'white'
        
        return True
    
    def filter_legal_moves(self, piece, moves):
        """Filter out moves that would leave king in check"""
        legal_moves = []
        
        for move in moves:
            # Simulate move
            old_pos = piece.position
            old_row, old_col = old_pos
            new_row, new_col = move
            
            captured = self.board[new_row][new_col]
            self.board[new_row][new_col] = piece
            self.board[old_row][old_col] = None
            piece.position = move
            
            # Check if king is safe
            if not self.is_in_check(piece.color):
                legal_moves.append(move)
            
            # Undo move
            self.board[old_row][old_col] = piece
            self.board[new_row][new_col] = captured
            piece.position = old_pos
        
        return legal_moves
    
    def is_in_check(self, color):
        """Check if the king of given color is in check"""
        # Find king
        king_pos = None
        for row in range(8):
            for col in range(8):
                piece = self.board[row][col]
                if piece and isinstance(piece, King) and piece.color == color:
                    king_pos = (row, col)
                    break
            if king_pos:
                break
        
        if not king_pos:
            return False
        
        # Check if any opponent piece can attack king
        opponent_color = 'black' if color == 'white' else 'white'
        for row in range(8):
            for col in range(8):
                piece = self.board[row][col]
                if piece and piece.color == opponent_color:
                    moves = piece.get_valid_moves(self.board)
                    if king_pos in moves:
                        return True
        
        return False
    
    def is_checkmate(self, color):
        """Check if the given color is in checkmate"""
        if not self.is_in_check(color):
            return False
        
        # Try all possible moves for all pieces of this color
        for row in range(8):
            for col in range(8):
                piece = self.board[row][col]
                if piece and piece.color == color:
                    moves = piece.get_valid_moves(self.board)
                    legal_moves = self.filter_legal_moves(piece, moves)
                    if legal_moves:
                        return False
        
        return True
    
    def get_move_notation(self, piece, from_pos, to_pos, is_capture):
        """Get algebraic notation for move"""
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        col_names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        
        notation = piece.symbol
        if isinstance(piece, Pawn):
            notation = ''
            if is_capture:
                notation = col_names[from_col]
        
        if is_capture:
            notation += 'x'
        
        notation += col_names[to_col] + str(8 - to_row)
        
        return notation
    
    def draw(self, screen):
        """Draw the chess board and pieces"""
        # Draw squares
        for row in range(8):
            for col in range(8):
                color = LIGHT_SQUARE if (row + col) % 2 == 0 else DARK_SQUARE
                
                # Highlight selected square
                if self.selected_piece and self.selected_piece.position == (row, col):
                    color = SELECTED_COLOR
                
                x = BOARD_X + col * SQUARE_SIZE
                y = BOARD_Y + row * SQUARE_SIZE
                pygame.draw.rect(screen, color, (x, y, SQUARE_SIZE, SQUARE_SIZE))
        
        # Highlight valid moves
        for move in self.valid_moves:
            row, col = move
            x = BOARD_X + col * SQUARE_SIZE
            y = BOARD_Y + row * SQUARE_SIZE
            
            # Draw circle for valid move
            center = (x + SQUARE_SIZE // 2, y + SQUARE_SIZE // 2)
            radius = 12
            pygame.draw.circle(screen, VALID_MOVE_COLOR, center, radius)
        
        # Draw pieces as text for now (will add images later)
        font = pygame.font.Font(None, 60)
        
        piece_symbols = {
            'white': {'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙'},
            'black': {'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟'}
        }
        
        for row in range(8):
            for col in range(8):
                piece = self.board[row][col]
                if piece:
                    symbol = piece_symbols[piece.color][piece.symbol]
                    text = font.render(symbol, True, TEXT_COLOR if piece.color == 'white' else (0, 0, 0))
                    text_rect = text.get_rect()
                    text_rect.center = (
                        BOARD_X + col * SQUARE_SIZE + SQUARE_SIZE // 2,
                        BOARD_Y + row * SQUARE_SIZE + SQUARE_SIZE // 2
                    )
                    screen.blit(text, text_rect)
        
        # Draw board border
        pygame.draw.rect(screen, TEXT_COLOR, (BOARD_X, BOARD_Y, BOARD_SIZE, BOARD_SIZE), 3)
        
        # Draw coordinates
        small_font = pygame.font.Font(None, 24)
        col_names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        
        for i in range(8):
            # Column labels
            text = small_font.render(col_names[i], True, TEXT_COLOR)
            screen.blit(text, (BOARD_X + i * SQUARE_SIZE + SQUARE_SIZE // 2 - 5, BOARD_Y + BOARD_SIZE + 10))
            
            # Row labels
            text = small_font.render(str(8 - i), True, TEXT_COLOR)
            screen.blit(text, (BOARD_X - 25, BOARD_Y + i * SQUARE_SIZE + SQUARE_SIZE // 2 - 8))