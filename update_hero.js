const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Replace Logo
content = content.replace(/<img src=\"Media\/3325_2295\.svg\" alt=\"Ajay logo mark\"\s*style=\"height: 26px; width: 140px; object-fit: contain;\">/, `<img src=\"Media/Ajay Logo.svg\" alt=\"Ajay logo mark\"\n                        style=\"height: 26px; width: auto; object-fit: contain;\">`);

// 2. Replace Hero HTML
content = content.replace(/<section class=\"hero\" id=\"top\" aria-label=\"Hero introduction\">[\s\S]*?<\/section>/, `<section class=\"hero\" id=\"top\" aria-label=\"Hero introduction\">
            <div class=\"hero__container\">
                <img src=\"Media/Background Layer.png\" alt=\"\" class=\"hero__layer hero__layer--bg\" aria-hidden=\"true\">
                <img src=\"Media/Title Layer.svg\" alt=\"Product Designer\" class=\"hero__layer hero__layer--title\">
                <img src=\"Media/My Avatar.svg\" alt=\"Ajay Avatar\" class=\"hero__layer hero__layer--avatar\">
                
                <div class=\"hero__badge hero__badge--name\">
                    Hi, I'm Ajay 👋
                </div>
                <div class=\"hero__badge hero__badge--role\">
                    for this AI era.
                </div>

                <div class=\"hero__bottom-info\">
                    <img src=\"Media/3325_2377.svg\" alt=\"Available All Around Worldwide\" class=\"hero__available\">
                    <div class=\"hero__exp-info\">
                        <img src=\"Media/brain2.png\" alt=\"Brain Icon\" aria-hidden=\"true\">
                        <p>/// WITH 5+ YEARS<br>OVERALL EXPERIENCE</p>
                    </div>
                </div>
            </div>
        </section>`);

// 3. Replace Hero base CSS
content = content.replace(/\.hero \{[\s\S]*?\.hero__info-value \{[\s\S]*?\}\s*/, `.hero {
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            padding-top: var(--nav-h);
            z-index: 0;
        }

        .hero__container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hero__layer {
            position: absolute;
        }

        .hero__layer--bg {
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: bottom center;
            z-index: 1;
        }

        .hero__layer--title {
            z-index: 2;
            width: 100%;
            max-width: 1400px;
            object-fit: contain;
            pointer-events: none;
        }

        .hero__layer--avatar {
            z-index: 3;
            bottom: 0;
            max-height: 85vh;
            object-fit: contain;
            pointer-events: none;
        }

        .hero__badge {
            position: absolute;
            z-index: 4;
            background: #D4E96B;
            color: #1A0800;
            font-family: var(--f-body);
            font-weight: 600;
            font-size: 18px;
            padding: 12px 24px;
            border-radius: 100px;
            border: 2px solid #1A0800;
            box-shadow: 4px 4px 0px #1A0800;
        }

        .hero__badge--name {
            top: 20%;
            left: 15%;
            transform: rotate(-6deg);
        }

        .hero__badge--role {
            bottom: 30%;
            right: 15%;
            transform: rotate(4deg);
        }

        .hero__bottom-info {
            position: absolute;
            bottom: 40px;
            left: 0;
            width: 100%;
            padding: 0 var(--px);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            z-index: 4;
            box-sizing: border-box;
        }

        .hero__available {
            width: 231px;
            height: 102px;
            object-fit: contain;
        }

        .hero__exp-info {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .hero__exp-info img {
            width: 36px;
            height: 36px;
            object-fit: contain;
        }

        .hero__exp-info p {
            font-family: var(--f-mono);
            font-weight: 400;
            font-size: 12px;
            line-height: 1.5;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--muted);
            margin: 0;
        }

        `);

// 4. Replace Responsive CSS for 1024px
content = content.replace(/\.hero__grid \{[\s\S]*?\/\* Deprecated \.about__grid media query removed \*\//, `
            .hero__layer--title {
                max-width: 90%;
            }
            .hero__badge--name {
                top: 15%;
                left: 10%;
            }
            .hero__badge--role {
                bottom: 25%;
                right: 10%;
            }
            /* Deprecated .about__grid media query removed */`);

// 5. Replace Responsive CSS for 768px
content = content.replace(/\.hero__title \{[\s\S]*?\.projects__bento \{/, `
            .hero__badge {
                font-size: 14px;
                padding: 8px 16px;
            }
            .hero__badge--name {
                top: 15%;
                left: 5%;
            }
            .hero__badge--role {
                bottom: 35%;
                right: 5%;
            }
            .hero__bottom-info {
                flex-direction: column;
                align-items: center;
                gap: 24px;
                bottom: 20px;
            }
            .hero__available {
                width: 180px;
                height: auto;
            }
            .hero__exp-info {
                flex-direction: column;
                text-align: center;
            }

            .projects__bento {`);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Update complete');
