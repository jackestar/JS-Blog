tog = (e) => {
	e.parentElement.classList.add('ready')
	setTimeout(()=>{
		document.querySelector('section.login').classList.add('ready')
	},1500)
		setTimeout(()=>{
		document.querySelector('section.login').classList.add('ready2')
	},2000)
}