import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML Replacement
old_badge_html = """                <!-- Open to Work badge -->
                <div class="nav__badge" aria-label="Open to work status">
                    <div class="nav__badge-dot-wrap">
                        <span class="nav__badge-dot"></span>
                    </div>
                    <span class="nav__badge-text">OPEN TO WORK</span>
                </div>"""

new_cta_html = """                <!-- Download Resume CTA -->
                <a href="Media/Ajay Resume.pdf" download class="nav__resume-btn" aria-label="Download Resume">
                    DOWNLOAD RESUME
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-top: 1px;">
                        <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-7 4h14v-2H5v2z"/>
                    </svg>
                </a>"""

if old_badge_html in content:
    content = content.replace(old_badge_html, new_cta_html)
else:
    print("Warning: old_badge_html not found")

# 2. Add .nav-colored style
colored_btn_css = """        .navbar.nav-colored .nav__resume-btn {
            color: #FFFFFF;
        }"""
if colored_btn_css not in content:
    content = content.replace('.navbar.nav-colored .nav__link:hover {\n            color: #FFFFFF;\n        }', 
        '.navbar.nav-colored .nav__link:hover {\n            color: #FFFFFF;\n        }\n\n' + colored_btn_css)

# 3. Add .nav__resume-btn style and remove old .nav__badge style
old_badge_css = """        /* "OPEN TO WORK" badge"""

if old_badge_css in content:
    # We will use regex to replace everything from /* "OPEN TO WORK" badge down to the end of .nav__badge-text
    import re
    # The pattern matches from the comment to the closing brace of .nav__badge-text { ... }
    pattern = re.compile(r'        /\* "OPEN TO WORK" badge.*?.nav__badge-text \{.*?\}', re.DOTALL)
    
    new_css = """        /* Download Resume CTA */
        .nav__resume-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--f-mono);
            font-weight: 400;
            font-size: 16px;
            line-height: 1.19;
            letter-spacing: var(--ls-nav);
            text-transform: uppercase;
            color: var(--muted);
            text-decoration: none;
            transition: color 0.4s ease;
        }

        .nav__resume-btn:hover {
            color: var(--text);
        }"""
        
    content, count = pattern.subn(new_css, content)
    if count == 0:
        print("Warning: regex for old badge css failed")

# 4. Hide on mobile
old_mobile_css = """            .nav__badge {
                display: none;
            }"""
new_mobile_css = """            .nav__resume-btn {
                display: none;
            }"""
if old_mobile_css in content:
    content = content.replace(old_mobile_css, new_mobile_css)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done fixing index.html")
