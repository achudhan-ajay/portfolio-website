const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The replacement chunk
const replacement = 
                <style>
                    /* ── Sticky Parallax ── */
                    .t-sticky-bg {
                        position: sticky;
                        top: 0;
                        height: 100vh;
                        width: 100%;
                        z-index: 1;
                        pointer-events: none;
                        overflow: hidden;
                    }

                    .t-sticky-header {
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: 80px 60px 0;
                    }

                    .t-cards-layer {
                        position: relative;
                        z-index: 10;
                        margin-top: -100vh;
                        padding-top: 80vh;
                    }

                    .t-marquee-wrapper {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 0;
                        pointer-events: none;
                        overflow: hidden;
                        white-space: nowrap;
                        margin: 0 -80px;
                        padding: 8px 0;
                    }

                    .t-marquee-track {
                        display: inline-flex;
                        animation: marqueeLeft 24s linear infinite;
                        white-space: nowrap;
                    }

                    .t-marquee-track span {
                        font-size: 96px;
                        font-weight: 600;
                        font-family: var(--f-head);
                        color: #ffffff;
                        letter-spacing: -3px;
                        padding-right: 60px;
                        opacity: 0.1;
                        user-select: none;
                        line-height: 1;
                    }

                    @keyframes marqueeLeft {
                        0% {
                            transform: translateX(0);
                        }

                        100% {
                            transform: translateX(-50%);
                        }
                    }

                    /* ── Grid ── */
                    .t-section-inner {
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: 0 60px 100px;
                    }

                    .t-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 0 28px;
                        margin-top: 60px;
                        align-items: start;
                    }
                </style>

                <!-- Sticky scrolling marquee -->
                <div class="t-sticky-bg">
                    <div class="t-sticky-header">
                        <div class="section__bar" style="margin-bottom: 0;">
                            <span class="section__num">07</span>
                            <span class="section__name">//TESTIMONIALS</span>
                            <span class="section__total">TOT. 09</span>
                        </div>
                        <h2 class="section__title" style="margin-bottom: 0;">Testimonials</h2>
                    </div>

                    <div class="t-marquee-wrapper" aria-hidden="true">
                        <div class="t-marquee-track">
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Testimonials &copy; &ndash; Reviews &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                </div>

                <div class="t-cards-layer">
                    <section class="t-section-inner" aria-label="Testimonials">
                        <div class="t-grid">;

// Find where <style> starts inside the corrupted section
let sectionStart = html.indexOf('id="testimonials-section"');
let styleStart = html.indexOf('<style>', sectionStart);

// Find where .t-col { starts
let tColIndex = html.indexOf('.t-col {', styleStart);

// find previous newline before .t-col { to cut cleanly
let cutEnd = tColIndex;
while(html[cutEnd] !== '\n' && cutEnd > 0) { cutEnd--; }

// Splice
let newHtml = html.substring(0, styleStart) + replacement + html.substring(cutEnd);

fs.writeFileSync('index.html', newHtml, 'utf8');

