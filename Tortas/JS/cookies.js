  // Obtener Fecha
	//Codificcciones diferentes
// Obtener Precio del dolar hoy
	// Alertar diferencia de precion de mas de 24h
	// Insertar en cache Precio del dolar + fecha

// Obtener Cache +Nuevas entradas etc
// Crear nuevas entradas
// Reset


// -------------- Cookies --------------
// Modo Dark
// Precio del dolar (Actual/UltimoGuardado)
// Fecha del ultimo dolar
// Fecha actual
// Se Actualizo el precio el precio del dolar?
/*

	Dark
	Dolar
	DolarD
	DolarOut //Tiempo Limite del Valor
	DolarNot //Desactualizado //Sesion

*/
const da = new Date();
const DolarLimit = 86400000; //1 Dia
const ctime = new Date(da.getFullYear()+1,da.getMonth(),da.getDate()).toUTCString(); // Duracion de las cookies
const cEnd = `;expires=${ctime};path=/;secure;samesite=strict`

let cok = {
	g:[],
	upd() {
		const q = document.cookie.split(';');
		this.g.length = 3;
		q.find( (tmp,no) => {
		if (tmp.includes('Dark')) this.g[0] = tmp.slice(tmp.indexOf('=')+1)*1
		if (tmp.includes('Dolar')) this.g[1] = tmp.slice(tmp.indexOf('=')+1)*1
		if (tmp.includes('DolarD')) this.g[2] = tmp.slice(tmp.indexOf('=')+1)*1
		if (tmp.includes('DolarOut')) this.g[3] = tmp.slice(tmp.indexOf('=')+1)*1
  // console.log(`${tmp}\n${no}\n${tmp.slice(tmp.indexOf('=')+1)}`)
})
	},
	set(num,value = 0) {
		if (num==0) document.cookie = `Dark=${value}${cEnd}`;
		else if (num==1) document.cookie = `Dolar=${value}${cEnd}`;
		else if (num==2) document.cookie = `DolarD=${new Date().valueOf()}${cEnd}`;
		else if (num==3) document.cookie = `DolarOut=${value}${cEnd}`;
		this.upd();
	},
	Adjust() {
	//Modo Dark
		if (!document.cookie.search("Dark=")) document.cookie = `Dark=0;expires=${ctime};path=/;secure`;

	//Limite del Dolar
		if (!document.cookie.search("DolarOut=")) document.cookie = `DolarOut=${DolarLimit};expires=${ctime};path=/;secure`;
	},
	reset(num) {
		if (num==0) document.cookie = `Dark=0;expires=0`;
		if (num==1) document.cookie = `Dolar=0;expires=0`;
		if (num==2) document.cookie = `DolarD=0;expires=0`;
		if (num==3) document.cookie = `DolarOut=0;expires=0`;
	}
}
