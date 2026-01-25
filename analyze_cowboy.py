from PIL import Image

img = Image.open(r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cowboy.webp")
img = img.convert("RGB")
width, height = img.size

print(f"Image size: {width}x{height}")

# Check bottom rows to find where the brown strip starts
# Sample from the left edge
brown_threshold = 60  # RGB values below this are considered dark brown

for y in range(height - 1, -1, -1):
    r, g, b = img.getpixel((width // 2, y))  # Sample middle
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    if luminance > brown_threshold:
        print(f"Brown strip starts at y={y+1}, height from bottom: {height - y - 1}px")
        break

# Also check the exact color at the bottom
r, g, b = img.getpixel((width // 2, height - 1))
print(f"Bottom pixel color: RGB({r}, {g}, {b}) = #{r:02x}{g:02x}{b:02x}")

# Check a few rows from the bottom
print("\nBottom 20 rows luminance (middle sample):")
for y in range(height - 1, max(height - 21, -1), -1):
    r, g, b = img.getpixel((width // 2, y))
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    print(f"  y={y}: RGB({r},{g},{b}) lum={luminance:.1f}")
