// Cookies Set

cok.upd();
cok.Adjust();

// Animaciones globales etc

// Cursor Efecto Paralax con BoxShadow

/*let loc = {
    a: document.querySelector('h1'),
    size: 1, // em
    col:'#234'
}*/
// o = estrucutra (a,size,col), l = lienzo
const paralax = (o,l = document.body) => {
 l.addEventListener('mousemove', (pos) => {
    let x = o.size*((2*pos.clientX)-l.clientWidth)/l.clientWidth;
    let y = o.size*((2*pos.clientY)-l.clientHeight)/l.clientHeight;
    setTimeout(() => {
        o.a.style.boxShadow = `${x.toFixed(3)}em ${y.toFixed(3)}em ${o.col}`;
    }, 50);
 })
}