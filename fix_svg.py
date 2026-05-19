import re

with open('Media/Title Layer.svg', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep only the <svg> tag, defs, and the non-badge paths
new_lines = []
for i, line in enumerate(lines):
    # lines 1 to 9 (0-indexed 1 to 9) are the badges and their text
    if 1 <= i <= 9:
        continue
    new_lines.append(line)

with open('Media/Title Layer.svg', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Removed baked badges from Title Layer.svg")
