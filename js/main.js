// Generador de degradados

const varGrad = ['main1',
    'main2',
    'second1',
    'second2',
    'backg1',
    'backg2',
    'foreg1',
    'foreg2',
    'gray1',
    'gray3',
    'gray5'],
    paterns = varGrad.length

const grad = () => {
    let q = (Math.random() * paterns).toFixed(0)
    console.log(q)
    return varGrad[q]
}

const gradient = () => {
    let a = grad();
    let b = grad();
    while (a == b) {
        b = grad();
    }
    return `linear-gradient(${(Math.random() * 360).toFixed(0)}deg, var(--${a}) , var(--${b}))`
}

let art = document.querySelectorAll('section>article')
art.forEach(a => {
    a.style.background = gradient()
})

// The images title an decription will be probided by db

art.forEach((a, n) => {
    if (n < 2) {
        a.style.backgroundImage = `url(./img/art${n + 1}.png)`
        a.style.backgroundSize = 'cover'
        a.style.backgroundPosition = 'center'
    }
})

