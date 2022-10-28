//Presicion
let toPres = 3

//Matriz de Array Columnas x fila
// Entrada
let matriz = Array();
let conte = Array();

let ySum = 0
let yPro = 0

let xSumt = 0
let xProt = 0

let xySum = 0
let xyPro = 0

let xxSum = 0
let xxPro = 0

let mEst = 0
let bEst = 0


// Default
let colum = 6;
let fila = 3;

let clean = () => {
ySum = 0
yPro = 0
xSumt = 0
xProt = 0
xySum = 0
xyPro = 0
xxSum = 0
xxPro = 0
mEst = 0
bEst = 0

matriz = Array();
conte = Array();
}

let inpt = document.querySelectorAll('header input');

let calk = {
	// obj: tab,
	col: colum,
	fil: fila,

	tdi: `<td><input type="number" placeholder="Inserte numero"></td>`,
	td: `<td></td>`,

	tri: '',
	tr: '',

	mk() {
		this.col = inpt[0].value/1;
		this.fil = inpt[1].value/1;

		let ret = ''
		for (var i = 0; i < (this.col); i++) ret += this.tdi
		this.tri = `<tr>${ret + this.td + this.td}</tr>`

		ret = ''
		for (var i = 0; i < (this.col+2); i++) ret += this.td
		this.tr = `<tr>${ret}</tr>`

		ret = this.tri;
		if (this.fil > 1) {
			for (var i = 0; i < this.fil; i++) ret += this.tri;
			ret += this.tr
		} else ret += this.tri
		return ret + this.tr + this.tr
	},
	mk2() {
		let ret = '<tr><td>Y</td></tr>'
		if (this.fil > 1) for (var i = 1; i <= this.fil; i++) ret += `<tr><td>X${i}</td></tr>`
		ret += "<tr><td>X</td></tr>"
		return ret + "<tr><td>XY</td></tr><tr><td>X*X</td></tr>"
	},
	gen() {
		clean();
		document.querySelector('.tab table.tx').innerHTML = this.mk()
		document.querySelector('.tab table.vl').innerHTML = this.mk2()
		document.querySelectorAll('.tab table.tx td').forEach(a=> a.style.minWidth = `${85/(this.col+2)}%`)
		document.querySelector('.tab').innerHTML += '<div class="al"><a href="#" onclick="gen()">Calcular</a></div>'
	}

}


let gen = () => {
	clean()
	// Matriz de INtroduccion
	matriz = Array(calk.fil)
	for (var i = 0; i < (calk.fil+1); i++) {
		matriz[i] = document.querySelectorAll(`.tab table.tx tr:nth-child(${i+1}) input`)
	}

	// Matriz completa

	//rev
	let aer = 2
	if (calk.fil > 1) aer = 3

	conte = Array(calk.fil+2)
		for (var i = 0; i < (calk.fil+aer+1); i++) {
			conte[i] = document.querySelectorAll(`.tab table.tx tr:nth-child(${i+1}) td`)
	}

	// Sumatoria Prom Y
	matriz[0].forEach( a => ySum += a.value/1)
	yPro = ySum/calk.col

	conte[0][calk.col].innerHTML = ySum.toFixed(toPres)
	conte[0][calk.col+1].innerHTML = yPro.toFixed(toPres)

	if (calk.fil > 1) {
		let tempSum = 0
		for (var e = 0; e < calk.col; e++) {
			tempSum = 0
			for (var i = 1; i <= calk.fil; i++) tempSum += matriz[i][e].value/1
			conte[calk.fil+1][e].innerHTML = (tempSum/calk.fil).toFixed(toPres)
			conte[calk.fil+2][e].innerHTML = ((tempSum/calk.fil)*(matriz[0][e].value/1)).toFixed(toPres)
			conte[calk.fil+3][e].innerHTML = Math.pow((tempSum/calk.fil),2).toFixed(toPres)

		}

		// X Promedio
		conte[calk.fil+1].forEach( a => xSumt += a.innerHTML/1)
		xProt = xSumt/calk.col;
		conte[calk.fil+1][calk.col].innerHTML = xSumt.toFixed(toPres);
		conte[calk.fil+1][calk.col+1].innerHTML = xProt.toFixed(toPres)


		// XY Promedio
		conte[calk.fil+2].forEach( a => xySum += a.innerHTML/1)
		xyPro = xySum/calk.col;
		conte[calk.fil+2][calk.col].innerHTML = xySum.toFixed(toPres)
		conte[calk.fil+2][calk.col+1].innerHTML = xyPro.toFixed(toPres)
		

		// XX Promedio
		conte[calk.fil+3].forEach( a => xxSum += a.innerHTML/1)
		xxPro = xxSum/calk.col;
		conte[calk.fil+3][calk.col].innerHTML = xxSum.toFixed(toPres)
		conte[calk.fil+3][calk.col+1].innerHTML = xxPro.toFixed(toPres)

	} else {
			matriz[1].forEach( a => xSumt += a.value/1)
			xProt = xSumt/calk.col

			conte[1][calk.col].innerHTML = xSumt
			conte[1][calk.col+1].innerHTML = xProt
	}

	mEst = (xyPro-(xProt*yPro)) / (xxPro-Math.pow(xProt,2))
	bEst = ((yPro*xxPro) - (xProt*xyPro))/(xxPro-Math.pow(xProt,2))

	document.querySelector('.eq').innerHTML = `<p>Mest = ${mEst}
	Best = ${bEst}
	</p><p>P1(0,${bEst})</p>`

}
