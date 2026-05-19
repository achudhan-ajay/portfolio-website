with open('c:/Users/Ajay/OneDrive/Desktop/Port/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_section = '<section class="section" id="about" aria-label="About Me">'

new_section = '''<section class="section" id="about" aria-label="About Me">

                <!-- ===== ABOUT: SKILLS TICKER ===== -->
                <div class="about__ticker">
                    <div class="about__ticker-track">
                        <span>PRODUCT DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>VISUAL DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>UX DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>SPATIAL DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>PROTOTYPING</span><span class="about-dot">&#x2022;</span>
                        <span>UX STRATEGY</span><span class="about-dot">&#x2022;</span>
                        <span>VIBE CODING</span><span class="about-dot">&#x2022;</span>
                        <span>UX RESEARCH</span><span class="about-dot">&#x2022;</span>
                        <span>PRODUCT DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>VISUAL DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>UX DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>SPATIAL DESIGN</span><span class="about-dot">&#x2022;</span>
                        <span>PROTOTYPING</span><span class="about-dot">&#x2022;</span>
                        <span>UX STRATEGY</span><span class="about-dot">&#x2022;</span>
                        <span>VIBE CODING</span><span class="about-dot">&#x2022;</span>
                        <span>UX RESEARCH</span><span class="about-dot">&#x2022;</span>
                    </div>
                </div>

                <!-- ===== ABOUT: SECTION BAR ===== -->
                <div class="section__bar">
                    <span class="section__num">01</span>
                    <span class="section__name">//ABOUT ME</span>
                    <span class="section__total">TOT. 09</span>
                </div>

                <!-- ===== ABOUT: HEADING + BIO ===== -->
                <h2 class="section__title" style="text-align:center;">About Me</h2>

                <div class="about__content-centered">
                    <div class="about__body" style="text-align:center;">
                        <p style="color:white;font-weight:500;">Bonjour, I am Ajay &#x1F44B;</p>
                        <p>I'm a Product Designer with <span style="text-decoration:underline;text-underline-offset:4px;">2+ years</span> of
                            experience, building on a diverse background that includes freelance work and a strong
                            foundation in data research totaling <span style="text-decoration:underline;text-underline-offset:4px;">5+ years</span> in the
                            field. This unique blend allows me to create storytelling driven products based on user
                            insights, always adapting and learning with a curious mindset.</p>
                        <p style="margin-top:2rem;"><a href="#about"
                                style="color:var(--text);font-weight:600;font-size:16px;letter-spacing:0.04em;display:inline-flex;align-items:center;gap:6px;">More About Me &#x2197;</a></p>
                    </div>
                </div>

                <!-- ===== ABOUT: 3D PHOTO CAROUSEL ===== -->
                <div class="about-carousel-container">
                    <div id="dragger"></div>
                    <div id="ring">
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_155656.jpg.jpeg" alt="Carousel Image 1"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_155755.jpg.jpeg" alt="Carousel Image 2"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_155837.jpg.jpeg" alt="Carousel Image 3"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_155949.jpg.jpeg" alt="Carousel Image 4"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_160038.jpg.jpeg" alt="Carousel Image 5"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_184408,jpg-Picsart-AiImageEnhancer.jpeg" alt="Carousel Image 6"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_191850,jpg-Picsart-AiImageEnhancer.jpeg" alt="Carousel Image 7"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_192215.jpg.jpeg" alt="Carousel Image 8"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_192544.jpg.jpeg" alt="Carousel Image 9"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_194617.jpg.jpeg" alt="Carousel Image 10"></div>
                        <div class="img-3d"><img src="Media/Carousel Images/20260413_224019.jpg.jpeg" alt="Carousel Image 11"></div>
                    </div>
                </div>

                <!-- ===== ABOUT: SCOPED STYLES ===== -->
                <style>
                    /* Section background */
                    #about {
                        background: #000;
                        overflow: hidden;
                        padding-bottom: 0;
                    }

                    /* Skills ticker */
                    .about__ticker {
                        width: 100%;
                        overflow: hidden;
                        background: #000;
                        border-top: 1px solid rgba(255,255,255,0.1);
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                        padding: 13px 0;
                    }
                    .about__ticker-track {
                        display: inline-flex;
                        gap: 28px;
                        white-space: nowrap;
                        animation: aboutTickerScroll 28s linear infinite;
                        will-change: transform;
                    }
                    .about__ticker-track span {
                        font-family: var(--f-body);
                        font-weight: 700;
                        font-size: 12px;
                        letter-spacing: 0.14em;
                        text-transform: uppercase;
                        color: #fff;
                    }
                    .about__ticker-track .about-dot {
                        color: rgba(255,255,255,0.35);
                        font-weight: 400;
                        letter-spacing: 0;
                        font-size: 14px;
                    }
                    @keyframes aboutTickerScroll {
                        from { transform: translateX(0); }
                        to   { transform: translateX(-50%); }
                    }

                    /* Bio content wrapper */
                    .about__content-centered {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        max-width: 820px;
                        margin: 0 auto;
                        padding: 0 var(--px) 60px;
                    }

                    /* 3D Carousel container - IN FLOW, below content */
                    .about-carousel-container {
                        position: relative;
                        width: 100%;
                        height: 580px;
                        perspective: 2000px;
                        pointer-events: auto;
                        overflow: hidden;
                        background: #000;
                    }
                    #dragger {
                        position: absolute;
                        inset: 0;
                        z-index: 10;
                        cursor: grab;
                    }
                    #dragger:active { cursor: grabbing; }
                    #ring {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        transform-style: preserve-3d;
                    }
                    .img-3d {
                        position: absolute;
                        width: 320px;
                        height: 420px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        transform-style: preserve-3d;
                    }
                    .img-3d img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 12px;
                        border: 3px solid rgba(255,255,255,0.12);
                        box-shadow: 0 24px 60px rgba(0,0,0,0.65);
                        user-select: none;
                        pointer-events: none;
                        display: block;
                    }
                </style>'''

if old_section in content:
    # Find the end of the about section - the </section> that follows
    start_idx = content.find(old_section)
    # Find </section> after start_idx - need to find the matching one
    # We know from viewing that the section ends with </section> at around line 1913
    # Find </section> after the about section start
    end_marker = '            </section>'
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        # Replace from the section opening to (but not including) the closing tag
        old_about = content[start_idx:end_idx]
        content = content.replace(old_about, new_section)
        print("Replaced about section content!")
        print(f"Old length: {len(old_about)}, New length: {len(new_section)}")
    else:
        print("Could not find </section> end marker")
else:
    print("Could not find about section opening tag")

with open('c:/Users/Ajay/OneDrive/Desktop/Port/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
