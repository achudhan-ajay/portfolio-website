import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML Replacement
html_old = """                <!-- Open to Work badge -->
                <div class="nav__badge" aria-label="Open to work status">
                    <div class="nav__badge-dot-wrap">
                        <span class="nav__badge-dot"></span>
                    </div>
                    <span class="nav__badge-text">OPEN TO WORK</span>
                </div>"""
html_new = """                <!-- Download Resume CTA -->
                <a href="Media/Ajay Resume.pdf" download class="nav__resume-btn" aria-label="Download Resume">
                    DOWNLOAD RESUME
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-top: 1px;">
                        <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-7 4h14v-2H5v2z"/>
                    </svg>
                </a>"""
content = content.replace(html_old, html_new)

# 2. CSS Replacements for .nav-light
content = content.replace('.navbar.nav-light .nav__link {', '.navbar:not(.scrolled) .nav__link,\n        .navbar.nav-light .nav__link {')
content = content.replace('.navbar.nav-light .nav__link:hover {', '.navbar:not(.scrolled) .nav__link:hover,\n        .navbar.nav-light .nav__link:hover {')
content = content.replace('.navbar.nav-light .nav__logo img {', '.navbar:not(.scrolled) .nav__logo img,\n        .navbar.nav-light .nav__logo img {')

# 3. Remove .navbar.nav-light .nav__badge logic
nav_light_badge_old = """        .navbar.nav-light .nav__badge {
            border-color: rgba(0, 0, 0, 0.18);
            background: rgba(0, 0, 0, 0.06);
        }

        .navbar.nav-light .nav__badge-dot-wrap {
            background: rgba(0, 0, 0, 0.08);
            border-color: rgba(0, 0, 0, 0.15);
        }

        .navbar.nav-light .nav__badge-text {
            color: #0E0F0F;
        }"""
content = content.replace(nav_light_badge_old, "")

# 4. Replace .navbar.nav-colored .nav__badge logic
nav_colored_badge_old = """        .navbar.nav-colored .nav__badge {
            border-color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.15);
        }

        .navbar.nav-colored .nav__badge-dot-wrap {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.35);
        }

        .navbar.nav-colored .nav__badge-text {
            color: #FFFFFF;
        }"""
nav_colored_badge_new = """        .navbar.nav-colored .nav__resume-btn {
            border-color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.15);
            color: #FFFFFF;
        }"""
content = content.replace(nav_colored_badge_old, nav_colored_badge_new)

# 5. Replace .nav__badge logic with .nav__resume-btn
base_badge_old = """        /* "OPEN TO WORK" badge — Figma: Roboto Mono, 16px, -0.32px, pill container */
        .nav__badge {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 4px 14px 4px 4px;
            border-radius: var(--r-pill);
            border: 0.5px solid rgba(255, 255, 255, 0.22);
            background: rgba(255, 255, 255, 0.08);
            transition: background 0.4s ease, border-color 0.4s ease;
        }

        .nav__badge-dot-wrap {
            width: 18px;
            height: 18px;
            border-radius: var(--r-pill);
            background: rgba(255, 255, 255, 0.10);
            border: 0.5px solid rgba(255, 255, 255, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.4s ease, border-color 0.4s ease;
        }

        .nav__badge-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--green);
            box-shadow: 0 0 8px var(--green);
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }

            50% {
                opacity: .5;
                transform: scale(.8);
            }
        }

        .nav__badge-text {
            font-family: var(--f-badge);
            font-weight: 400;
            font-size: 16px;
            letter-spacing: var(--ls-badge);
            color: var(--text);
            white-space: nowrap;
        }"""
base_badge_new = """        /* "DOWNLOAD RESUME" CTA Button */
        .nav__resume-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 20px;
            border-radius: var(--r-pill);
            border: 0.5px solid rgba(255, 255, 255, 0.22);
            background: rgba(255, 255, 255, 0.08);
            font-family: var(--f-badge);
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 0.5px;
            color: #FFFFFF;
            transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
        }

        .nav__resume-btn:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .navbar:not(.scrolled) .nav__resume-btn,
        .navbar.nav-light .nav__resume-btn {
            border-color: rgba(0, 0, 0, 0.18);
            background: rgba(0, 0, 0, 0.06);
            color: #0E0F0F;
        }

        .navbar:not(.scrolled) .nav__resume-btn:hover,
        .navbar.nav-light .nav__resume-btn:hover {
            background: rgba(0, 0, 0, 0.12);
        }"""
content = content.replace(base_badge_old, base_badge_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
