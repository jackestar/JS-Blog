function materia(nombre,codigo,unid,semest,horas,prelacion = [0]) {
    this.nombre = nombre
    this.codigo = codigo
    this.unid = unid
    this.semest = semest
    this.horas = horas
    this.prelac = prelacion
}
let table = {
    objeto:document.querySelector('section.main>article.scheme'),
    smain:document.querySelector('section.main'),
    info:document.querySelector('aside.content'),
    condProfecinal:true,
    Materias:[],
    MateriasSemestres:[],
    Carrera:'',
    Semestres:0,
    unidCrditTot:0,
    getData(carrera = 0) { // Default Electronica
        // Consulta a la Base de datos...
        this.condProfecinal = true
        this.Carrera = "Ingenieria Electronica"
        this.Semestres = 9
        this.unidCrditTot = 228
        this.Materias = [
            new materia(
                'Educacion Ambiental',
                'ADG-25132',
                2,
                1,[2,1,0]),
            new materia(
                'SoCiTec',
                'ADG-25123',
                3,
                1,[2,2,0]),
            new materia(
                'Ingles I',
                'IDM-24113',
                3,
                1,[2,2,0]),
            new materia(
                'Dibujo',
                'MAT-21212',
                2,
                1,[1,3,0]),
            new materia(
                'Matematica I',
                'MAT-21215',
                5,
                1,[4,2,0],
                [[5,true]]),
            new materia(
                'Geometria Analitica',
                'MAT-21524',
                4,
                1,[3,2,0],
                [[4,true]]),
            new materia(
                'Seminario I',
                'ADG-25131',
                1,
                1,[1,0,0]),
            new materia(
                'Defensa I',
                'DIN-2113',
                3,
                1,[2,2,0]),

            new materia(
                'Ingles II',
                'IDM-24123',
                3,
                2,[2,2,0],
                [[2,false]]),
            new materia(
                'Quimica General',
                'QUF-22014',
                4,
                2,[2,2,3]),
            new materia(
                'Fisica I',
                'QUF-23015',
                5,
                2,[4,2,2],
                [[4,false],[5,false]]),
            new materia(
                'Matematica II',
                'MAT-21225',
                5,
                2,[4,2,0],
                [[4,false],[5,false]]),
            new materia(
                'Algebra Lineal',
                'MAT-21114',
                4,
                2,[2,4,0],
                [[4,false],[5,false]]),
            new materia(
                'Seminario II',
                'ADG-25141',
                1,
                2,[1,0,0],
                [[6,false]]),
            new materia(
                'Defensa II',
                'DIN-21123',
                3,
                2,[2,2,0],
                [[7,false]]),

            new materia(
                'Fisica II',
                'QUF-23035',
                5,
                3,[4,2,2],
                [[10,false],[11,false]]),
            new materia(
                'Matematica III',
                'MAT-21235',
                5,
                3,[4,2,0],
                [[11,false]]),
            new materia(
                'Probabilidad y Estadistica',
                'MAT-21414',
                4,
                3,[2,4,0],
                [[11,false]]),
            new materia(
                'Programacion',
                'SYC-22113',
                3,
                3,[2,0,3],
                [[12,false]]),
            new materia(
                'Transformadas Integrales',
                'MAT-20254',
                4,
                3,[3,3,0],
                [[12,false],[16,true]]),
            new materia(
                'Defensa III',
                'DIN-21133',
                3,
                3,[2,2,0],
                [[14,false]]),

            new materia(
                'Redes Electricas I',
                'ELC-30114',
                4,
                4,[3,2,0],
                [[19,false],[15,false]]),
            new materia(
                'Fisica III',
                'QUF-33035',
                5,
                4,[3,2,3],
                [[16,false],[15,false]]),
            new materia(
                'Senales y Sistemas Dinamicos',
                'ELN-33154',
                4,
                4,[3,3,0],
                [[19,false]]),
            new materia(
                'Mediciones Electricas',
                'ELC-30215',
                5,
                4,[3,2,3],
                [[25,true]]),
            new materia(
                'Sistemas Digitales I',
                'ELN-31325',
                5,
                4,[3,2,3],
                [[25,true]]),
            new materia(
                'Teoria Electromagnetica',
                'ELN-30314',
                4,
                4,[3,2,0],
                [[19,false],[15,false]]),
            new materia(
                'Defensa IV',
                'DIN-31143',
                3,
                4,[2,2,0],
                [[20,false]]),

            new materia(
                'Redes Electricas II',
                'ELC-30125',
                5,
                5,[3,2,3],
                [[21,false],[24,false]]),
            new materia(
                'Electronica I',
                'ELN-30115',
                5,
                5,[3,2,3],
                [[24,false],[22,false]]),
            new materia(
                'Sistemas Digitales II',
                'ELN-31335',
                5,
                5,[3,2,3],
                [[25,false]]),
            new materia(
                'Teoria de Control Automatico',
                'ELN-33155',
                5,
                5,[3,2,3],
                [[23,false]]),
            new materia(
                'Programacion Orientada a Objetos',
                'ELN-34105',
                5,
                5,[3,2,3],
                [[18,false]]),
            new materia(
                'Defensa V',
                'DIN-31153',
                3,
                5,[2,2,0],
                [[27,false]]),

            new materia(
                'Conversion Electromecanica',
                'ELC-32105',
                5,
                6,[3,2,3],
                [[26,false],[28,false]]),
            new materia(
                'Instrumentacion Industrial',
                'ELN-33415',
                5,
                6,[4,2,0],
                [[28,false],[38,true]]),
            new materia(
                'Control de Procesos',
                'ELN-33205',
                5,
                6,[4,2,2],
                [[35,true]]),
            new materia(
                'Microprocesadores',
                'ELN-31415',
                5,
                6,[3,2,3],
                [[30,false]]),
            new materia(
                'Electronica II',
                'ELN-30125',
                5,
                6,[4,2,2],
                [[29,false]]),
            new materia(
                'Marco Legal Para El Ejercicion De La Ingenieria',
                'CJU-37314',
                4,
                6,[4,0,0],
                []),
            new materia(
                'Defensa VI',
                'DIN-31163',
                3,
                6,[2,0,0],
                [[33,false]]),

            new materia(
                'Control De Motores',
                'ELC-32415',
                5,
                7,[3,2,3],
                [[34,false]]),
            new materia(
                'Comunicaciones',
                'TLC-31145',
                5,
                7,[4,3,2],
                [[23,false],[29,false]]),
            new materia(
                'Electronica III',
                'ELN-30135',
                5,
                7,[4,2,2],
                [[34,false]]),
            new materia(
                'Sistemas de Control',
                'ELN-33215',
                5,
                7,[4,2,0],
                [[36,false]]),
            new materia(
                'Metodologia de la Investigacion',
                'ADG-30214',
                4,
                7,[3,2,0],
                []),
            new materia(
                'Electiva Tecnica',
                '',
                3,
                7,[3,1,0],
                []),
            new materia(
                'Electiva No Tecnica',
                '',
                3,
                7,[3,0,0],
                []),
            new materia(
                'Defensa VII',
                'DIN-31173',
                3,
                7,[2,2,0],
                [[40,false]]),

            new materia(
                'Automatizacion Y Control Industrial',
                'ELN-33324',
                4,
                8,[3,2,2],
                [[44,false]]),
            new materia(
                'Electronica Industrial',
                'ELN-31315',
                5,
                8,[4,2,2],
                [[34,false]]),
            new materia(
                'Mantenimiento General',
                'AGM-30314',
                4,
                8,[4,1,0],
                [[44,false],[41,true]]),
            new materia(
                'Seminarion de Control',
                'ELN-33301',
                1,
                8,[0,2,0],
                [[44,false]]),
            new materia(
                'Electiva Tecnica',
                '',
                3,
                8,[3,1,0],
                []),
            new materia(
                'Electiva No Tecnica',
                '',
                3,
                8,[3,0,0],
                []),
            new materia(
                'Defensa VIII',
                'DIN-31173',
                3,
                8,[2,2,0],
                [[48,false]]),

            new materia(
                'TEG',
                '',
                10,
                9,[0,0,0],218
                )]
            this.MateriasSemestres.length = this.Semestres
            this.MateriasSemestres.fill(Array())
            this.Materias.forEach((e,i) => {
                // console.log(e,this.MateriasSemestres[e.semest-1])
                let temp = this.MateriasSemestres[e.semest-1].slice()
                temp.push(i)
                this.MateriasSemestres[e.semest-1] = temp.slice()
                // console.log(e,i)
            this.Materias.forEach(e => {
                e.Aprobed = false
                e.avaible = true
            });

            });
    },
    Generate() {
        this.objeto.innerHTML = ''
        this.Materias.forEach(e => {
            // let av = true
            // console.log('murder',e)
            e.avaible = true
            // Sin Prelacion
            if (e.prelac == 0) e.avaible = true
            else if (typeof(e.prelac) == "object") {
                e.prelac.forEach(i =>{
                    if (this.Materias[i[0]].avaible) {
                        if (this.Materias[i[0]].Aprobed) {
                            e.coprel = false
                        } else if (i[1]) {
                            this.Materias[i[0]].dep = true
                            if (!e.Aprobed) e.coprel = true
                        } else {
                            if (e.Aprobed)  this.unidCrdit -= e.unid
                            e.avaible = false
                            e.Aprobed = false
                        }
                    } else if (!i[1]) {
                        if (e.Aprobed)  this.unidCrdit -= e.unid
                        e.avaible = false
                        e.Aprobed = false
                    }
                })
            // TEG
            } else if (this.unidCrdit + e.unid >= this.unidCrditTot) e.avaible = true
            else {
                if (e.Aprobed) this.unidCrdit -= e.unid
                e.avaible = false
                e.Aprobed = false
            }
        })
        let posicion = 0
        let tempString = ''
        let lock = false
        if (this.condProfecinal) {
            this.MateriasSemestres[3].forEach(e => {
                if (!this.Materias[e].avaible) lock = true
            });
        }
        for (let s = 1; s <= this.Semestres; s++) {
            tempString += `<ul ${(s>3 && lock)?"class='locked'":''}>
                <li class='sem' onclick='table.pass(${s})'>
                    <h3>Semestre ${s}</h3>
                </li>`
            while (this.Materias[posicion].semest == s) {
                let clases = ''

                if (this.Materias[posicion].avaible) {
                    if (this.Materias[posicion].Aprobed) clases += 'aprobed '
                    else {
                        clases += 'aviable '
                        if (this.Materias[posicion].coprel) clases += 'copre '
                        else if (this.Materias[posicion].dep) clases += 'dep'}
                }
                
                tempString +=
                    `<li class='${clases}' onclick='${this.Materias[posicion].avaible?`table.update(${posicion})`:`table.infor(${posicion})`}'>
                        <h3>${this.Materias[posicion].nombre}</h3>
                        <p>${this.Materias[posicion].codigo}</p>
                    </li>`;
                posicion++
                if (posicion == this.Materias.length) break
            }
            tempString += '</ul>'
        }
        this.objeto.innerHTML = tempString
    },
    update(materia) {
        if (this.Materias[materia].Aprobed) {
            this.Materias[materia].Aprobed = false
            this.unidCrdit -= this.Materias[materia].unid
            // console.log(this.Materias[materia].unid)
        }
        else {
            this.Materias[materia].Aprobed = true
            this.unidCrdit += this.Materias[materia].unid
            // console.log(this.Materias[materia].unid)
        }
        // this.Materias[materia].Aprobed = this.Materias[materia].Aprobed ? false : true
        this.infor(materia)
        this.Generate()
    },
    pass(Semestre) {
        let comp = true
        if (this.MateriasSemestres[Semestre-1].every(e=>this.Materias[e].Aprobed)) {
            this.MateriasSemestres[Semestre-1].forEach(e=>{
                this.unidCrdit -= this.Materias[e].unid
                this.Materias[e].Aprobed = false
            })
        } else {
            this.MateriasSemestres[Semestre-1].forEach(e=>{
                if (!this.Materias[e].Aprobed) {
                this.unidCrdit += this.Materias[e].unid
                this.Materias[e].Aprobed = true
            }
            })
        }
        this.Generate()
    },
    infor(materia = this.materiaSelected) {
        this.info.innerHTML = ''
        let tempString = "<div class='"
        if (this.Materias[materia].avaible) {
        if (this.Materias[materia].Aprobed) tempString += "aprobed "
        else tempString+= "aviable "}
        if (this.Materias[materia].coprel) tempString += "copre "
        else if (this.Materias[materia].dep) tempString += "dep "
        tempString+=`'>
            <h3>${this.Materias[materia].nombre}</h3>
            <i>${this.Materias[materia].codigo}</i>
            <i>UC: ${this.Materias[materia].unid}</i></div>`
        let totHors = 0
        this.Materias[materia].horas.forEach(e=>totHors+=e)
        if (totHors !=0 ) {
            tempString+=`<h4>Horas <b> ${totHors} </b></h4><ul class='hours'>`
            for (let i = 0; i < this.Materias[materia].horas[0]; i++) tempString += `<li class='t'>${i==0?this.Materias[materia].horas[0]+'T':''}</li>`
            for (let i = 0; i < this.Materias[materia].horas[1]; i++) tempString += `<li class='p'>${i==0?this.Materias[materia].horas[1]+'P':''}</li>`
            for (let i = 0; i < this.Materias[materia].horas[2]; i++) tempString += `<li class='l'>${i==0?this.Materias[materia].horas[2]+'L':''}</li>`
            tempString+="</ul>"
        }
        let tempcop = '',temppre = ''
        if (this.Materias[materia].prelac !=0) {
            if (typeof(this.Materias[materia].prelac) == "number") temppre += `<i>Unidades de Credito ${this.Materias[materia].prelac}</i>`
            else this.Materias[materia].prelac.forEach(e => {
                let temp = ''
                    temp += "<li class='"
                    if (this.Materias[e[0]].avaible) {
                        if (this.Materias[e[0]].Aprobed) temp += "aprobed "
                        else temp += "aviable "
                    }            
                
                    if (this.Materias[e[0]].coprel) temp += "copre "
                    else if (this.Materias[e[0]].dep) temp += "dep "
                    temp +=`'><p>${this.Materias[e[0]].nombre}</p><i>${this.Materias[e[0]].codigo}</i></li>` //e[1]
                    if (!e[1]) temppre += temp
                    else tempcop = temp
            })
            // REV...
            if (temppre != '') tempString+="<b>Prelaciones</b><ul class='list'>" + temppre + '</ul>'
            if (tempcop != '') tempString+="<b>Co-Prelaciones</b><ul class='list'>" + tempcop + '</ul>'
        }
        // else if (this.info.classList.contains('hide'))
        this.info.innerHTML = tempString + `<i class="back" onclick="table.infoT()">→</i>`;
        if ((this.materiaSelected == materia && !this.Materias[materia].avaible) || this.materiaSelected == undefined || this.info.classList.contains('hide')) this.infoT();
        this.materiaSelected = materia
        
    },
    infoT() {
            this.info.classList.toggle('hide')
            this.smain.classList.toggle('hide')
    },
    materiaSelected:undefined,
    unidCrdit:0
}

table.getData()
table.Generate()

// let help = document.querySelector('aside.help').classList.toggle('look')
let help = (exit = false) => {
    if (exit) {
        console.log(1)
        document.querySelector('aside.help p').innerHTML = "?"
        setTimeout(() => {
            document.querySelector('aside.help').classList.remove('look')
            document.querySelector('div.blk').classList.remove('look')
        }, 500);
    } else {
        console.log(0)
    document.querySelector('aside.help').classList.add('look');
    document.querySelector('div.blk').classList.add('look')
    setTimeout(() => {
        document.querySelector('aside.help p').innerHTML = "Ayuda"
    }, 500);
}
}