"""
Game Constants
"""

# Window settings
WINDOW_WIDTH = 1200
WINDOW_HEIGHT = 800
FPS = 60
TITLE = "Python Chess ♟"

# Board settings
BOARD_SIZE = 640  # 8x8 squares
SQUARE_SIZE = BOARD_SIZE // 8  # 80 pixels per square
BOARD_X = 50
BOARD_Y = 80

# Colors
DARK_SQUARE = (118, 150, 86)
LIGHT_SQUARE = (238, 238, 210)
HIGHLIGHT_COLOR = (186, 202, 68)
SELECTED_COLOR = (246, 246, 130)
VALID_MOVE_COLOR = (100, 100, 100, 128)

# UI Colors
BG_COLOR = (40, 40, 40)
PANEL_BG = (50, 50, 50)
TEXT_COLOR = (255, 255, 255)
BUTTON_COLOR = (70, 70, 70)
BUTTON_HOVER = (90, 90, 90)
BUTTON_ACTIVE = (60, 120, 60)

# Panel settings
PANEL_X = BOARD_X + BOARD_SIZE + 30
PANEL_WIDTH = 300
PANEL_Y = BOARD_Y

# Font sizes
TITLE_FONT_SIZE = 48
SUBTITLE_FONT_SIZE = 32
BUTTON_FONT_SIZE = 24
INFO_FONT_SIZE = 20

# Piece values (for AI)
PIECE_VALUES = {
    'P': 100,   # Pawn
    'N': 320,   # Knight
    'B': 330,   # Bishop
    'R': 500,   # Rook
    'Q': 900,   # Queen
    'K': 20000  # King
}

# Game modes
MODE_AI = "ai"
MODE_LOCAL = "local"
MODE_ONLINE = "online"

# AI difficulty
DIFFICULTY_EASY = 1
DIFFICULTY_MEDIUM = 2
DIFFICULTY_HARD = 3