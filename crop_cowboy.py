from PIL import Image

img = Image.open(r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cowboy.webp")
width, height = img.size

# Crop bottom 40px
cropped = img.crop((0, 0, width, height - 40))
cropped.save(r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cowboy.webp", "WEBP")

print(f"Original: {width}x{height}")
print(f"Cropped: {cropped.size[0]}x{cropped.size[1]}")
print("Removed 40px brown strip from bottom")
