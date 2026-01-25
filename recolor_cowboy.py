from PIL import Image
try:
    from pillow_avif import AvifImagePlugin  # AVIF support
except ImportError:
    pass  # Plugin auto-registers with PIL

# Load the AVIF image
img = Image.open(r"C:\Users\savez\Downloads\desert-cowboy-vector-silhouette_1298506-781.avif")
img = img.convert("RGBA")

# Target color - deeper/darker maroon (user requested deeper than #5a252c)
target_color = (58, 23, 28)  # #3a171c - deep maroon

# Get pixel data
pixels = img.load()
width, height = img.size

# Recolor: convert dark pixels (silhouette) to maroon, background to transparent
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 0:  # If pixel is not fully transparent
            # Calculate luminance
            luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255

            # Threshold: dark pixels are silhouette, light pixels are background
            if luminance < 0.5:
                # Dark pixel = silhouette -> deep maroon with some shading
                shade_factor = 0.6 + 0.4 * (luminance / 0.5)
                new_r = int(target_color[0] * shade_factor)
                new_g = int(target_color[1] * shade_factor)
                new_b = int(target_color[2] * shade_factor)
                pixels[x, y] = (new_r, new_g, new_b, a)
            else:
                # Light pixel = background -> transparent
                pixels[x, y] = (0, 0, 0, 0)

# Save as PNG
output_path = r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cowboy-silhouette.png"
img.save(output_path, "PNG")
print(f"Saved to {output_path}")
print(f"Image size: {width}x{height}")
