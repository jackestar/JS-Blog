let a=!1,b=!1,c=!1,s=!0;function clean(){a&&document.querySelector(".sub").firstElementChild.classList.toggle("win"),b&&document.querySelector(".sub").children[1].classList.toggle("lin"),c&&document.querySelector(".sub").lastElementChild.classList.toggle("src"),a=!1,b=!1,c=!1,setTimeout(()=>{scrollTo(0,scrollMaxY)},1e3)}document.querySelector("p.a").addEventListener("click",()=>{document.querySelector(".sub").firstElementChild.classList.toggle("win"),clean(),a=!0}),document.querySelector("p.b").addEventListener("click",()=>{document.querySelector(".sub").children[1].classList.toggle("lin"),clean(),b=!0}),document.querySelector("p.c").addEventListener("click",()=>{document.querySelector(".sub").lastElementChild.classList.toggle("src"),clean(),c=!0}),document.querySelector("p.s").addEventListener("click",()=>{!0===s&&(document.querySelector(".sel").classList.toggle("act"),s=!s),scrollTo(0,scrollMaxY)});let AName=navigator.platform,Ahref="#",ark=navigator.oscpu,ANameA=["Windows 64bits","Windows 32bits","Linux 32","Linux 64","MacOSX 64","MacOSX 32","Debian 32","Debian 64","Android"],AhrefA=["https://github.com/jackestar/Dl-PJ/releases/latest/download/DL-JS.Lis.64.7z","https://github.com/jackestar/Dl-PJ/releases/latest/download/DL-JS.Lis.32.7z"],dsp=!1;ark.includes("Win64")?(AName=ANameA[0],Ahref=AhrefA[0],dsp=!0):ark.includes("Win32")?(AName=ANameA[1],Ahref=AhrefA[1],dsp=!0):ark.includes("Win7")&&ark.includes("x64")?(AName=ANameA[0],dsp=!0):ark.includes("Win7")&&(ark.includes("x32")||ark.includes("86"))?(AName=ANameA[1],dsp=!0):ark.includes("Linux")||AName.includes("Linux")&&ark.includes("x64")?(AName=ANameA[3],dsp=!1):ark.includes("Linux")||AName.includes("Linux")&&(ark.includes("x32")||ark.includes("86"))?(AName=ANameA[2],dsp=!1):ark.includes("Android")?(AName=ANameA[8],dsp=!1):(AName=ark.includes("WinXP")||ark.includes("WinVista")?"Windows Obsoleto":"Desconocido",document.querySelector("p.s").click()),ark.includes("Win")&&document.querySelector(".at").classList.toggle("a"),document.querySelector(".at").innerHTML=AName,document.querySelector(".at").setAttribute("href",Ahref),dsp||(document.querySelector("i.q").innerHTML="Actualmente no disponible",document.querySelector(".at").classList.toggle("u"));