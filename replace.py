import sys

with open('c:/Users/Ajay/OneDrive/Desktop/Port/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

rep1 = """                <h2 class="section__title">About Me</h2>
                <div class="about__grid">
                    <div class="about__body">"""

target1 = """                <h2 class="section__title" style="position: relative; z-index: 10; pointer-events: none;">About Me</h2>
                <div class="about__grid" style="position: relative; z-index: 10; pointer-events: none;">
                    <div class="about__body" style="pointer-events: auto;">"""

rep2 = """                    <div class="about__collage">
                        <img src="Media/My Image Collage.png" alt="Photo collage of Ajay">
                    </div>"""

target2 = """                <style>
                    #about {
                        position: relative;
                        overflow: hidden;
                        min-height: 80vh;
                    }
                    .about-carousel-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        perspective: 2000px;
                        z-index: 1;
                        pointer-events: auto;
                    }
                    #dragger {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        z-index: 10;
                    }
                    #dragger:active {
                        cursor: grabbing;
                    }
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
                        border-radius: 16px;
                        border: 6px solid #fff;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                        user-select: none;
                        pointer-events: none;
                    }
                    .about-vignette {
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle, rgba(14,15,15,0) 40%, rgba(14,15,15,1) 100%);
                        z-index: 5;
                        pointer-events: none;
                    }
                </style>

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
                    <div class="about-vignette"></div>
                </div>"""

if rep1 in content:
    content = content.replace(rep1, target1)
else:
    print("rep1 not found")

if rep2 in content:
    content = content.replace(rep2, target2)
else:
    print("rep2 not found")

with open('c:/Users/Ajay/OneDrive/Desktop/Port/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
