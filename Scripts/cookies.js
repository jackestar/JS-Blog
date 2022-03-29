// Crear las siguientes cookies
/*
    // Deteccionde banner de precarga (
        Si se ha pasado por index.html
        De no ser asi pasar a index con redireccion a la original (default adulis.html))
    // Modo dark por encima del sistema
        Una vez que se seleciona manualmente se activa una cookie que decidira el modo dark o light
        Se tendra un boton light dark y system

        0 PrevSiteUrl
        1 firstRun
        2 dark
*/

const da = new Date();
// const dolarLimit = 86400000; //1 Dia
const ctime = new Date(da.getFullYear()+1,da.getMonth(),da.getDate()).toUTCString(); // Duracion de las cookies
const cEndA = ";path=/;secure;samesite=strict"
const cEnd = `;expires=${ctime}${cEndA}`

let cok = {
	g:[],
    G:[],
	upd() {
		const q = document.cookie.replaceAll(' ','').split(';');
        this.g.length = q.length
        this.G.length = q.length
		q.find( (tmp,no) => {
            this.g[no] = tmp.slice(tmp.indexOf('=')+1);
            this.G[no] = tmp.substring(0,tmp.indexOf('='))
        })
	},
	set(num,value = 0) {
        switch (num) {
            case 0:
                document.cookie = `PrevSiteUrl=${value}${cEndA}`;
                break;
            case 1:
                document.cookie = `firstRun=${value}${cEndA}`;
                break;
            case 2:
                document.cookie = `dark=${value}${cEnd}`;
                break;
            default:
                break;
        }
		this.upd();
	},
	Adjust() {
        let q = 0;
        const redir = (a = false) => {
            const e = document.URL;

            if (!e.endsWith("/index.html")) {
                this.set(0,e);
                window.location.href = document.baseURI
            } else this.set(0,"/adulis.html"); if (a) this.set(1,true);
        }

        if (!document.cookie.includes('firstRun')) redir(true)
        else this.G.find((tmp,no) => {
            if (tmp.includes('firstRun') && this.g[no] == "true") q++;
            if (tmp.includes('PrevSiteUrl') && this.g[no] == "") q++;
            if (q==2) redir();
        })
            //index cookies reposive by redirect
    },
	reset(num = -1) {
        if (num == -1) { // Erease All (Minus Espace start name)
            const q = document.cookie.replaceAll(' ','').split(';');
            q.forEach( tmp => document.cookie = `${tmp};expires=${new Date(da.getFullYear()-1,da.getMonth(),da.getDate()).toUTCString()}`);
        }
	}
}