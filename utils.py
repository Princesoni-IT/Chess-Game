"""
Utility functions
"""

import random
import string

def generate_room_code(length=6):
    """Generate a random room code for online multiplayer"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def format_time(seconds):
    """Format seconds into MM:SS"""
    minutes = seconds // 60
    secs = seconds % 60
    return f"{minutes:02d}:{secs:02d}"