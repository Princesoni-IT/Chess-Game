import tkinter as tk
from tkinter import font
import math
import random
import time

class ChessLandingPage:
    def __init__(self, root):
        self.root = root
        self.root.title("♔ Royal Chess ♚")
        self.root.geometry("1200x800")
        self.root.configure(bg="#0a0a0a")
        self.root.resizable(False, False)
        
        # Animation variables
        self.animation_running = True
        self.particles = []
        self.hover_scale = 1.0
        self.glow_intensity = 0
        
        # Colors
        self.colors = {
            'bg': '#0a0a0a',
            'gold': '#FFD700',
            'gold_dark': '#B8860B',
            'silver': '#C0C0C0',
            'white': '#FFFFFF',
            'accent': '#8B0000'
        }
        
        self.setup_ui()
        self.start_animations()
        
    def setup_ui(self):
        # Main canvas for animations
        self.canvas = tk.Canvas(self.root, width=1200, height=800, 
                               bg=self.colors['bg'], highlightthickness=0)
        self.canvas.pack(fill='both', expand=True)
        
        # Create animated background particles
        self.create_particles()
        
        # Main container frame
        self.main_frame = tk.Frame(self.canvas, bg=self.colors['bg'])
        self.main_frame.place(relx=0.5, rely=0.5, anchor='center')
        
        # Chess Board Pattern Background
        self.create_chess_pattern()
        
        # Title Section with glow effect
        self.create_title_section()
        
        # Menu Buttons
        self.create_menu_buttons()
        
        # Decorative chess pieces
        self.create_floating_pieces()
        
        # Footer
        self.create_footer()
        
    def create_particles(self):
        """Create floating golden particles"""
        for _ in range(30):
            x = random.randint(0, 1200)
            y = random.randint(0, 800)
            size = random.randint(2, 6)
            speed = random.uniform(0.5, 2)
            particle = {
                'id': self.canvas.create_oval(x, y, x+size, y+size, 
                                             fill=self.colors['gold'], 
                                             stipple='gray50'),
                'x': x, 'y': y, 'size': size, 'speed': speed
            }
            self.particles.append(particle)
            
    def create_chess_pattern(self):
        """Create subtle chess board pattern"""
        square_size = 60
        for row in range(14):
            for col in range(20):
                x1 = col * square_size
                y1 = row * square_size
                color = '#1a1a1a' if (row + col) % 2 == 0 else '#0f0f0f'
                self.canvas.create_rectangle(x1, y1, x1+square_size, y1+square_size, 
                                           fill=color, outline='')
                                           
    def create_title_section(self):
        """Create animated title with chess pieces"""
        # Crown icon
        crown_label = tk.Label(self.main_frame, text="👑", font=("Segoe UI", 60), 
                              bg=self.colors['bg'], fg=self.colors['gold'])
        crown_label.pack(pady=(0, 10))
        
        # Main Title with custom font effect
        title_frame = tk.Frame(self.main_frame, bg=self.colors['bg'])
        title_frame.pack(pady=10)
        
        # Shadow text
        shadow = tk.Label(title_frame, text="ROYAL CHESS", 
                         font=("Impact", 72), 
                         bg=self.colors['bg'], fg='#333333')
        shadow.place(x=4, y=4)
        
        # Main title
        self.title_label = tk.Label(title_frame, text="ROYAL CHESS", 
                                   font=("Impact", 72), 
                                   bg=self.colors['bg'], fg=self.colors['gold'])
        self.title_label.pack()
        
        # Subtitle with typing effect
        self.subtitle = tk.Label(self.main_frame, text="", 
                                font=("Segoe UI", 18), 
                                bg=self.colors['bg'], fg=self.colors['silver'])
        self.subtitle.pack(pady=10)
        
        # Start typing animation
        self.typing_text = "Master the Game of Kings"
        self.typing_index = 0
        self.typing_animation()
        
    def typing_animation(self):
        """Typewriter effect for subtitle"""
        if self.typing_index < len(self.typing_text):
            current_text = self.typing_text[:self.typing_index+1]
            self.subtitle.config(text=current_text + "|")
            self.typing_index += 1
            self.root.after(50, self.typing_animation)
        else:
            self.subtitle.config(text=self.typing_text)
            self.blink_cursor()
            
    def blink_cursor(self):
        """Blinking cursor after typing"""
        current = self.subtitle.cget("text")
        if current.endswith("|"):
            self.subtitle.config(text=self.typing_text)
        else:
            self.subtitle.config(text=self.typing_text + "|")
        self.root.after(500, self.blink_cursor)
        
    def create_menu_buttons(self):
        """Create interactive menu buttons"""
        self.buttons_frame = tk.Frame(self.main_frame, bg=self.colors['bg'])
        self.buttons_frame.pack(pady=40)
        
        buttons = [
            ("🎮  PLAY NOW", "#FFD700", self.play_game),
            ("🤖  VS COMPUTER", "#C0C0C0", self.vs_computer),
            ("👥  TWO PLAYER", "#CD7F32", self.two_player),
            ("⚙️  SETTINGS", "#808080", self.open_settings),
            ("📊  LEADERBOARD", "#4169E1", self.show_leaderboard),
        ]
        
        self.buttons = []
        for text, color, command in buttons:
            btn = self.create_glow_button(self.buttons_frame, text, color, command)
            btn.pack(pady=8)
            self.buttons.append(btn)
            
    def create_glow_button(self, parent, text, color, command):
        """Create button with hover glow effect"""
        btn_frame = tk.Frame(parent, bg=self.colors['bg'])
        
        # Glow effect canvas
        glow_canvas = tk.Canvas(btn_frame, width=400, height=60, 
                               bg=self.colors['bg'], highlightthickness=0)
        glow_canvas.pack()
        
        # Button rectangle with rounded corners
        btn_id = glow_canvas.create_rectangle(10, 5, 390, 55, 
                                             fill=self.colors['bg'], 
                                             outline=color, width=2)
        
        # Text
        text_id = glow_canvas.create_text(200, 30, text=text, 
                                         font=("Segoe UI", 16, "bold"),
                                         fill=color)
        
        # Bind hover events
        def on_enter(e):
            glow_canvas.itemconfig(btn_id, fill=color)
            glow_canvas.itemconfig(text_id, fill=self.colors['bg'])
            glow_canvas.config(cursor="hand2")
            # Scale animation
            for i in range(10):
                glow_canvas.scale("all", 200, 30, 1.01, 1.01)
                
        def on_leave(e):
            glow_canvas.itemconfig(btn_id, fill=self.colors['bg'])
            glow_canvas.itemconfig(text_id, fill=color)
            # Reset scale
            glow_canvas.delete("all")
            btn_id = glow_canvas.create_rectangle(10, 5, 390, 55, 
                                                 fill=self.colors['bg'], 
                                                 outline=color, width=2)
            text_id = glow_canvas.create_text(200, 30, text=text, 
                                             font=("Segoe UI", 16, "bold"),
                                             fill=color)
            
        def on_click(e):
            self.animate_click(glow_canvas, btn_id, command)
            
        glow_canvas.bind("<Enter>", on_enter)
        glow_canvas.bind("<Leave>", on_leave)
        glow_canvas.bind("<Button-1>", on_click)
        
        return btn_frame
        
    def animate_click(self, canvas, btn_id, command):
        """Button click animation"""
        # Flash effect
        for i in range(5):
            canvas.itemconfig(btn_id, fill=self.colors['white'])
            self.root.update()
            time.sleep(0.02)
            canvas.itemconfig(btn_id, fill=self.colors['gold'])
            self.root.update()
            time.sleep(0.02)
        command()
        
    def create_floating_pieces(self):
        """Create floating chess pieces animation"""
        pieces = ["♔", "♕", "♖", "♗", "♘", "♙"]
        self.floating_pieces = []
        
        for i, piece in enumerate(pieces):
            label = tk.Label(self.root, text=piece, 
                           font=("Segoe UI", 40), 
                           bg=self.colors['bg'], fg=self.colors['gold'])
            x = 100 + i * 180
            y = 700
            label.place(x=x, y=y)
            self.floating_pieces.append({
                'label': label,
                'x': x,
                'y': y,
                'base_y': y,
                'offset': i * 0.5,
                'speed': 0.02 + i * 0.005
            })
            
    def create_footer(self):
        """Create footer with version info"""
        footer = tk.Label(self.root, text="v1.0 | Python Chess Engine", 
                         font=("Segoe UI", 10), 
                         bg=self.colors['bg'], fg="#444444")
        footer.place(relx=0.5, rely=0.95, anchor='center')
        
    def start_animations(self):
        """Start all background animations"""
        self.animate_particles()
        self.animate_floating_pieces()
        self.animate_title_glow()
        
    def animate_particles(self):
        """Animate floating particles"""
        if not self.animation_running:
            return
            
        for p in self.particles:
            p['y'] -= p['speed']
            if p['y'] < -10:
                p['y'] = 810
                p['x'] = random.randint(0, 1200)
            self.canvas.coords(p['id'], p['x'], p['y'], 
                             p['x']+p['size'], p['y']+p['size'])
                             
        self.root.after(16, self.animate_particles)  # ~60fps
        
    def animate_floating_pieces(self):
        """Animate chess pieces floating up and down"""
        if not self.animation_running:
            return
            
        current_time = time.time()
        for piece in self.floating_pieces:
            # Sine wave motion
            offset = math.sin(current_time * 2 + piece['offset']) * 20
            new_y = piece['base_y'] + offset
            piece['label'].place(y=new_y)
            
        self.root.after(16, self.animate_floating_pieces)
        
    def animate_title_glow(self):
        """Animate title glow effect"""
        if not self.animation_running:
            return
            
        self.glow_intensity += 0.05
        intensity = abs(math.sin(self.glow_intensity))
        
        # Create gradient effect
        r = int(255 * intensity)
        g = int(215 * intensity)
        b = int(0)
        
        glow_color = f'#{r:02x}{g:02x}{b:02x}'
        self.title_label.config(fg=glow_color)
        
        self.root.after(50, self.animate_title_glow)
        
    # Button Commands
    def play_game(self):
        self.show_notification("Starting Quick Match...", "#FFD700")
        
    def vs_computer(self):
        self.show_notification("Loading AI Engine...", "#C0C0C0")
        
    def two_player(self):
        self.show_notification("Setting up Local Multiplayer...", "#CD7F32")
        
    def open_settings(self):
        self.show_notification("Opening Settings...", "#808080")
        
    def show_leaderboard(self):
        self.show_notification("Loading Leaderboard...", "#4169E1")
        
    def show_notification(self, message, color):
        """Show temporary notification"""
        notif = tk.Label(self.root, text=message, 
                        font=("Segoe UI", 14, "bold"),
                        bg=color, fg=self.colors['bg'],
                        padx=20, pady=10)
        notif.place(relx=0.5, rely=0.1, anchor='center')
        
        # Fade out animation
        def fade_out(alpha=1.0):
            if alpha > 0:
                notif.place_configure(rely=0.1 - (1-alpha)*0.05)
                self.root.after(50, lambda: fade_out(alpha-0.05))
            else:
                notif.destroy()
                
        self.root.after(1000, fade_out)

# Run the application
if __name__ == "__main__":
    root = tk.Tk()
    app = ChessLandingPage(root)
    root.mainloop()