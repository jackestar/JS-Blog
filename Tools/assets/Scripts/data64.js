let a = document.querySelector('.res'),
	b = document.querySelector('#ins'),
	c = document.querySelector('.txt p'),
	d = document.querySelector('.title h1'),
	e = document.querySelector('.grf');

// obtener cache...

let x = {
	xa: true, // svg
	to64: true,
	re () {
		this.xa = document.querySelector('#ins').value.includes("<svg")}
}

let gen = () => {
	x.re();
	let q;
	if (x.to64) {

		if ( x.xa ) {
			q = 'data:image/svg+xml;base64,' + window.btoa(b.value);
			e.innerHTML = `<img src="${c.innerHTML = q}">`;
			e.style.display = "block";
		} else {
			q = window.btoa(b.value);
			e.style.display = "none";
		}

	} else {
		if (x.xa) 	q = window.atob(b.value.slice(b.value.indexOf("base64,")+7));
		else  		q = window.atob(b.value);
	}

	c.innerHTML = q;

	if (b.value != "") {
		a.style.display = "flex";
	}
	else a.style.display = "none";
}

let chg = () => {
	if (x.to64) {
		x.to64 = false;
		d.innerHTML = 'Decodificador de Data64<i onclick="chg()"></i>';
		b.placeholder = "Inserte Codigo";
	} else {
		x.to64 = true;
		d.innerHTML = 'Conversor a Data64<i onclick="chg()"></i>';
		b.placeholder = "Inserte Texto";
	}
	b.value =  "";
	a.style.display = "none";
	e.style.display = "none";
}

// check Box

document.querySelectorAll(".bx ul li").forEach(q => { 
	q.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 520 520" fill="context-fill" stroke="#444" stroke-width="5" fill-opacity="0"><circle cx="256" cy="256" r="250"/><circle id="a" cx="256" cy="256" r="250" stroke-width="0"/><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>' + a.innerHTML;
	q.querySelector("svg").addEventListener("click", w => w.classList.toggle(".clc") )
})