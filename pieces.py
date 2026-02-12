"""
Chess Pieces - Movement and logic
"""

class Piece:
    """Base chess piece class"""
    
    def __init__(self, color, position):
        """
        Initialize a piece
        color: 'white' or 'black'
        position: (row, col) tuple
        """
        self.color = color
        self.position = position
        self.has_moved = False
        self.symbol = ''
    
    def get_valid_moves(self, board):
        """Get all valid moves for this piece (to be overridden)"""
        return []
    
    def is_valid_position(self, row, col):
        """Check if position is on the board"""
        return 0 <= row < 8 and 0 <= col < 8
    
    def __str__(self):
        return f"{self.color[0].upper()}{self.symbol}"


class Pawn(Piece):
    """Pawn piece"""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = 'P'
    
    def get_valid_moves(self, board):
        moves = []
        row, col = self.position
        direction = -1 if self.color == 'white' else 1
        
        # Move forward one square
        new_row = row + direction
        if self.is_valid_position(new_row, col) and board[new_row][col] is None:
            moves.append((new_row, col))
            
            # Move forward two squares from starting position
            if not self.has_moved:
                new_row2 = row + (2 * direction)
                if board[new_row2][col] is None:
                    moves.append((new_row2, col))
        
        # Capture diagonally
        for dc in [-1, 1]:
            new_row = row + direction
            new_col = col + dc
            if self.is_valid_position(new_row, new_col):
                target = board[new_row][new_col]
                if target is not None and target.color != self.color:
                    moves.append((new_row, new_col))
        
        return moves


class Knight(Piece):
    """Knight piece"""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = 'N'
    
    def get_valid_moves(self, board):
        moves = []
        row, col = self.position
        
        # All possible knight moves (L-shape)
        knight_moves = [
            (-2, -1), (-2, 1), (-1, -2), (-1, 2),
            (1, -2), (1, 2), (2, -1), (2, 1)
        ]
        
        for dr, dc in knight_moves:
            new_row, new_col = row + dr, col + dc
            if self.is_valid_position(new_row, new_col):
                target = board[new_row][new_col]
                if target is None or target.color != self.color:
                    moves.append((new_row, new_col))
        
        return moves


class Bishop(Piece):
    """Bishop piece"""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = 'B'
    
    def get_valid_moves(self, board):
        moves = []
        row, col = self.position
        
        # Diagonal directions
        directions = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
        
        for dr, dc in directions:
            for i in range(1, 8):
                new_row = row + (dr * i)
                new_col = col + (dc * i)
                
                if not self.is_valid_position(new_row, new_col):
                    break
                
                target = board[new_row][new_col]
                if target is None:
                    moves.append((new_row, new_col))
                else:
                    if target.color != self.color:
                        moves.append((new_row, new_col))
                    break
        
        return moves


class Rook(Piece):
    """Rook piece"""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = 'R'
    
    def get_valid_moves(self, board):
        moves = []
        row, col = self.position
        
        # Horizontal and vertical directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        for dr, dc in directions:
            for i in range(1, 8):
                new_row = row + (dr * i)
                new_col = col + (dc * i)
                
                if not self.is_valid_position(new_row, new_col):
                    break
                
                target = board[new_row][new_col]
                if target is None:
                    moves.append((new_row, new_col))
                else:
                    if target.color != self.color:
                        moves.append((new_row, new_col))
                    break
        
        return moves


class Queen(Piece):
    """Queen piece - combines Rook and Bishop movement"""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = 'Q'
    
    def get_valid_moves(self, board):
        moves = []
        row, col = self.position
        
        # All 8 directions
        directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        ]
        
        for dr, dc in directions:
            for i in range(1, 8):
                new_row = row + (dr * i)
                new_col = col + (dc * i)
                
                if not self.is_valid_position(new_row, new_col):
                    break
                
                target = board[new_row][new_col]
                if target is None:
                    moves.append((new_row, new_col))
                else:
                    if target.color != self.color:
                        moves.append((new_row, new_col))
                    break
        
        return moves


class King(Piece):
    """King piece"""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = 'K'
    
    def get_valid_moves(self, board):
        moves = []
        row, col = self.position
        
        # All adjacent squares
        directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        ]
        
        for dr, dc in directions:
            new_row = row + dr
            new_col = col + dc
            
            if self.is_valid_position(new_row, new_col):
                target = board[new_row][new_col]
                if target is None or target.color != self.color:
                    moves.append((new_row, new_col))
        
        # TODO: Add castling logic
        
        return moves


def create_piece(piece_type, color, position):
    """Factory function to create pieces"""
    pieces = {
        'P': Pawn,
        'N': Knight,
        'B': Bishop,
        'R': Rook,
        'Q': Queen,
        'K': King
    }
    
    if piece_type in pieces:
        return pieces[piece_type](color, position)
    return None