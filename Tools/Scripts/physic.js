//Cookies - Config
//Presicion
let presSw = 3
let presCl = 3
//
let Cerror = true

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

	presSw = document.querySelector('.presS').value
	presCl = document.querySelector('.presC').value

	matriz = Array();
	conte = Array();
}

let inpt = document.querySelectorAll('header input');
let cfg = document.querySelectorAll('.confg input')

let calk = {
	col: colum,
	fil: fila,

	tdi: `<td><input type="number" placeholder="Inserte numero"></td>`,
	td: `<td></td>`,

	tri: '',
	tr: '',

	mk() {
		this.col = inpt[0].value / 1;
		this.fil = inpt[1].value / 1;
		presCl = cfg[0].value / 1;
		presSw = cfg[1].value / 1;

		let ret = ''
		for (var i = 0; i < (this.col); i++) ret += this.tdi
		this.tri = `<tr>${ret + this.td + this.td}</tr>`

		ret = ''
		for (var i = 0; i < (this.col + 2); i++) ret += this.td
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
		if (this.fil > 1) for (var i = 1; i <= this.fil; i++) ret += `<tr><td>X<sub>${i}</sub></td></tr>`
		ret += "<tr><td>X</td></tr>"
		return ret + "<tr><td>X·Y</td></tr><tr><td>X·X</td></tr>"
	},

	gen() {
		clean();
		document.querySelector('.tab table.tx').innerHTML = this.mk()
		document.querySelector('.tab table.vl').innerHTML = this.mk2()
		// document.querySelectorAll('.tab table.tx td').forEach(a=> a.style.minWidth = `${85/(this.col+2)}%`)
		document.querySelector('.tab .al').innerHTML = '<a href="#" onclick="calk.cal()">Calcular</a><input class="xt" type="number" placeholder="X₂ (P₂)"><input class="mexp" type="number" placeholder="Mexp">'
	},

	cal() {
		clean()
		// Matriz de Datos
		matriz = Array(calk.fil > 1 ? calk.fil + 2 : 1) // La Matriz Extra Para X
		for (var i = 0; i < (calk.fil + 2); i++) {
			matriz[i] = (i < calk.fil + 1) ? document.querySelectorAll(`.tab table.tx tr:nth-child(${i + 1}) input`) : document.querySelectorAll(`.tab table.tx tr:nth-child(${i + 1}) td`)
		}

		//Tabla de Datos
		conte = Array(this.fil + 2)
		for (var i = 0; i < (this.fil > 1 ? this.fil + 4 : 4); i++) {
			conte[i] = document.querySelectorAll(`.tab table.tx tr:nth-child(${i + 1}) td`)
		}

		// Sumatoria Prom Y
		matriz[0].forEach(a => ySum += a.value / 1)
		yPro = ySum / this.col

		conte[0][this.col].innerHTML = ySum.toFixed(presSw) / 1
		conte[0][this.col + 1].innerHTML = yPro.toFixed(presSw) / 1

		// Variables de Sumatorias
		let tempX = 0
		let tempXY = 0
		let tempXX = 0

		// Caso Multiples Filas
		if (this.fil > 1) {
			let tempSum = 0
			for (var e = 0; e < this.col; e++) {
				tempSum = 0
				for (var i = 1; i <= this.fil; i++) tempSum += (matriz[i][e].value / 1)
				matriz[this.fil + 1][e].innerHTML = (tempSum / this.fil).toFixed(presCl) / 1

				tempX = matriz[this.fil + 1][e].innerHTML / 1
				tempX = tempX.toFixed(presCl) / 1
				xSumt += tempX
				conte[this.fil + 1][e].innerHTML = tempX

				tempXY = ((tempX) * (matriz[0][e].value / 1)).toFixed(presCl) / 1
				xySum += tempXY
				conte[this.fil + 2][e].innerHTML = tempXY

				tempXX = (tempX ** 2).toFixed(presCl) / 1
				xxSum += tempXX
				conte[this.fil + 3][e].innerHTML = tempXX
			}

			// X Promedio
			xProt = (xSumt / this.col).toFixed(presCl) / 1;
			conte[this.fil + 1][this.col].innerHTML = xSumt.toFixed(presSw) / 1
			conte[this.fil + 1][this.col + 1].innerHTML = xProt.toFixed(presSw) / 1

			// XY Promedio
			xyPro = (xySum / this.col).toFixed(presCl) / 1;
			conte[this.fil + 2][this.col].innerHTML = xySum.toFixed(presSw) / 1
			conte[this.fil + 2][this.col + 1].innerHTML = xyPro.toFixed(presSw) / 1

			// XX Promedio
			xxPro = (xxSum / this.col).toFixed(presCl) / 1;
			conte[this.fil + 3][this.col].innerHTML = xxSum.toFixed(presSw) / 1
			conte[this.fil + 3][this.col + 1].innerHTML = xxPro.toFixed(presSw) / 1

			// Una sola Fila
		} else {
			let tempSum = 0
			matriz[1].forEach(a => xSumt += a.value / 1)
			xProt = (xSumt / this.col).toFixed(presCl)/1

			conte[1][this.col].innerHTML = xSumt.toFixed(presSw) / 1
			conte[1][this.col + 1].innerHTML = xProt.toFixed(presSw) / 1

			for (var i = 0; i < this.col; i++) {
				//XY
				tempSum = (matriz[0][i].value / 1) * (matriz[1][i].value / 1);
				conte[2][i].innerHTML = tempSum.toFixed(presSw) / 1
				xySum += tempSum
				tempSum = 0
				//XX
				tempSum = (matriz[1][i].value / 1) ** 2
				conte[3][i].innerHTML = tempSum.toFixed(presSw) / 1
				xxSum += tempSum
			}

			conte[2][this.col].innerHTML = xSumt.toFixed(presSw) / 1
			conte[2][this.col + 1].innerHTML = xProt.toFixed(presSw) / 1

			conte[3][this.col].innerHTML = xSumt.toFixed(presSw) / 1
			conte[3][this.col + 1].innerHTML = xProt.toFixed(presSw) / 1

			// XY Promedio
			xyPro = xySum / this.col;
			conte[2][this.col].innerHTML = xySum.toFixed(presSw) / 1
			conte[2][this.col + 1].innerHTML = xyPro.toFixed(presSw) / 1


			// XX Promedio
			xxPro = xxSum / this.col;
			conte[3][this.col].innerHTML = xxSum.toFixed(presSw) / 1
			conte[3][this.col + 1].innerHTML = xxPro.toFixed(presSw) / 1

		}


		// Recta Estadistica
		mEst = (((xyPro.toFixed(presCl) / 1) - ((xProt.toFixed(presCl) / 1) * (yPro.toFixed(presCl) / 1))) / ((xxPro.toFixed(presCl) / 1) - ((xProt.toFixed(presCl) / 1) ** 2))).toFixed(presCl) / 1
		bEst = ((((yPro.toFixed(presCl) / 1) * (xxPro.toFixed(presCl) / 1)) - ((xProt.toFixed(presCl) / 1) * (xyPro.toFixed(presCl) / 1))) / ((xxPro.toFixed(presCl) / 1) - ((xProt.toFixed(presCl) / 1) ** 2))).toFixed(presCl) / 1
		if ((xxPro - (xProt ** 2)) == 0 ) {
			mEst = Infinity
			bEst = Infinity
		}
		let x2 = document.querySelector('.xt').value/1,
			y2 = x2 * (mEst.toFixed(presCl) / 1) + (bEst.toFixed(presCl) / 1),
			eq = document.querySelector('.eq'),
			meq = document.querySelector('.eqd'),
			beq = document.querySelector('.eqe'),
			shw = document.querySelectorAll('.shw'),
			mrs = document.querySelector('.mrs'),
			brs = document.querySelector('.brs'),
			mexp = document.querySelector('.mexp').value/1,
			ereq = document.querySelector('.eqf'),
			errs = document.querySelector('.errs'),
			erep = document.querySelector('.eqg'),
			errp = document.querySelector('.errp')

		// Opcion
		if (true) shw.forEach( a => a.style.display = 'block');

		eq.innerHTML = `
	<p>M<sub>est</sub> = ${mEst.toFixed(presSw)} 
	B<sub>est</sub> = ${bEst.toFixed(presSw)}</p>

	<p>P<sub>1</sub>(0,${bEst.toFixed(presSw)})</p>
	`

	meq.innerHTML = `
	<div class="eqc"><p>(<b>${xyPro.toFixed(presSw)}</b>) - (<b>${xProt.toFixed(presSw)}</b>*<b>${yPro.toFixed(presSw)}</b>)</p></div>
	<div class="eqc"><p><b>${xxPro.toFixed(presSw)}</b> - (<b>${xProt.toFixed(presSw)}</b>)<sup>2</sup></p></div>`
	mrs.innerHTML = `<p>${mEst.toFixed(presSw)}</p>`

	beq.innerHTML = `
	<div class="eqc"><p>(<b>${yPro.toFixed(presSw)}</b>)*(<b>${xxPro.toFixed(presSw)}</b>) - (<b>${xProt.toFixed(presSw)}</b>*<b>${xyPro.toFixed(presSw)}</b>)</p></div>
	<div class="eqc"><p><b>${xxPro.toFixed(presSw)}</b> - (<b>${xProt.toFixed(presSw)}</b>)<sup>2</sup></p></div>`
	brs.innerHTML = `<p>${bEst.toFixed(presSw)}</p>`

		if (x2 != 0) {
			eq.innerHTML += `
		<p>P<sub>2</sub>(${x2},${y2.toFixed(presSw)})</p>`
		}
		// Calculo de error
	// if (mexp = 0) {
	ereq.innerHTML = `
	<div class="eqc"><p>${mEst.toFixed(presSw)}</sub> - ${mexp.toFixed(presSw)} </p></div>
	<div class="eqc"><p>${mEst.toFixed(presSw)}</p></div>`

	let errorR = (mEst.toFixed(presCl) - mexp)/mEst.toFixed(presCl)
	errs.innerHTML = `<p>${errorR.toFixed(presSw)} </p>`
	erep.innerHTML = `<p>${errorR.toFixed(presSw)} * 100 </p>`
	errp.innerHTML = `<p>${((errorR.toFixed(presCl))*100).toFixed(presSw)}</p>`}
	// }

}