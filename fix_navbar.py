import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Revert the nav__link light styling to just apply to .nav-light
content = content.replace('.navbar:not(.scrolled) .nav__link,\n        .navbar.nav-light .nav__link {', '.navbar.nav-light .nav__link {')
content = content.replace('.navbar:not(.scrolled) .nav__link:hover,\n        .navbar.nav-light .nav__link:hover {', '.navbar.nav-light .nav__link:hover {')

# Fix 2: Revert the nav__logo img inversion to just apply to .nav-light
content = content.replace('.navbar:not(.scrolled) .nav__logo img,\n        .navbar.nav-light .nav__logo img {', '.navbar.nav-light .nav__logo img {')

# Fix 3: Revert the nav__resume-btn light styling to just apply to .nav-light
old_btn_light = """        .navbar:not(.scrolled) .nav__resume-btn,
        .navbar.nav-light .nav__resume-btn {
            border-color: rgba(0, 0, 0, 0.18);
            background: rgba(0, 0, 0, 0.06);
            color: #0E0F0F;
        }

        .navbar:not(.scrolled) .nav__resume-btn:hover,
        .navbar.nav-light .nav__resume-btn:hover {
            background: rgba(0, 0, 0, 0.12);
        }"""
new_btn_light = """        .navbar.nav-light .nav__resume-btn {
            border-color: rgba(0, 0, 0, 0.18);
            background: rgba(0, 0, 0, 0.06);
            color: #0E0F0F;
        }

        .navbar.nav-light .nav__resume-btn:hover {
            background: rgba(0, 0, 0, 0.12);
        }"""
content = content.replace(old_btn_light, new_btn_light)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Navbar CSS fixed.")
