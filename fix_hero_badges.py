import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Badge CSS
old_badge_css = """        .hero__badge {
            position: absolute;
            z-index: 4;
            background: #9BD423;
            color: #1A0800;
            font-family: var(--f-body);
            font-weight: 600;
            font-size: 18px;
            padding: 12px 24px;
            border-radius: 0px;
            border: 2px solid #1A0800;
            box-shadow: 6px 6px 0px #1A0800;
        }

        .hero__badge--name {
            top: 20%;
            left: 15%;
        }

        .hero__badge--role {
            bottom: 30%;
            right: 15%;
        }"""
new_badge_css = """        .hero__badge {
            position: absolute;
            z-index: 4;
            background: #A9D19E; /* Figma light green */
            color: #000000;
            font-family: var(--f-body);
            font-weight: 500;
            font-size: 16px;
            padding: 6px 12px;
            border-radius: 4px;
            /* Brackets or shadows removed to match Figma */
        }

        /* Based on the 400 | 600 | 400 layout */
        /* Center container is 1406px wide, so left/right are relative to center */
        .hero__badge--name {
            top: 22%;
            left: 20%;
        }

        .hero__badge--role {
            bottom: 42%;
            right: 18%;
        }

        /* Avatar Wrapper for Brackets */
        .hero__avatar-wrapper {
            position: absolute;
            z-index: 3;
            bottom: 0;
            height: 85vh;
            display: inline-block;
        }

        .hero__avatar-wrapper::before,
        .hero__avatar-wrapper::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            pointer-events: none;
            z-index: 5;
        }

        /* Draw corner brackets using multiple box-shadows or borders */
        .hero__avatar-wrapper::before {
            top: 20px;
            left: 20px;
            border-top: 1px solid rgba(255,255,255,0.4);
            border-left: 1px solid rgba(255,255,255,0.4);
        }
        .hero__avatar-wrapper::after {
            bottom: 20px;
            right: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.4);
            border-right: 1px solid rgba(255,255,255,0.4);
        }

        .hero__avatar-wrapper .bracket-tr {
            position: absolute;
            top: 20px;
            right: 20px;
            border-top: 1px solid rgba(255,255,255,0.4);
            border-right: 1px solid rgba(255,255,255,0.4);
            width: 16px;
            height: 16px;
            pointer-events: none;
            z-index: 5;
        }

        .hero__avatar-wrapper .bracket-bl {
            position: absolute;
            bottom: 20px;
            left: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.4);
            border-left: 1px solid rgba(255,255,255,0.4);
            width: 16px;
            height: 16px;
            pointer-events: none;
            z-index: 5;
        }"""
content = content.replace(old_badge_css, new_badge_css)

# 2. Update HTML
old_avatar_html = """                <img src="Media/My Avatar.svg" alt="Ajay Avatar" class="hero__layer hero__layer--avatar">"""
new_avatar_html = """                <div class="hero__avatar-wrapper">
                    <span class="bracket-tr"></span><span class="bracket-bl"></span>
                    <img src="Media/My Avatar.svg" alt="Ajay Avatar" class="hero__layer hero__layer--avatar" style="position: relative; height: 100%; bottom: auto;">
                </div>"""
content = content.replace(old_avatar_html, new_avatar_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Badges and Avatar Brackets updated.")
