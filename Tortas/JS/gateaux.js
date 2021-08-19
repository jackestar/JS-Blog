// Configuacion
// No permitir recetas repetidad (Nombre Nro)
// ordenar recetas
// Gestion del color
// Actualizacion manual del dolar
// Limite del precio del dolar


cok.upd();
cok.Adjust();
document.cookie.search("Dark=0")?document.body.classList.add('dark'):0;
const delAct = () => {
	document.querySelectorAll('article.ing .del').forEach(tmp=>{
		tmp.addEventListener('click', () => {
		tmp.parentElement.remove()
		})
	})
}

// Seleccion de elemento activo

const uno = document.querySelectorAll('.uno');

const f = (w,t) => {
		w.classList.toggle('act');
		t.classList.toggle('act');
}
uno.forEach(t=>{
	t.classList.add('act')
	let w = t.parentElement.querySelector('.dos');
	t.addEventListener('click',()=>w.classList.	contains('act')? f(w,t):0);
	w.addEventListener('click',()=>t.classList.	contains('act')? f(w,t):0);
})

// Dolar Banner
document.querySelector('.price').innerHTML = ` ${cok.g[1].toLocaleString().replaceAll(',','.')} BsS`


// AddIngrediente
const Upd =() => {
	//Animacion
	document.querySelectorAll('input').forEach(tmp=>{
		tmp.addEventListener('input', () => {
			if (!tmp.value == "") {
				tmp.classList.add('cont')
				tmp.classList.remove('rel')
			}
			else tmp.classList.remove('cont')
		})
	})
}
Upd();

document.querySelector('article.ing .add').addEventListener('click', () => {
	document.querySelector('.ing>ul').innerHTML += '<li><input type="text" autocomplete="on" name="nombre" placeholder="Nombre"><input type="number" name="cantidad" placeholder="Cantidad"><input autocomplete="on" type="text" name="unidad" placeholder="Unidad"><input type="number" name="precio" placeholder="Precio"><div class="del"><b>x</b></div></li>'
	delAct();
	Upd();
})

// Guardar receta

const saveR = ()=> {
	// Detectar y Animar espacios vacios
	const r = document.querySelectorAll('.newE input');
	let compar = 0;
	r.forEach(tmp=>{
		if (tmp.value == "") tmp.classList.add('rel')
			else {
				tmp.classList.remove('rel')
				compar++;
			}
		setTimeout(()=>{

		},1000)
	})
	if (compar == r.length){
		document.querySelector('.newE').classList.remove('enab')
	}

	// Creacion de objeto a almacenar
	let nuevo = {
		name: document.querySelector('input[name="Nombre"]').value,
		unid: document.querySelector('input[name="Unidad"]').value,
		nameI: [],
		unidI: [],
		cantI:[],
		pricI:[]
	}
	// Normalizar
	const nameI = document.querySelectorAll('.newE .ing input[name="nombre"]');
	nuevo.nameI.length = nameI.length;
		nameI.forEach((t,n)=>{
			nuevo.nameI[n] = t.value;
	})
	const unidI = document.querySelectorAll('.newE .ing input[name="unidad"]');
	nuevo.unidI.length = unidI.length;
		unidI.forEach((t,n)=>{
			nuevo.unidI[n] = t.value;
	})
	const cantI = document.querySelectorAll('.newE .ing input[name="cantidad"]');
	nuevo.cantI.length = cantI.length;
		cantI.forEach((t,n)=>{
			nuevo.cantI[n] = t.value;
	})
	const pricI = document.querySelectorAll('.newE .ing input[name="precio"]');
	nuevo.pricI.length = pricI.length;
		pricI.forEach((t,n)=>{
			nuevo.pricI[n] = t.value;
	})
	localStorage.setItem(`Recipe${localStorage.length+1}`,`name:${nuevo.name};unid:${nuevo.unid};names:${nuevo.nameI};unids:${nuevo.unidI};cantid:${nuevo.cantI};price:${nuevo.pricI};`)
}