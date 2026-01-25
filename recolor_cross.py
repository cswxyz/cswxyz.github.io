from PIL import Image
try:
    from pillow_avif import AvifImagePlugin
except ImportError:
    pass

# Load the cross image
img = Image.open(r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cross.png")
img = img.convert("RGBA")

# Target colors - black
target_color = (0, 0, 0)        # #000000

pixels = img.load()
width, height = img.size

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 0:
            # Calculate luminance
            luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255

            if luminance < 0.7:
                # Dark/maroon pixels -> deeper maroon
                shade = 0.7 + 0.3 * (luminance / 0.7)
                new_r = int(target_color[0] * shade)
                new_g = int(target_color[1] * shade)
                new_b = int(target_color[2] * shade)
                pixels[x, y] = (new_r, new_g, new_b, a)
            else:
                # Light/background pixels -> transparent
                pixels[x, y] = (0, 0, 0, 0)

img.save(r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cross.png", "PNG")
print("Cross recolored to deep maroon with transparent background")
