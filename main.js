const red = document.querySelectorAll('.w');
const blu = document.querySelectorAll('.card');
const med = document.querySelector('.med');
const tm = blu.length;
let states = true;
let condit = new Array(tm);
condit.fill(true);

	document.addEventListener('scroll', () => {
		if ((med.offsetTop <= (scrollY+innerHeight)) && states) {
			red.forEach(tmp => {
				tmp.classList.toggle('z');
				med.classList.toggle('y');
			});
		states = false;
		}
		for (let i = tm - 1; i >= 0; i--) {
			if ((blu[i].offsetTop <= (scrollY+innerHeight)) && condit[i]) {
			blu[i].classList.toggle('i');
			condit[i] = false;
			}
		}
	});