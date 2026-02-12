"""
Chess AI - Uses Minimax algorithm with alpha-beta pruning
"""

import random
from constants import PIECE_VALUES, DIFFICULTY_EASY, DIFFICULTY_MEDIUM, DIFFICULTY_HARD

class ChessAI:
    """Chess AI opponent"""
    
    def __init__(self, difficulty):
        """Initialize AI with difficulty level"""
        self.difficulty = difficulty
        
        # Set search depth based on difficulty
        if difficulty == DIFFICULTY_EASY:
            self.max_depth = 1
        elif difficulty == DIFFICULTY_MEDIUM:
            self.max_depth = 2
        else:  # HARD
            self.max_depth = 3
    
    def get_best_move(self, chess_board, color):
        """Get the best move for the AI"""
        if self.difficulty == DIFFICULTY_EASY:
            # Easy: Just pick a random valid move
            return self.get_random_move(chess_board, color)
        else:
            # Medium/Hard: Use minimax
            return self.get_minimax_move(chess_board, color)
    
    def get_random_move(self, chess_board, color):
        """Get a random valid move"""
        all_moves = []
        
        for row in range(8):
            for col in range(8):
                piece = chess_board.board[row][col]
                if piece and piece.color == color:
                    moves = piece.get_valid_moves(chess_board.board)
                    legal_moves = chess_board.filter_legal_moves(piece, moves)
                    for move in legal_moves:
                        all_moves.append(((row, col), move))
        
        if all_moves:
            return random.choice(all_moves)
        return None
    
    def get_minimax_move(self, chess_board, color):
        """Get best move using minimax algorithm"""
        best_move = None
        best_value = float('-inf')
        alpha = float('-inf')
        beta = float('inf')
        
        # Get all possible moves
        for row in range(8):
            for col in range(8):
                piece = chess_board.board[row][col]
                if piece and piece.color == color:
                    moves = piece.get_valid_moves(chess_board.board)
                    legal_moves = chess_board.filter_legal_moves(piece, moves)
                    
                    for move in legal_moves:
                        # Simulate move
                        from_pos = (row, col)
                        to_pos = move
                        captured = self.simulate_move(chess_board, from_pos, to_pos)
                        
                        # Evaluate position
                        value = self.minimax(
                            chess_board, 
                            self.max_depth - 1, 
                            False, 
                            alpha, 
                            beta, 
                            color
                        )
                        
                        # Undo move
                        self.undo_move(chess_board, from_pos, to_pos, captured)
                        
                        # Update best move
                        if value > best_value:
                            best_value = value
                            best_move = (from_pos, to_pos)
                        
                        alpha = max(alpha, best_value)
        
        return best_move
    
    def minimax(self, chess_board, depth, is_maximizing, alpha, beta, ai_color):
        """Minimax algorithm with alpha-beta pruning"""
        if depth == 0:
            return self.evaluate_board(chess_board, ai_color)
        
        if is_maximizing:
            max_eval = float('-inf')
            
            for row in range(8):
                for col in range(8):
                    piece = chess_board.board[row][col]
                    if piece and piece.color == ai_color:
                        moves = piece.get_valid_moves(chess_board.board)
                        legal_moves = chess_board.filter_legal_moves(piece, moves)
                        
                        for move in legal_moves:
                            from_pos = (row, col)
                            to_pos = move
                            captured = self.simulate_move(chess_board, from_pos, to_pos)
                            
                            eval_score = self.minimax(chess_board, depth - 1, False, alpha, beta, ai_color)
                            
                            self.undo_move(chess_board, from_pos, to_pos, captured)
                            
                            max_eval = max(max_eval, eval_score)
                            alpha = max(alpha, eval_score)
                            
                            if beta <= alpha:
                                break
            
            return max_eval
        else:
            min_eval = float('inf')
            opponent_color = 'black' if ai_color == 'white' else 'white'
            
            for row in range(8):
                for col in range(8):
                    piece = chess_board.board[row][col]
                    if piece and piece.color == opponent_color:
                        moves = piece.get_valid_moves(chess_board.board)
                        legal_moves = chess_board.filter_legal_moves(piece, moves)
                        
                        for move in legal_moves:
                            from_pos = (row, col)
                            to_pos = move
                            captured = self.simulate_move(chess_board, from_pos, to_pos)
                            
                            eval_score = self.minimax(chess_board, depth - 1, True, alpha, beta, ai_color)
                            
                            self.undo_move(chess_board, from_pos, to_pos, captured)
                            
                            min_eval = min(min_eval, eval_score)
                            beta = min(beta, eval_score)
                            
                            if beta <= alpha:
                                break
            
            return min_eval
    
    def simulate_move(self, chess_board, from_pos, to_pos):
        """Simulate a move and return captured piece"""
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        piece = chess_board.board[from_row][from_col]
        captured = chess_board.board[to_row][to_col]
        
        chess_board.board[to_row][to_col] = piece
        chess_board.board[from_row][from_col] = None
        
        old_pos = piece.position
        piece.position = to_pos
        
        return (captured, old_pos)
    
    def undo_move(self, chess_board, from_pos, to_pos, captured_data):
        """Undo a simulated move"""
        captured, old_pos = captured_data
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        piece = chess_board.board[to_row][to_col]
        chess_board.board[from_row][from_col] = piece
        chess_board.board[to_row][to_col] = captured
        piece.position = old_pos
    
    def evaluate_board(self, chess_board, ai_color):
        """Evaluate the board position"""
        score = 0
        
        for row in range(8):
            for col in range(8):
                piece = chess_board.board[row][col]
                if piece:
                    value = PIECE_VALUES.get(piece.symbol, 0)
                    
                    # Add positional bonuses
                    if piece.symbol == 'P':
                        # Pawns more valuable when advanced
                        if piece.color == 'white':
                            value += (7 - row) * 10
                        else:
                            value += row * 10
                    
                    # Center control bonus
                    if 2 <= row <= 5 and 2 <= col <= 5:
                        value += 30
                    
                    # Apply score based on color
                    if piece.color == ai_color:
                        score += value
                    else:
                        score -= value
        
        return score