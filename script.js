/* === SCRIPT.JS === */

(function() {
    // 1. Theme Switcher & Background Logic
    const navbar    = document.getElementById('navbar');
    const toolsSection = document.getElementById('tools-section');
    const testimonialsSection = document.getElementById('testimonials-section');
    const toolsSubtitle = document.getElementById('tools-subtitle');
    const tsText = document.getElementById('ts-text');
    let activeBody = null;
    let currentToolsState = 'inactive'; // 'inactive', 'default', 'tool'

    if (!toolsSection || !testimonialsSection) return;

    // Set the navbar bg to any color/gradient + handle text contrast
    function applyNavColor(bgValue, textContrast /* 'white' | 'black' | 'light' */) {
        if (!navbar) return;
        navbar.style.background = bgValue;
        navbar.style.backdropFilter = 'blur(24px)';
        navbar.style.webkitBackdropFilter = 'blur(24px)';

        if (textContrast === 'black') {
            // Dark text on light/bright background
            navbar.classList.add('nav-light');
            navbar.classList.remove('nav-colored');
        } else if (textContrast === 'white') {
            // White text on dark/vivid background
            navbar.classList.remove('nav-light');
            navbar.classList.add('nav-colored');
        } else {
            // 'light' = white bg default state
            navbar.classList.add('nav-light');
            navbar.classList.remove('nav-colored');
        }
    }

    function clearNav() {
        if (!navbar) return;
        navbar.style.background = '';
        navbar.style.backdropFilter = '';
        navbar.style.webkitBackdropFilter = '';
        navbar.classList.remove('nav-light', 'nav-colored');
    }

    // Toggle tools-light on the wrapper so title/bar text inverts
    function setToolsLight(on) {
        const wrapper = document.getElementById('tools-bg-wrapper');
        if (!wrapper) return;
        if (on) wrapper.classList.add('tools-light');
        else wrapper.classList.remove('tools-light');
    }

    function updateBg(bgValue) {
        const wrapper = document.getElementById('tools-bg-wrapper');
        if (wrapper) wrapper.style.background = bgValue;
    }

    function clearBg() {
        const wrapper = document.getElementById('tools-bg-wrapper');
        if (wrapper) wrapper.style.background = '#0E0F0F';
    }

    const NAV_H = 72; // matches --nav-h CSS variable

    window.addEventListener('scroll', () => {
        const toolsRect = toolsSection.getBoundingClientRect();
        const testmRect = testimonialsSection.getBoundingClientRect();

        // Activate the instant the tools section top touches the navbar bottom
        const toolsIsActive = toolsRect.top <= NAV_H && testmRect.top > NAV_H;

        if (toolsIsActive) {
            if (activeBody && activeBody.plugin) {
                // Sticky: keep the selected tool's bg + nav contrast
                applyNavColor(activeBody.plugin.bg, activeBody.plugin.text);
                setToolsLight(activeBody.plugin.text === 'black');
                if (currentToolsState !== 'tool') {
                    updateBg(activeBody.plugin.bg);
                    currentToolsState = 'tool';
                }
            } else {
                // Default: white background for tools section
                applyNavColor('#FFFFFF', 'light');
                setToolsLight(true);
                if (currentToolsState !== 'default') {
                    updateBg('#FFFFFF');
                    currentToolsState = 'default';
                    if (toolsSubtitle) toolsSubtitle.style.color = 'rgba(0,0,0,0.5)';
                }
            }
        } else {
            // Outside tools section → revert nav + dark bg
            clearNav();
            setToolsLight(false);
            if (currentToolsState !== 'inactive') {
                clearBg();
                activeBody = null;
                currentToolsState = 'inactive';
                if (toolsSubtitle) {
                    toolsSubtitle.classList.remove('active');
                    toolsSubtitle.style.color = 'rgba(255,255,255,0.5)';
                    if (tsText) tsText.innerHTML = 'Click and drag any tool';
                }
            }
        }
    }, { passive: true });

    // 2. Matter.js Setup
    const container = document.getElementById('tools-physics-container');
    if (!container) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;
    engine.gravity.y = 0.8;

    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            background: 'transparent',
            wireframes: false,
            pixelRatio: window.devicePixelRatio
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    let ground    = Bodies.rectangle(container.clientWidth / 2, container.clientHeight + 25, container.clientWidth * 2, 50, wallOptions);
    let leftWall  = Bodies.rectangle(-25, container.clientHeight / 2, 50, container.clientHeight * 2, wallOptions);
    let rightWall = Bodies.rectangle(container.clientWidth + 25, container.clientHeight / 2, 50, container.clientHeight * 2, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall]);

    window.addEventListener('resize', () => {
        render.canvas.width  = container.clientWidth;
        render.canvas.height = container.clientHeight;
        Matter.Body.setPosition(ground,    { x: container.clientWidth / 2, y: container.clientHeight + 25 });
        Matter.Body.setPosition(rightWall, { x: container.clientWidth + 25, y: container.clientHeight / 2 });
    });

    // 3. Icons Setup - Specific Colors & Text Rules
    const iconData = [
        { name: 'Adobe suite.svg', desc: 'Adobe: Bringing visual concepts to life with powerful design tools.', bg: '#EB1102', text: 'white' },
        { name: 'Antigravity.svg', desc: 'Antigravity: My secret weapon for advanced AI-assisted development.', bg: '#3186FF', text: 'white' },
        { name: 'Claude.svg', desc: 'Claude: Where ideas take shape and complex problems find clarity.', bg: '#ED8460', text: 'white' },
        { name: 'Figma Make.svg', desc: 'Figma Make: Accelerating UI creation through rapid prototyping.', bg: '#1A1A1A', text: 'white' },
        { name: 'Figma.svg', desc: 'Figma: Where design systems scale effortlessly across entire teams.', bg: '#1A1A1A', text: 'white' },
        { name: 'Framer.svg', desc: 'Framer: Bridging the gap between static design and interactive web.', bg: 'linear-gradient(135deg, #2CC5F8, #4312F4)', text: 'white' },
        { name: 'GPT.svg', desc: 'ChatGPT: Unlocking rapid problem-solving and ideation capabilities.', bg: '#0EA982', text: 'white' },
        { name: 'Gemini.svg', desc: 'Gemini: Deep multimodal analysis for advanced research tasks.', bg: 'linear-gradient(135deg, #9168C0, #1BA1E3)', text: 'white' },
        { name: 'Google Stitch.svg', desc: 'Google Stitch: Seamlessly weaving data across integrated environments.', bg: '#FFB1EE', text: 'black' },
        { name: 'Notion.svg', desc: 'Notion: My second brain for organizing thoughts, docs, and systems.', bg: '#FFFFFF', text: 'black' },
        { name: 'Pro Create.svg', desc: 'Pro Create: Crafting expressive digital illustrations from scratch.', bg: 'linear-gradient(135deg, #7C4ADF, #E251D8, #F6F8B0)', text: 'white' },
        { name: 'Spline.svg', desc: 'Spline: Adding depth to the web with interactive 3D elements.', bg: 'linear-gradient(135deg, #FFC124, #FF47F3)', text: 'white' },
        { name: 'Spotify.svg', desc: 'Spotify: The essential soundtrack for deep focus and flow state.', bg: '#1ED760', text: 'white' },
        { name: 'UI Wizard.svg', desc: 'UI Wizard: Conjuring magical layout structures in record time.', bg: '#FFC125', text: 'black' }
    ];

    const iconBodies = [];
    const originalSvgSize = 200;
    const targetDiameter = 140; // LARGE icons
    const iconRadius = targetDiameter / 2; 
    const scale = targetDiameter / originalSvgSize;

    iconData.forEach((icon, i) => {
        const x = Math.random() * (container.clientWidth - iconRadius * 4) + iconRadius * 2;
        const y = -100 - (Math.random() * 1200); 
        
        const body = Bodies.circle(x, y, iconRadius, {
            restitution: 0.8, 
            friction: 0.05,
            frictionAir: 0.01,
            render: {
                sprite: {
                    texture: `Media/Logos/${icon.name}`,
                    xScale: scale,
                    yScale: scale
                }
            }
        });
        
        body.plugin = { color: icon.color, bg: icon.bg, text: icon.text, desc: icon.desc };
        iconBodies.push(body);
    });

    let dropped = false;
    const dropObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !dropped) {
            Composite.add(world, iconBodies);
            dropped = true;
            dropObserver.disconnect();
        }
    }, { threshold: 0.1 });
    
    dropObserver.observe(toolsSection);

    // 4. Mouse Interaction (Sticky State Update)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    Events.on(mouseConstraint, 'mousedown', (event) => {
        if (mouseConstraint.body) {
            activeBody = mouseConstraint.body;
            
            if (activeBody.plugin) {
                currentToolsState = 'tool';
                updateBg(activeBody.plugin.bg);
                // Paint navbar with same brand color + proper text contrast
                applyNavColor(activeBody.plugin.bg, activeBody.plugin.text);
                setToolsLight(activeBody.plugin.text === 'black');

                if (toolsSubtitle && tsText) {
                    const textColor = activeBody.plugin.text === 'white' ? '#FFFFFF' : '#0E0F0F';
                    toolsSubtitle.style.color = textColor;
                    toolsSubtitle.classList.add('active'); // show quote icons
                    const descParts = activeBody.plugin.desc.split(': ');
                    if (descParts.length > 1) {
                        tsText.innerHTML = `<span style="font-weight: 700;">${descParts[0]}</span><span style="font-weight: 400;">: ${descParts.slice(1).join(': ')}</span>`;
                    } else {
                        tsText.innerHTML = activeBody.plugin.desc;
                    }
                }
            }
        }
    });

    // 5. Custom Stroke Render on Active Body
    Events.on(render, 'afterRender', () => {
        if (activeBody) {
            const ctx = render.context;
            ctx.beginPath();
            ctx.arc(activeBody.position.x, activeBody.position.y, activeBody.circleRadius + 4, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFFFFF';
            // Use black stroke if the background is white so it stands out?
            if (activeBody.plugin && activeBody.plugin.bg === '#FFFFFF') {
                ctx.strokeStyle = '#0E0F0F';
            }
            ctx.stroke();
            ctx.closePath();
        }
    });

    // Prevent default scroll blocking on canvas
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

})();

/* ── Testimonials Parallax ── */
(function () {
    const tSection = document.getElementById('testimonials-section');
    const colLeft  = document.getElementById('t-col-left');
    const colRight = document.getElementById('t-col-right');
    if (!tSection || !colLeft || !colRight) return;

    // Right column baseline offset (pushed down visually to stagger columns)
    const BASE_RIGHT = 80;

    function onScroll() {
        const rect = tSection.getBoundingClientRect();
        const vh   = window.innerHeight;

        // progress: 0 when top of section hits viewport bottom, 1 when bottom leaves viewport top
        const progress = 1 - (rect.bottom / (vh + rect.height));
        const clamped  = Math.max(0, Math.min(1, progress));

        // Left column: subtle upward drift as user scrolls down
        const leftShift  = clamped * -50;
        // Right column: starts 80px lower, drifts up at half the rate of left
        const rightShift = BASE_RIGHT + clamped * -25;

        colLeft.style.transform  = `translateY(${leftShift}px)`;
        colRight.style.transform = `translateY(${rightShift}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise on load
})();

