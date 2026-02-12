"""
Python Chess Game - Main Entry Point
A complete chess game with AI, local, and online multiplayer
"""

import pygame
import sys
from menu import MenuManager
from constants import WINDOW_WIDTH, WINDOW_HEIGHT, FPS, TITLE

def main():
    """Main game loop"""
    # Initialize Pygame
    pygame.init()
    
    # Create window
    screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
    pygame.display.set_caption(TITLE)
    
    # Clock for FPS
    clock = pygame.time.Clock()
    
    # Menu manager handles all screens
    menu_manager = MenuManager(screen)
    
    # Main loop
    running = True
    while running:
        # Handle events
        events = pygame.event.get()
        for event in events:
            if event.type == pygame.QUIT:
                running = False
            
            # Pass events to menu manager
            menu_manager.handle_event(event)
        
        # Update
        menu_manager.update()
        
        # Draw
        menu_manager.draw()
        
        # Update display
        pygame.display.flip()
        clock.tick(FPS)
    
    # Cleanup
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()