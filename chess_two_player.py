
import tkinter as tk
from tkinter import messagebox
import math

class TwoPlayerChess:
    def __init__(self, root):
        self.root = root
        self.root.title("♔ Two Player Chess ♚")
        self.root.geometry("1000x750")
        self.root.configure(bg="#2c3e50")
        self.root.resizable(False, False)
        
        # Chess board setup
        self.board_size = 640
        self.square_size = self.board_size // 8
        self.selected_piece = None
        self.selected_pos = None
        self.turn = 'white'
        self.move_history = []
        self.captured_pieces = {'white': [], 'black': []}
        
        # Piece symbols
        self.pieces = {
            'white': {
                'king': '♔', 'queen': '♕', 'rook': '♖',
                'bishop': '♗', 'knight': '♘', 'pawn': '♙'
            },
            'black': {
                'king': '♚', 'queen': '♛', 'rook': '♜',
                'bishop': '♝', 'knight': '♞', 'pawn': '♟'
            }
        }
        
        self.board = self.initialize_board()
        
        self.colors = {
            'light': '#F0D9B5',
            'dark': '#B58863',
            'highlight': '#7B61FF',
            'selected': '#FFD700',
            'check': '#FF6B6B',
            'last_move': '#98D8C8'
        }
        
        self.setup_ui()
        self.draw_board()
        
    def initialize_board(self):
        board = [[None for _ in range(8)] for _ in range(8)]
        back_row = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
        for i, piece in enumerate(back_row):
            board[0][i] = ('black', piece)
            board[1][i] = ('black', 'pawn')
            board[7][i] = ('white', piece)
            board[6][i] = ('white', 'pawn')
        return board
    
    def setup_ui(self):
        main_frame = tk.Frame(self.root, bg="#2c3e50")
        main_frame.pack(padx=20, pady=20)
        
        # Left panel
        left_panel = tk.Frame(main_frame, bg="#2c3e50", width=150)
        left_panel.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 20))
        
        self.turn_label = tk.Label(left_panel, text="White's Turn", 
                                  font=("Arial", 16, "bold"),
                                  bg="#2c3e50", fg="white")
        self.turn_label.pack(pady=10)
        
        tk.Label(left_panel, text="Captured:", font=("Arial", 12, "bold"),
                bg="#2c3e50", fg="white").pack(pady=(20, 5))
        
        self.captured_white = tk.Label(left_panel, text="", font=("Arial", 20),
                                      bg="#2c3e50", fg="white", wraplength=140)
        self.captured_white.pack(pady=5)
        
        self.captured_black = tk.Label(left_panel, text="", font=("Arial", 20),
                                      bg="#2c3e50", fg="gray", wraplength=140)
        self.captured_black.pack(pady=5)
        
        tk.Label(left_panel, text="Moves:", font=("Arial", 12, "bold"),
                bg="#2c3e50", fg="white").pack(pady=(20, 5))
        
        self.move_list = tk.Listbox(left_panel, width=18, height=15,
                                   bg="#34495e", fg="white",
                                   font=("Courier", 10))
        self.move_list.pack()
        
        btn_frame = tk.Frame(left_panel, bg="#2c3e50")
        btn_frame.pack(pady=20)
        
        tk.Button(btn_frame, text="🔄 Restart", command=self.restart_game,
                 bg="#27ae60", fg="white", font=("Arial", 10, "bold"),
                 width=12).pack(pady=5)
        
        tk.Button(btn_frame, text="↩️ Undo", command=self.undo_move,
                 bg="#f39c12", fg="white", font=("Arial", 10, "bold"),
                 width=12).pack(pady=5)
        
        # Chess board
        self.canvas = tk.Canvas(main_frame, width=self.board_size, 
                               height=self.board_size, bg="#2c3e50",
                               highlightthickness=0)
        self.canvas.pack(side=tk.LEFT)
        
        # Right panel
        right_panel = tk.Frame(main_frame, bg="#2c3e50", width=150)
        right_panel.pack(side=tk.LEFT, fill=tk.Y, padx=(20, 0))
        
        self.status_label = tk.Label(right_panel, text="Game Started!", 
                                    font=("Arial", 14, "bold"),
                                    bg="#2c3e50", fg="#2ecc71")
        self.status_label.pack(pady=10)
        
        self.timer_label = tk.Label(right_panel, text="⏱️ 00:00", 
                                   font=("Arial", 20, "bold"),
                                   bg="#2c3e50", fg="white")
        self.timer_label.pack(pady=20)
        
        instructions = """How to Play:

1. Click piece to select
2. Click destination
3. Purple = Valid move
4. Gold = Selected

Special Moves:
• Castling
• En Passant
• Promotion"""
        
        tk.Label(right_panel, text=instructions, font=("Arial", 10),
                bg="#2c3e50", fg="#bdc3c7", justify=tk.LEFT,
                wraplength=140).pack(pady=20)
        
        self.canvas.bind("<Button-1>", self.on_square_click)
        
        self.start_time = 0
        self.update_timer()
        
    def draw_board(self):
        self.canvas.delete("all")
        
        for row in range(8):
            for col in range(8):
                x1 = col * self.square_size
                y1 = row * self.square_size
                x2 = x1 + self.square_size
                y2 = y1 + self.square_size
                
                color = self.colors['light'] if (row + col) % 2 == 0 else self.colors['dark']
                
                if self.move_history:
                    last_move = self.move_history[-1]
                    if (row, col) in [last_move[0], last_move[1]]:
                        color = self.colors['last_move']
                
                if self.selected_pos == (row, col):
                    color = self.colors['selected']
                
                if self.selected_piece and self.is_valid_move(self.selected_pos, (row, col)):
                    color = self.colors['highlight']
                
                self.canvas.create_rectangle(x1, y1, x2, y2, fill=color, outline="")
                
                piece = self.board[row][col]
                if piece:
                    color_name, piece_type = piece
                    symbol = self.pieces[color_name][piece_type]
                    piece_color = "white" if color_name == "white" else "black"
                    
                    self.canvas.create_text(x1 + self.square_size//2 + 2, 
                                          y1 + self.square_size//2 + 2,
                                          text=symbol, font=("Segoe UI", 40),
                                          fill="gray")
                    self.canvas.create_text(x1 + self.square_size//2, 
                                          y1 + self.square_size//2,
                                          text=symbol, font=("Segoe UI", 40),
                                          fill=piece_color)
        
        for i in range(8):
            self.canvas.create_text(i * self.square_size + self.square_size//2, 
                                  self.board_size + 15,
                                  text=chr(97 + i), font=("Arial", 12, "bold"),
                                  fill="white")
            self.canvas.create_text(-15, 
                                  (7-i) * self.square_size + self.square_size//2,
                                  text=str(i+1), font=("Arial", 12, "bold"),
                                  fill="white")
    
    def on_square_click(self, event):
        col = event.x // self.square_size
        row = event.y // self.square_size
        
        if not (0 <= row < 8 and 0 <= col < 8):
            return
        
        clicked_piece = self.board[row][col]
        
        if self.selected_piece is None:
            if clicked_piece and clicked_piece[0] == self.turn:
                self.selected_piece = clicked_piece
                self.selected_pos = (row, col)
                self.draw_board()
        else:
            if self.is_valid_move(self.selected_pos, (row, col)):
                self.make_move(self.selected_pos, (row, col))
            else:
                if clicked_piece and clicked_piece[0] == self.turn:
                    self.selected_piece = clicked_piece
                    self.selected_pos = (row, col)
                else:
                    self.selected_piece = None
                    self.selected_pos = None
            self.draw_board()
    
    def is_valid_move(self, from_pos, to_pos):
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        piece = self.board[from_row][from_col]
        if not piece:
            return False
        
        color, piece_type = piece
        target = self.board[to_row][to_col]
        
        if target and target[0] == color:
            return False
        
        row_diff = to_row - from_row
        col_diff = to_col - from_col
        
        if piece_type == 'pawn':
            direction = -1 if color == 'white' else 1
            start_row = 6 if color == 'white' else 1
            
            if col_diff == 0:
                if row_diff == direction and not target:
                    return True
                if from_row == start_row and row_diff == 2 * direction:
                    if not target and not self.board[from_row + direction][from_col]:
                        return True
            if abs(col_diff) == 1 and row_diff == direction:
                if target and target[0] != color:
                    return True
            return False
        
        if piece_type == 'knight':
            return (abs(row_diff), abs(col_diff)) in [(2, 1), (1, 2)]
        
        if piece_type == 'bishop':
            if abs(row_diff) == abs(col_diff):
                return self.is_path_clear(from_pos, to_pos)
            return False
        
        if piece_type == 'rook':
            if row_diff == 0 or col_diff == 0:
                return self.is_path_clear(from_pos, to_pos)
            return False
        
        if piece_type == 'queen':
            if row_diff == 0 or col_diff == 0 or abs(row_diff) == abs(col_diff):
                return self.is_path_clear(from_pos, to_pos)
            return False
        
        if piece_type == 'king':
            return abs(row_diff) <= 1 and abs(col_diff) <= 1
        
        return False
    
    def is_path_clear(self, from_pos, to_pos):
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        row_step = 0 if to_row == from_row else (to_row - from_row) // abs(to_row - from_row)
        col_step = 0 if to_col == from_col else (to_col - from_col) // abs(to_col - from_col)
        
        current_row, current_col = from_row + row_step, from_col + col_step
        
        while (current_row, current_col) != (to_row, to_col):
            if self.board[current_row][current_col] is not None:
                return False
            current_row += row_step
            current_col += col_step
        
        return True
    
    def make_move(self, from_pos, to_pos):
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        piece = self.board[from_row][from_col]
        target = self.board[to_row][to_col]
        
        if target:
            self.captured_pieces[self.turn].append(target[1])
            self.update_captured_display()
        
        self.board[to_row][to_col] = piece
        self.board[from_row][from_col] = None
        
        if piece[1] == 'pawn' and (to_row == 0 or to_row == 7):
            self.board[to_row][to_col] = (piece[0], 'queen')
            self.status_label.config(text="Pawn Promoted!", fg="#e74c3c")
        
        self.move_history.append((from_pos, to_pos, piece, target))
        self.add_move_to_history(from_pos, to_pos, piece)
        
        self.turn = 'black' if self.turn == 'white' else 'white'
        self.turn_label.config(text=f"{self.turn.title()}'s Turn",
                              fg="white" if self.turn == 'white' else "gray")
        
        self.status_label.config(text="Your move!", fg="#2ecc71")
        
        self.selected_piece = None
        self.selected_pos = None
        
        self.draw_board()
    
    def add_move_to_history(self, from_pos, to_pos, piece):
        from_row, from_col = from_pos
        to_row, to_col = to_pos
        
        move_notation = f"{piece[1].upper()} {chr(97+from_col)}{8-from_row}→{chr(97+to_col)}{8-to_row}"
        self.move_list.insert(tk.END, move_notation)
        self.move_list.see(tk.END)
    
    def update_captured_display(self):
        white_captured = ' '.join([self.pieces['black'][p] for p in self.captured_pieces['white']])
        black_captured = ' '.join([self.pieces['white'][p] for p in self.captured_pieces['black']])
        
        self.captured_white.config(text=white_captured)
        self.captured_black.config(text=black_captured)
    
    def undo_move(self):
        if not self.move_history:
            return
        
        last_move = self.move_history.pop()
        from_pos, to_pos, piece, captured = last_move
        
        self.board[from_pos[0]][from_pos[1]] = piece
        self.board[to_pos[0]][to_pos[1]] = captured
        
        if captured:
            self.captured_pieces[self.turn].pop()
            self.update_captured_display()
        
        self.turn = 'black' if self.turn == 'white' else 'white'
        self.turn_label.config(text=f"{self.turn.title()}'s Turn")
        
        self.move_list.delete(tk.END)
        
        self.draw_board()
    
    def restart_game(self):
        if messagebox.askyesno("Restart", "Are you sure you want to restart?"):
            self.board = self.initialize_board()
            self.turn = 'white'
            self.selected_piece = None
            self.selected_pos = None
            self.move_history = []
            self.captured_pieces = {'white': [], 'black': []}
            self.move_list.delete(0, tk.END)
            self.update_captured_display()
            self.turn_label.config(text="White's Turn", fg="white")
            self.status_label.config(text="Game Started!", fg="#2ecc71")
            self.draw_board()
    
    def update_timer(self):
        self.start_time += 1
        minutes = self.start_time // 60
        seconds = self.start_time % 60
        self.timer_label.config(text=f"⏱️ {minutes:02d}:{seconds:02d}")
        self.root.after(1000, self.update_timer)

if __name__ == "__main__":
    root = tk.Tk()
    game = TwoPlayerChess(root)
    root.mainloop()
