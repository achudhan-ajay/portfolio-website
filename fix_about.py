import sys

with open('c:/Users/Ajay/OneDrive/Desktop/Port/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Change section__title to be centered
old1 = '<h2 class="section__title" style="position: relative; z-index: 10; pointer-events: none;">About Me</h2>'
new1 = '<h2 class="section__title" style="position: relative; z-index: 10; pointer-events: none; text-align: center;">About Me</h2>'

# Fix 2: Change about__grid to be a centered single column
old2 = '<div class="about__grid" style="position: relative; z-index: 10; pointer-events: none;">'
new2 = '<div class="about__content-centered" style="position: relative; z-index: 10; pointer-events: none; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 800px; margin: 0 auto; padding: 40px var(--px);">'

# Fix 3: Change about__body to remove left-align styles
old3 = '<div class="about__body" style="pointer-events: auto;">'
new3 = '<div class="about__body" style="pointer-events: auto; text-align: center;">'

if old1 in content:
    content = content.replace(old1, new1)
    print("Fix 1 applied")
else:
    print("Fix 1 NOT found")

if old2 in content:
    content = content.replace(old2, new2)
    print("Fix 2 applied")
else:
    print("Fix 2 NOT found")

if old3 in content:
    content = content.replace(old3, new3)
    print("Fix 3 applied")
else:
    print("Fix 3 NOT found")

with open('c:/Users/Ajay/OneDrive/Desktop/Port/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
