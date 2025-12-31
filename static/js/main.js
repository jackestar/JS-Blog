//  PCB

const canvas = document.getElementById('pcbAnimation');
const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00ff9d';
const pcb = new PCBTraceAnimation(canvas, {
    color: accent,
    lineWidth: 3,
    speed: 3,
    lineSpacing: 5
});

function fitCanvas() {
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

async function fetchGitHub() {
    const container = document.getElementById('github');
    const username = 'jackestar';

    try {
        // Using gh-pinned-repos API
        const response = await fetch(`https://pinned.berrysauce.dev/get/${username}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) throw new Error("No pinned repos found");

        container.innerHTML = ''; // Clear loading text

        data.forEach(repo => {
            const card = document.createElement('a');
            card.className = 'repo-card gsap-reveal';
            card.href = repo.link;
            card.target = "_blank";

            card.innerHTML = `
                        <div>
                            <div class="repo-name">${repo.name || "Repo"}</div>
                            <div class="repo-desc">${repo.description || 'No description provided.'}</div>
                        </div>
                        <div class="repo-stats">
                            <span><span class="circle" style="background-color: ${repo.languageColor || '#fff'}"></span>${repo.language}</span>
                        </div>
                    `;
            container.appendChild(card);
        });

        // Refresh ScrollTrigger for new elements
        // ScrollTrigger.refresh();

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p style="color:var(--text-muted)">Could not load pinned repos. <a href="https://github.com/${username}" style="color:var(--accent)">Visit GitHub profile</a>.</p>`;
    }
}
fetchGitHub();

// GSAP

document.addEventListener("DOMContentLoaded", (event) => {

    gsap.registerPlugin(ScrollTrigger);

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


    // ==============================================
    // 2. Your Icon Animation (Preserved)
    // ==============================================

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
});