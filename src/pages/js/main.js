import PCBTraceAnimation from 'pcb-trace-animation';

import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);
let CONFIG;

const Typer = {

    type: (el, text, speed = 60) => {
        return new Promise(resolve => {
            if (!el) return resolve();
            el.textContent = "";
            let i = 0;
            const t = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(t);
                    resolve();
                }
            }, speed);
        });
    },

    startLoop: (container, list, cfg = {}) => {
        if (!container || !list.length) return;

        container.innerHTML = '<span class="typer-text"></span><span class="cursor"></span>';
        const textSpan = container.querySelector('.typer-text');

        const settings = { typeSpeed: 60, deleteSpeed: 30, pause: 1200, ...cfg };
        let idx = 0, char = 0, deleting = false;

        const tick = () => {
            const currentWord = list[idx];

            if (!deleting) {
                char++;
                textSpan.textContent = currentWord.slice(0, char);
                if (char === currentWord.length) {
                    deleting = true;
                    setTimeout(tick, settings.pause);
                    return;
                }
            } else {
                char--;
                textSpan.textContent = currentWord.slice(0, char);
                if (char === 0) {
                    deleting = false;
                    idx = (idx + 1) % list.length;
                    setTimeout(tick, 300);
                    return;
                }
            }
            setTimeout(tick, deleting ? settings.deleteSpeed : settings.typeSpeed);
        };
        tick();
    }
};

const PCB = {
    init: () => {
        const canvas = document.getElementById('pcbAnimation');
        if (!canvas) return;

        const pcb = new PCBTraceAnimation(canvas, {
            color: CONFIG.accentColor,
            lineWidth: 3,
            speed: 3,
            lineSpacing: 5
        });

        const fitCanvas = () => pcb.initCanvas();
        window.addEventListener('resize', fitCanvas);
        fitCanvas();

        pcb.drawLine(.35, .75, .30, true, false);
        pcb.drawLine(.35, .25, .30, true, true);
        pcb.drawLine(.65, .25, .50, false, false);
        pcb.drawLine(.35, .25, .50, false, true);

        pcb.start();
    }
};

const Hero = {
    init: () => {
        const hero = document.querySelector("#home article.hero");
        if (!hero) return;

        const h1 = hero.querySelector('h1');
        const p = hero.querySelector('p');
        const typer = hero.querySelector('.typer');

        const h1Text = h1?.dataset.text || h1?.textContent.trim() || '';
        const pText = p?.dataset.text || p?.textContent.trim() || '';
        const typerList = typer?.dataset.text.split(',')

        const isScrolled = window.scrollY > 100;

        if (h1) h1.textContent = isScrolled ? h1Text : '';
        if (p) p.textContent = isScrolled ? pText : '';

        if (isScrolled) {
            gsap.set(hero, { scale: 1, opacity: 1 });
            Typer.startLoop(typer, typerList, { pause: 1100 });
        } else {
            gsap.set(hero, { scale: 0, opacity: 0 });

            gsap.to(hero, {
                duration: 0.9,
                scale: 1,
                opacity: 1,
                ease: 'back.out(1.7)',
                onComplete: async () => {
                    await Typer.type(h1, h1Text, 70);
                    await new Promise(r => setTimeout(r, 180));
                    await Typer.type(p, pText, 28);
                    Typer.startLoop(typer, typerList, { pause: 1100 });
                }
            });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        tl.to(hero, { y: -200, opacity: 0, ease: "none" }, 0)
            .to(["#home canvas", "#home .focus"], { opacity: 0, filter: "blur(10px)", ease: "none" }, 0);
    }
};

const GitHub = {
    animateTitle: () => {
        const brackets = document.querySelectorAll('.code-title .bracket');
        if (brackets.length < 2) return;

        const pairs = [
            ['{', '}'], ['[', ']'], ['<', '/>'], ['(', ')'],
            ['/*', '*/'], ['//', ''], ['<!--', '-->'], ['${', '}']
        ];

        setInterval(() => {
            const [left, right] = pairs[Math.floor(Math.random() * pairs.length)];
            brackets[0].textContent = left;
            brackets[1].textContent = right;
            brackets.forEach(b => b.style.opacity = Math.random() > 0.8 ? '0.75' : '1');
        }, 1500);

        gsap.fromTo(".code-title",
            { autoAlpha: 0, filter: "blur(0px)" },
            {
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: "#github", start: "top 70%" }
            }
        );

        gsap.to(".code-title", {
            y: -100,
            filter: "blur(10px)",
            ease: "none",
            scrollTrigger: {
                trigger: ".code-title",
                start: "top top",
                end: "bottom top 45%",
                scrub: 1
            }
        });
    },

    renderCards: (data, container) => {
        data.forEach(repo => {
            const card = document.createElement('a');
            card.className = 'repo-card';
            card.href = `https://github.com/${CONFIG.gitHubUsername}/${repo.name}`;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

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
    },

    animateCards: () => {
        ScrollTrigger.refresh();
        ScrollTrigger.batch(".repo-card", {
            start: "top 90%",
            scrub: 1,
            onEnter: batch => {
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",

                });
            },
            onLeaveBack: batch => gsap.to(batch, { y: 10, autoAlpha: 0, overwrite: false })
        });


        gsap.utils.toArray(".repo-card").forEach(card => {
            gsap.to(card, {
                scale: 1.1,
                filter: "blur(10px)",
                opacity: .1,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top",
                    end: "top -10%",
                    scrub: 1
                }
            });
        });
    },

    init: async () => {
        GitHub.animateTitle();
        const githubSection = document.querySelector("#github")

        const container = githubSection.querySelector('.cards');
        if (!container) return;

        const info = githubSection.querySelector('.info');

        try {
            const response = await fetch(`${CONFIG.endpoints.pinnedRepos}${CONFIG.gitHubUsername}`);
            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) throw new Error("No pinned repos found");

            // message.remove();
            info.style.display = 'none'
            GitHub.renderCards(data, container);
            GitHub.animateCards();

        } catch (err) {
            let data = info.dataset.text.split(',')
            console.error(err);info.dataset.text
            info.innerHTML = `
                <br/>${data[0]}
                <a href="https://github.com/${CONFIG.gitHubUsername}" target="_blank" style="color: var(--secondary); text-decoration: underline;">
                    ${data[1]}
                </a>`;
        }
    }
};

const KiCad = {
    init: () => {

        gsap.set("#slideIcon", { scale: 0, transformOrigin: "center center" });

        const iconTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#iconGroup",
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });

        iconTl.from("#iconGroup", { x: 100, opacity: 0, duration: 0.8, ease: "power2.out" })
            .to("#circleShape", { scale: 0, duration: 0.4, ease: "back.in(1.7)", transformOrigin: "center center" }, "-=0.2")
            .to("#slideIcon", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "<");


        const figures = document.querySelectorAll("section#kicad figure");

        figures.forEach((fig, i) => {
            const viewer = fig.querySelector(".viewer3d");
            const caption = fig.querySelector("figcaption");
            const isReverse = i % 2 !== 0;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: fig,
                    start: "top 75%",
                    end: "top 35%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            });


            tl.fromTo(viewer,
                { x: isReverse ? "-50%" : "50%", opacity: 0.5, scale: 0.5, filter: "blur(10px)" },
                { x: "0%", opacity: 1, scale: 1.1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
                0
            );

            tl.fromTo(caption,
                { x: isReverse ? "50%" : "-50%", opacity: 0, scale: 0.8 },
                { x: "0%", opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
                0
            );

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
    }
};

const Skills = {
    getCompoundPath: (group) => {
        if (!group) return "";
        let paths = group.querySelectorAll('path');
        let compoundD = "";

        paths.forEach(p => {


            const d = p.getAttribute('d');
            if (d && !d.includes('M0 0h24v24H0z')) {
                compoundD += d + " ";
            }
        });
        return compoundD.trim();
    },
    init: () => {
        document.querySelectorAll('.skills-grid figure').forEach((card) => {
            const iconContainer = card.querySelector('.icon');
            const svg = iconContainer.querySelector('svg');
            const groups = svg.querySelectorAll('g');

            if (groups.length === 0) return;

            const morpher = document.createElementNS("http://www.w3.org/2000/svg", "path");
            morpher.classList.add('morph-active');

            const firstGroup = groups[0];
            const initialD = Skills.getCompoundPath(firstGroup);

            morpher.setAttribute('d', initialD);
            morpher.setAttribute('stroke', firstGroup.getAttribute('stroke') || 'currentColor');
            morpher.setAttribute('stroke-width', firstGroup.getAttribute('stroke-width') || '2');
            morpher.setAttribute('stroke-linecap', 'round');
            morpher.setAttribute('stroke-linejoin', 'round');
            morpher.setAttribute('fill', 'none');

            svg.appendChild(morpher);

            const pathStates = [];
            groups.forEach(g => pathStates.push(Skills.getCompoundPath(g)));

            if (pathStates.length < 2) return;

            let hovertl;

            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            for (let i = 1; i < pathStates.length; i++) {
                scrollTl.to(morpher, {
                    morphSVG: pathStates[i],
                    duration: 0.6,
                    ease: "power2.inOut"
                });
            }

            scrollTl.to(morpher, {
                morphSVG: pathStates[0],
                duration: 0.6,
                ease: "power2.inOut"
            });

            card.addEventListener('mouseenter', () => {


                if (scrollTl.isActive()) scrollTl.pause();

                hovertl = gsap.timeline();


                pathStates.forEach((state) => {

                    hovertl.to(morpher, {
                        morphSVG: state,
                        duration: 0.5,
                        ease: "power1.inOut"
                    }, "+=0.1");
                });
            });

            card.addEventListener('mouseleave', () => {
                if (hovertl) {
                    hovertl.kill();

                    gsap.to(morpher, {
                        morphSVG: pathStates[0],
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        });
        Skills.animateTitle();
        Skills.animateCards()
    },
    animateTitle: () => {


        gsap.fromTo(".hab-title",
            { autoAlpha: 0, filter: "blur(0px)" },
            {
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: "#hab", start: "top 80%" }
            }
        );


        gsap.to(".hab-title", {
            y: -100,
            filter: "blur(10px)",
            ease: "none",
            scrollTrigger: {
                trigger: ".hab-title",
                start: "top top",
                end: "bottom top 45%",
                scrub: 1
            }
        });
    },
    animateCards: () => {


        ScrollTrigger.batch("#hab figure", {
            start: "top 90%",
            scrub: 1,
            onEnter: batch => {
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",

                });
            },
            onLeaveBack: batch => gsap.to(batch, { y: 10, autoAlpha: 0, overwrite: false })
        });


        gsap.utils.toArray("#hab figure").forEach(card => {
            gsap.to(card, {
                scale: 1.1,
                filter: "blur(10px)",
                opacity: .1,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top",
                    end: "bottom",
                    scrub: 1
                }
            });
        });

        const habFigures = gsap.utils.toArray("#hab .skills-grid figure");
        habFigures.forEach((fig) => {
            const icon = fig.querySelector('.icon');
            const caption = fig.querySelector('figcaption');
            const tags = fig.querySelector('.tags');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: fig,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            });

            tl.fromTo(fig,
                { autoAlpha: 0, y: 40, scale: 0.98 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
            );

            tl.from(icon, { y: -6, scale: 0.9, autoAlpha: 0, duration: 0.5, ease: "back.out(1.2)" }, "<0.1");
            tl.from(caption, { y: 8, autoAlpha: 0, duration: 0.45, ease: "power2.out" }, "<0.1");
            tl.from(tags.querySelectorAll('span'), { y: 6, autoAlpha: 0, stagger: 0.06, duration: 0.33 }, "-=" + 0.25);
        });
    },
}

const Blog = {
    init: () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#blog",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            }
        });

        tl.from("#blog article", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });


        tl.from("#blog .card", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5");
    }
}

export const initMain = () => {
    if (typeof window !== 'undefined') {
        CONFIG = {
            accentColor: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00ff9d',
            gitHubUsername: 'jackestar',
            endpoints: {
                pinnedRepos: 'https://pinned.berrysauce.dev/get/'
            }
        };

        document.addEventListener("DOMContentLoaded", () => {

            PCB.init();
            Hero.init();
            KiCad.init();
            GitHub.init();
            Skills.init();
            Blog.init();
        });

    }
}