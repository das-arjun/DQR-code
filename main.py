import pygame
import sys

# 1. Setup Palette (Red Orange Yellow Green Blue Indigo Violet Magenta Black White)
PALETTE = [
    (255, 0, 0),  # 0: Red
    (255, 127, 0),  # 1: Orange
    (255, 255, 0),  # 2: Yellow
    (0, 255, 0),  # 3: Green
    (0, 0, 255),  # 4: Blue
    (75, 0, 130),  # 5: Indigo
    (148, 0, 211),  # 6: Violet
    (255, 0, 255),  # 7: Magenta
    (0, 0, 0),  # 8: Black (Bl)
    (255, 255, 255)  # 9: White (W)
]


def text_to_snake_digits(text):
    """Converts ASCII to a string of digits with 3-digit padding."""
    # Using zfill(3) ensures 'a' (97) becomes '097' for a consistent grid
    return "".join(str(ord(c)).zfill(3) for c in text)


def draw_snake_grid(surface, digit_string, x_start, y_start, cols=9, size=40, gap=4):
    """Draws digits in a snake-wrap pattern."""
    for i, digit in enumerate(digit_string):
        row = i // cols
        col = i % cols

        # Snake logic: reverse direction on odd rows
        if row % 2 != 0:
            col = (cols - 1) - col

        color = PALETTE[int(digit)]

        rect_x = x_start + col * (size + gap)
        rect_y = y_start + row * (size + gap)

        # Draw the color block
        pygame.draw.rect(surface, color, (rect_x, rect_y, size, size))
        # Thin grey border for visibility (especially for White/Black)
        pygame.draw.rect(surface, (100, 100, 100), (rect_x, rect_y, size, size), 1)


# --- Pygame Main ---
pygame.init()
screen = pygame.display.set_mode((900, 700))
pygame.display.set_caption("Visual ASCII Snake Code")

# Data to encode
my_text = "Visual ASCII Snake Code in a Decimal QR code"
# 'd'(100), 'a'(097), 't'(116), 'a'(097) -> "100097116097"
encoded_digits = text_to_snake_digits(my_text)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((30, 30, 30))  # Dark background

    # Draw the snake grid (9 columns wide)
    draw_snake_grid(screen, encoded_digits, x_start=60, y_start=60, cols=15, size=42)

    pygame.display.flip()

pygame.quit()
sys.exit()
