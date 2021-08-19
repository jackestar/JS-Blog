cok.upd()
cok.Adjust()
redir = async () => {
		// Cargar Monitor
		//https://monitordolarvenezuela.com/
		const response = await fetch("https://monitordolarvenezuela.com/",{mode: 'no-cors'})
		if (response != undefined){
			const l = await response.text()
			//extraer Tasa
			let s = l.slice(l.indexOf('var tasa = '))

			// Diferencia de tiempo de 1dia //Adevertencia
			s = s.substring(s.indexOf('=')+2,s.indexOf(';'))/1;
			if (s>1) {
				cok.set(2);
				cok.set(1,s);
				console.log(s)
				cok.upd()
				console.log(cok.g)
			}	else alert('Error tecnico al obtener el precio del Dolar');
		}	else alert('Precio del Dolar no Actualizado');
		doll = true;
		ready();
}
redir();
