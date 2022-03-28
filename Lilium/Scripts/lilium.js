let a = document.querySelector('div.dimgs');
let b = document.querySelectorAll('img');
let c = document.querySelectorAll('.laq');
let c1 = document.querySelector('.laq.rs');

a.addEventListener('mouseover', e => {
    b.forEach(q => {
        q.classList.remove('ex')
    })
    e.target.classList.add('ex')
    if (e.target.childElementCount == 0) a.classList.add('hov')
    else a.classList.remove('hov');
})
document.querySelector('header *:not(div.dimgs)').addEventListener('mouseover', () => {
    a.classList.remove('hov');
});

c1.addEventListener('click',a => {
    c.forEach( d => {
        d.classList.add('dis');
        setTimeout(a=>d.classList.remove('h'),500);
    });
});

// Carga
let apear;
    // Evento de Scroll
const apev = () => {
    document.addEventListener('scroll', t => { // + e.clientHeight*.25
    scrollC()
    })
};

    // Carga del Documento
const StateL = () => {
    apear = document.querySelectorAll('.ap');
    document.body.classList.add("lod");
    setTimeout(t => {
        apev();
        scrollC();
    },200);
}

    // Scroll
const scrollC = () => apear.forEach( e => {if (e.offsetTop*.8 <= scrollY) e.classList.add('re')});

const des = () => c.forEach(a => {a.classList.add('h');a.classList.remove('dis');});
if (document.URL.includes("#Descargas")) des()