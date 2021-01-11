let a = false,b = false, c = false, s = true;

function clean() {
	if (a) document.querySelector('.sub').firstElementChild.classList.toggle('win');
	if (b) document.querySelector('.sub').children[1].classList.toggle('lin');
	if (c) document.querySelector('.sub').lastElementChild.classList.toggle('src');
	a = false; b = false; c = false;
	setTimeout(()=> {scrollTo(0,scrollMaxY)},1000)
}

document.querySelector('p.a').addEventListener('click', () => {
	document.querySelector('.sub').firstElementChild.classList.toggle('win');
	clean();
	a = true;
});

document.querySelector('p.b').addEventListener('click', () => {
	document.querySelector('.sub').children[1].classList.toggle('lin');
	clean();
	b = true;
});

document.querySelector('p.c').addEventListener('click', () => {
	document.querySelector('.sub').lastElementChild.classList.toggle('src');
	clean();
	c = true;
});

document.querySelector('p.s').addEventListener('click', () => {
	if (s === true) {
	document.querySelector('.sel').classList.toggle('act');
	s = !s}
	scrollTo(0,scrollMaxY);
});

let AName = navigator["platform"], Ahref = '#',ark = navigator["oscpu"];
let ANameA = ['Windows 64bits','Windows 32bits','Linux 32','Linux 64','MacOSX 64','MacOSX 32','Debian 32','Debian 64','Android'];
let AhrefA = ['#Win64','#Win32'];
let dsp = false;

if (ark.includes('Win64')) {
	AName = ANameA[0];
	Ahref = AhrefA[0];
	dsp = true;
	}
else if (ark.includes('Win32')) {
	AName = ANameA[1];
	Ahref = AhrefA[1];
	dsp = true;
	}
else if (ark.includes('Win7') && ark.includes('x64')) {
	AName = ANameA[0];
	dsp = true;
	}
else if (ark.includes('Win7') && (ark.includes('x32') || ark.includes('86'))) {
	AName = ANameA[1];
	dsp = true;
	}
else if ((ark.includes('Linux') || (AName.includes('Linux')) && ark.includes('x64'))) {
	AName = ANameA[3];
	dsp = false;
	}
else if ((ark.includes('Linux') || (AName.includes('Linux')) && (ark.includes('x32') || ark.includes('86')))) {
	AName = ANameA[2];
	dsp = false;
	}
else if (ark.includes('Android')) {
	AName = ANameA[8];
	dsp = false;
	}
else {
	if (ark.includes('WinXP') || ark.includes('WinVista')) AName = 'Windows Obsoleto';
	else AName = 'Desconocido';
	document.querySelector('p.s').click()
}

//Color
if (ark.includes('Win')) document.querySelector('.at').classList.toggle('a');

document.querySelector('.at').innerHTML = AName;
document.querySelector('.at').setAttribute('href',Ahref);

if (!dsp) {
	document.querySelector('i.q').innerHTML = 'Actualmente no disponible';
	document.querySelector('.at').classList.toggle('u')
}

navigator["platform"].includes('Win64'); // "Win32" "Linux" "MacOSX" "Win7" "Android" "Unix" "Debian" //Obsoletes "WinXP" "WinVista"
