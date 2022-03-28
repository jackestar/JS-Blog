const Load = () => {
	console.log("cargado")
	const headr = document.querySelector("body>header");
	setTimeout(() => {
		headr.classList.remove("pre")
		headr.classList.add("pos")
	}, 1000);
}