from PIL import Image
import numpy as np

# Load original image
img = Image.open(r"C:\Users\savez\Downloads\example.webp")
img = img.convert("RGBA")
width, height = img.size

print(f"Original size: {width}x{height}")

# Convert to numpy for faster processing
data = np.array(img)

# Get RGB channels
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Calculate luminance
luminance = 0.299 * r + 0.587 * g + 0.114 * b

# Dark pixels (silhouette) -> black, light pixels -> white
threshold = 200
output = np.zeros_like(data)

# Dark pixels become black
dark_mask = luminance < threshold
output[dark_mask] = [0, 0, 0, 255]

# Light pixels become white
light_mask = luminance >= threshold
output[light_mask] = [255, 255, 255, 255]

# Create output image
result = Image.fromarray(output.astype('uint8'), 'RGBA')

# Crop 20px from bottom
cropped = result.crop((0, 0, width, height - 20))

# Save
cropped.save(r"C:\Users\savez\documents\projects\cswxyz.github.io\images\cowboy.webp", "WEBP")

print(f"Final size: {cropped.size[0]}x{cropped.size[1]}")
print("Recolored to black/white and cropped 20px from bottom")
