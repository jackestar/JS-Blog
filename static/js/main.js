//  PCB

const canvas = document.getElementById('pcbAnimation');
const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00ff9d';
const pcb = new PCBTraceAnimation(canvas, {
    color: accent,
    lineWidth: 3,
    speed: 3,
    lineSpacing: 5
});

let fitCanvas = () => {
    pcb.initCanvas();
}

window.addEventListener('resize', fitCanvas);
fitCanvas();


pcb.drawLine(.35, .75, .30, true, false);
pcb.drawLine(.35, .25, .30, true, true);
pcb.drawLine(.65, .25, .50, false, false);
pcb.drawLine(.35, .25, .50, false, true);

pcb.start();

// Github

const animateTitle = () => {
    const brackets = document.querySelectorAll('.code-title .bracket');
    if (brackets.length < 2) return;

    // List of symbol pairs to cycle through
    const pairs = [
        ['{', '}'],
        ['[', ']'],
        ['<', '/>'],
        ['(', ')'],
        ['/*', '*/'],
        ['//', ''],
        ['<!--', '-->'],
        ['${', '}']
    ];

    let index = 0;

    setInterval(() => {
        // Option 1: Sequential (Predictable)
        // index = (index + 1) % pairs.length;
        // const [left, right] = pairs[index];

        // Option 2: Random (More generic "hacker" feel)
        const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
        const [left, right] = randomPair;

        // Apply text
        brackets[0].textContent = left;
        brackets[1].textContent = right;

        // Optional: Add a subtle color glitch effect randomly
        brackets.forEach(b => {
            b.style.opacity = Math.random() > 0.8 ? '0.75' : '1';
        });

    }, 1500); // Change speed here (ms)
};

// Start the animation
animateTitle();

let fetchGitHub = async () => {
    const container = document.querySelector('.cards');
    const username = 'jackestar';

    // Add loading state
    let message = document.createElement('p')

    message.innerText = "Loading repositories..."
    container.append(message)
    // container.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1; text-align:center;">Loading repositories...</p>';

    try {
        const response = await fetch(`https://pinned.berrysauce.dev/get/${username}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) throw new Error("No pinned repos found");

        message.style.display = 'none'
        // container.innerHTML = ''; // Clear loading text

        // 1. Create DOM Elements
        data.forEach(repo => {
            const card = document.createElement('a');
            card.className = 'repo-card'; // We removed gsap-reveal class to handle it manually
            card.href = `https://github.com/${username}/${repo.name}`;
            card.target = "_blank";
            card.rel = "noopener noreferrer"; // Security best practice

            card.innerHTML = `
                <div class="repo-content">
                    <span class="repo-name">${repo.name}</span>
                    <div class="repo-desc">${repo.description || 'No description provided.'}</div>
                </div>
                <div class="repo-stats">
                    <span style="display:flex; align-items:center;">
                        <span class="circle" style="background-color: ${repo.languageColor || '#fff'}"></span>
                        ${repo.language || 'Code'}
                    </span>
                </div>
            `;
            container.appendChild(card);
        });

        // 2. Animate with GSAP after elements exist
        ScrollTrigger.refresh();
        animateGitHub();

    } catch (err) {
        console.error(err);
        message.innerHTML = `              <p>Could not load pinned repos.</p>
                <a href="https://github.com/${username}" target="_blank" style="color: var(--secondary); text-decoration: underline;">
                    Visit GitHub Profile
                </a>`
    }
}

const animateGitHub = () => {

    gsap.to(".repo-card", {
        scrollTrigger: {
            trigger: "#github",
            start: "top 50%", // Starts when top of section hits 80% of viewport height
            end: 'end 20%',
            toggleActions: "play none none reverse",
            scrub: 1
        },
        y: 0,
        // opacity: 1,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.15, // Delay between each card appearing
        ease: "power2.out"
    });

    gsap.to(".cards", {
        scrollTrigger: {
            trigger: "#github",
            start: "end -20%",   // Start fading out when section hits top of screen
            end: "end -50%",  // Finish when bottom of section hits top of screen
            scrub: 1,           // Tie animation to scrollbar speed
            toggleActions: "play none none reverse"
        },
        scale: 1.1,             // "Grow" effect
        filter: "blur(5px)",   // "Blur out" effect
        opacity: 0,             // Fade out
        ease: "none"            // Linear ease is best for scrubbing
    });
};

document.addEventListener("DOMContentLoaded", (event) => {

    gsap.registerPlugin(ScrollTrigger);

    // Hero intro: expand from center, then type H1 and P, then start the typer list
    // (function heroIntro() {
    const hero = document.querySelector("#home article.hero");
    if (!hero) return;

    const h1 = hero.querySelector('h1');
    const p = hero.querySelector('p');
    const typer = hero.querySelector('.typer');

    const h1Text = (h1 && h1.dataset && h1.dataset.text) ? h1.dataset.text : (h1 ? h1.textContent.trim() : '');
    const pText = (p && p.dataset && p.dataset.text) ? p.dataset.text : (p ? p.textContent.trim() : '');

    // --- Helper Functions ---
    let typeText = (el, text, speed = 60) => {
        return new Promise(resolve => {
            if (!el) return resolve();
            let i = 0;
            el.textContent = ""; // Ensure clear before typing
            const t = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(t);
                    resolve();
                }
            }, speed);
        });
    }

    let startTyper = (list, container, cfg = {}) => {
        if (!container || !Array.isArray(list) || list.length === 0) return;
        const textSpan = document.createElement('span');
        textSpan.className = 'typer-text';
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        container.textContent = '';
        container.appendChild(textSpan);
        container.appendChild(cursor);

        let idx = 0;
        let char = 0;
        let deleting = false;

        const typeSpeed = cfg.typeSpeed || 60;
        const deleteSpeed = cfg.deleteSpeed || 30;
        const pause = cfg.pause || 1200;

        let tick = () => {
            const full = list[idx];
            if (!deleting) {
                char++;
                textSpan.textContent = full.slice(0, char);
                if (char === full.length) {
                    deleting = true;
                    setTimeout(tick, pause);
                    return;
                }
            } else {
                char--;
                textSpan.textContent = full.slice(0, char);
                if (char === 0) {
                    deleting = false;
                    idx = (idx + 1) % list.length;
                    setTimeout(tick, 300);
                    return;
                }
            }
            setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
        }
        tick();
    }

    let habTyper = () => {
        startTyper([
            'embedded systems',
            'microcontrollers',
            'electronics',
            '3D viewer'
        ], typer, { typeSpeed: 60, deleteSpeed: 30, pause: 1100 });
    }
    const isScrolled = window.scrollY > 100;

    if (isScrolled) {
        // SKIP ANIMATION: Set final state immediately
        // This ensures scale is 1, so when you scroll back up, the element is there.
        gsap.set(hero, { scale: 1, opacity: 1, transformOrigin: 'center center' });

        // Restore text immediately (no typing effect)
        if (h1) h1.textContent = h1Text;
        if (p) p.textContent = pText;

        // Start the looping typer immediately
        habTyper();

    } else {
        // PLAY ANIMATION: User is at the top
        if (h1) h1.textContent = '';
        if (p) p.textContent = '';

        gsap.set(hero, { scale: 0, opacity: 0, transformOrigin: 'center center' });

        gsap.to(hero, {
            duration: 0.9,
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.7)',
            onComplete: async () => {
                await typeText(h1, h1Text, 70);
                await new Promise(r => setTimeout(r, 180));
                await typeText(p, pText, 28);
                habTyper();
            }
        });
    }
    // })
    // ();


    const homeScrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1 // Links animation to scrollbar
        }
    });

    homeScrollTl.to("#home article.hero", {
        y: -200,
        opacity: 0,
        ease: "none"
    }, 0);

    homeScrollTl.to(["#home canvas", "#home .focus"], {
        opacity: 0,
        filter: "blur(10px)",
        ease: "none"
    }, 0);

    // Setup initial state
    gsap.set("#slideIcon", {
        scale: 0,
        transformOrigin: "center center"
    });

    const iconTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#iconGroup",
            start: "top 90%", // Starts when icon enters view
            toggleActions: "play none none reverse"
        }
    });

    iconTl.from("#iconGroup", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    })
        .to("#circleShape", {
            scale: 0,
            duration: 0.4,
            ease: "back.in(1.7)",
            transformOrigin: "center center"
        }, "-=0.2")
        .to("#slideIcon", {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        }, "<");

    const figures = document.querySelectorAll("section#kicad figure");

    figures.forEach((fig, i) => {
        const viewer = fig.querySelector(".viewer3d");
        const caption = fig.querySelector("figcaption");
        const isReverse = i % 2 !== 0; // Check if it's an even child (index 1, 3, etc)

        // 1. Define Direction vectors
        // If normal: Viewer goes Left (-), Caption goes Right (+)
        // If reverse: Viewer goes Right (+), Caption goes Left (-)
        // We start FROM the center (opposite of where they end up)

        const viewerStartX = isReverse ? "-50%" : "50%"; // Viewer starts at center
        const captionStartX = isReverse ? "50%" : "-50%"; // Caption starts at center

        // 2. Create a Timeline for precise sequencing
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: fig,
                start: "top 75%", // begin when figure top is near bottom of viewport
                end: "top 35%",   // finish before the viewport center (50%) — creates a gap
                scrub: 1, // Smooth scrubbing linked to scrollbar
                toggleActions: "play reverse play reverse"
            }
        });

        // 3. Animate Viewer
        tl.fromTo(viewer,
            {
                x: viewerStartX,
                opacity: .5,
                scale: 0.5, // Start small
                filter: "blur(10px)"
            },
            {
                x: "0%", // Slide out to natural position
                opacity: 1,
                scale: 1.1, // Grow slightly larger than natural to "stand out"
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out"
            },
            0 // Start time
        );

        // 4. Animate Caption
        tl.fromTo(caption,
            {
                x: captionStartX,
                opacity: 0,
                scale: 0.8
            },
            {
                x: "0%",
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out"
            },
            0 // Sync with viewer
        );

        // Fade out the whole figure as it approaches the top of the viewport
        gsap.to(fig, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: fig,
                start: 'top -10%',
                end: 'top -50%',
                scrub: 1
            }
        });
    });

    gsap.fromTo(".code-title",
        {
            autoAlpha: 0,
            y: 0,
            filter: "blur(0px)"
        },
        {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#github",
                start: "top 70%", // Trigger when title is near bottom of viewport
                toggleActions: "play none none reverse"
            }
        }
    );

    // Title Exit: Slide Up + Blur + Fade Out (triggered by scroll)
    gsap.to(".code-title", {
        scrollTrigger: {
            trigger: ".code-title",
            start: "top top",
            end: "bottom top 45%",
            toggleActions: "play none none reverse",
            scrub: 1
        },
        y: -100,                  // Move UP
        // duration:1,
        // autoAlpha: 0,            // Fade Out
        filter: "blur(10px)",    // Blur
        ease: "none"
    });

});


fetchGitHub();