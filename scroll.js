let scroll = () => {
    const sections = document.querySelectorAll('header, main > section');
    
    let animations = (index) => {
        // Projects
        
        if (sections[index].id == "proyects") {
            // title apear
            sections[index].classList.add('show')
            let pos = 0;
            let glow = () => {
                if (pos<sections[1].querySelectorAll('.elem').length) {
                elem = sections[1].querySelectorAll('.elem')[pos]
                elem.classList.add('glow')
                setTimeout(() => {
                    elem.classList.remove('glow')
                    pos++;
                    glow()
                }, 100);
                }
            }
            setTimeout(()=>glow(), 500);
        }
    }

    let scrollToSection = (index) => {
        window.scrollTo({
            top: sections[index].offsetTop,
            behavior: 'smooth'
        });
    }

    let updateURLHash = (index) => {
        const id = sections[index].id;
        if (id) {
            history.replaceState(null, null, `#${id}`);
            animations(index)
        }
    }

    let getCurrentSectionIndex = () => {
        let index = 0;
        sections.forEach((section, i) => {
            if (document.querySelector('main').scrollTop >= section.offsetTop - (window.innerHeight / 2)) {
                index = i; // for some reason need to evlaute all cases....
            }
        });
        return index;
    }

    let handleScroll = (event) => {
        let currentSection = getCurrentSectionIndex();

        if (event.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection++;
        } else if (event.deltaY < 0 && currentSection > 0) {
            currentSection--;
        }
        // scrollToSection(currentSection);
        updateURLHash(currentSection);
    }

    let handleKeydown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            // event.preventDefault();
            let currentSection = getCurrentSectionIndex();
            if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
                currentSection++;
            } else if (event.key === 'ArrowUp' && currentSection > 0) {
                currentSection--;
            }
            // scrollToSection(currentSection);
            updateURLHash(currentSection);
        }
    }

    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('keydown', handleKeydown);

    window.addEventListener('hashchange', () => {
        const index = Array.from(sections).findIndex(section => `#${section.id}` === location.hash);
        if (index !== -1) {
            scrollToSection(index);
            animations(index)
        }
    });

    window.addEventListener('scroll', () => {
        const currentSection = getCurrentSectionIndex();
        // scrollToSection(currentSection);
        updateURLHash(currentSection);
    });

    const initialIndex = Array.from(sections).findIndex(section => `#${section.id}` === location.hash);
    if (initialIndex !== -1) {
        scrollToSection(initialIndex);
        animations(initialIndex)
    }
}