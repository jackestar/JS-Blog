function materia(nombre,codigo,semest,horas,prelacion = [0]) {
    this.nombre = nombre
    this.codigo = codigo
    this.semest = semest
    this.horas = horas
    this.prelac = prelacion
}
let table = {
    objeto:document.querySelector('section.main>article.scheme'),
    info:document.querySelector('aside.content'),
    condProfecinal:true,
    Materias:[],
    MateriasSemestres:[],
    Carrera:'',
    Semestres:0,
    getData(carrera = 0) { // Default Electronica
        // Consulta a la Base de datos...
        this.condProfecinal = true
        this.Carrera = "Ingenieria Electronica"
        this.Semestres = 9
        this.Materias = [
            new materia(
                'Educacion Ambiental',
                'ADG-25132',
                1,[2,1,0]),
            new materia(
                'SoCiTec',
                'ADG-25123',
                1,[2,2,0]),
            new materia(
                'Ingles I',
                'IDM-24113',
                1,[2,2,0]),
            new materia(
                'Dibujo',
                'MAT-21212',
                1,[1,3,0]),
            new materia(
                'Matematica I',
                'MAT-21215',
                1,[4,2,0],
                [[5,true]]),
            new materia(
                'Geometria Analitica',
                'MAT-21524',
                1,[3,2,0],
                [[4,true]]),
            new materia(
                'Seminario I',
                'ADG-25131',
                1,[1,0,0]),
            new materia(
                'Defensa I',
                'DIN-2113',
                1,[2,2,0]),

            new materia(
                'Ingles II',
                'IDM-24123',
                2,[2,2,0],
                [[2,false]]),
            new materia(
                'Quimica General',
                'QUF-22014',
                2,[2,2,3]),
            new materia(
                'Fisica I',
                'QUF-23015',
                2,[4,2,2],
                [[4,false],[5,false]]),
            new materia(
                'Matematica II',
                'MAT-21225',
                2,[4,2,0],
                [[4,false],[5,false]]),
            new materia(
                'Algebra Lineal',
                'MAT-21114',
                2,[2,4,0],
                [[4,false],[5,false]]),
            new materia(
                'Seminatio II',
                'ADG-25141',
                2,[1,0,0],
                [[6,false]]),
            new materia(
                'Defensa II',
                'DIN-21123',
                2,[2,2,0],
                [[7,false]]),

            new materia(
                'Fisica II',
                'QUF-23035',
                3,[4,2,2],
                [[10,false],[11,false]]),
            new materia(
                'Matematica III',
                'MAT-21235',
                3,[4,2,0],
                [[11,false]]),
            new materia(
                'Probabilidad y Estadistica',
                'MAT-21414',
                3,[2,4,0],
                [[11,false]]),
            new materia(
                'Programacion',
                'SYC-22113',
                3,[2,0,3],
                [[12,false]]),
            new materia(
                'Transformadas Integrales',
                'MAT-20254',
                3,[3,3,0],
                [[12,false],[16,true]]),
            new materia(
                'Defensa III',
                'DIN-21133',
                3,[2,2,0],
                [[14,false]]),

            new materia(
                'Redes Electricas I',
                'ELC-30114',
                4,[3,2,0],
                [[19,false],[15,false]]),
            new materia(
                'Fisica III',
                'QUF-33035',
                4,[3,2,3],
                [[16,false],[15,false]]),
            new materia(
                'Senales y Sistemas Dinamicos',
                'ELN-33154',
                4,[3,3,0],
                [[19,false]]),
            new materia(
                'Mediciones Electricas',
                'ELC-30215',
                4,[3,2,3],
                [[25,true]]),
            new materia(
                'Sistemas Digitales I',
                'ELN-31325',
                4,[3,2,3],
                [[25,true]]),
            new materia(
                'Teoria Electromagnetica',
                'ELN-30314',
                4,[3,2,0],
                [[19,false],[15,false]]),
            new materia(
                'Defensa IV',
                'DIN-31143',
                4,[2,2,0],
                [[20,false]]),

            new materia(
                'Redes Electricas II',
                'ELC-30125',
                5,[3,2,3],
                [[21,false],[24,false]]),
            new materia(
                'Electronica I',
                'ELN-30115',
                5,[3,2,3],
                [[24,false],[22,false]]),
            new materia(
                'Sistemas Digitales II',
                'ELN-31335',
                5,[3,2,3],
                [[25,false]]),
            new materia(
                'Teoria de Control Automatico',
                'ELN-33155',
                5,[3,2,3],
                [[23,false]]),
            new materia(
                'Programacion Orientada a Objetos',
                'ELN-34105',
                5,[3,2,3],
                [[18,false]]),
            new materia(
                'Defensa V',
                'DIN-31153',
                5,[2,2,0],
                [[27,false]]),

            new materia(
                'Conversion Electromecanica',
                'ELC-32105',
                6,[3,2,3],
                [[26,false],[28,false]]),
            new materia(
                'Instrumentacion Industrial',
                'ELN-33415',
                6,[4,2,0],
                [[28,false],[38,true]]),
            new materia(
                'Control de Procesos',
                'ELN-33205',
                6,[4,2,2],
                [[35,true]]),
            new materia(
                'Microprocesadores',
                'ELN-31415',
                6,[3,2,3],
                [[30,false]]),
            new materia(
                'Electronica II',
                'ELN-30125',
                6,[4,2,2],
                [[29,false]]),
            new materia(
                'Marco Legal Para El Ejercicion De La Ingenieria',
                'CJU-37314',
                6,[4,0,0],
                []),
            new materia(
                'Defensa VI',
                'DIN-31163',
                6,[2,0,0],
                [[33,false]]),

            new materia(
                'Control De Motores',
                'ELC-32415',
                7,[3,2,3],
                [[34,false]]),
            new materia(
                'Comunicaciones',
                'TLC-31145',
                7,[4,3,2],
                [[23,false],[29,false]]),
            new materia(
                'Electronica III',
                'ELN-30135',
                7,[4,2,2],
                [[34,false]]),
            new materia(
                'Sistemas de Control',
                'ELN-33215',
                7,[4,2,0],
                [[36,false]]),
            new materia(
                'Metodologia de la Investigacion',
                'ADG-30214',
                7,[3,2,0],
                []),
            new materia(
                'Electiva Tecnica',
                '',
                7,[3,1,0],
                []),
            new materia(
                'Electiva No Tecnica',
                '',
                7,[3,0,0],
                []),
            new materia(
                'Defensa VII',
                'DIN-31173',
                7,[2,2,0],
                [[40,false]]),

            new materia(
                'Automatizacion Y Control Industrial',
                'ELN-33324',
                8,[3,2,2],
                [[44,false]]),
            new materia(
                'Electronica Industrial',
                'ELN-31315',
                8,[4,2,2],
                [[34,false]]),
            new materia(
                'Mantenimiento General',
                'AGM-30314',
                8,[4,1,0],
                [[44,false],[41,true]]),
            new materia(
                'Semination de Control',
                'ELN-33301',
                8,[0,2,0],
                [[44,false]]),
            new materia(
                'Electiva Tecnica',
                '',
                8,[3,1,0],
                []),
            new materia(
                'Electiva No Tecnica',
                '',
                8,[3,0,0],
                []),
            new materia(
                'Defensa VIII',
                'DIN-31173',
                8,[2,2,0],
                [[48,false]]),

            new materia(
                'TEG',
                '',
                9,[0,0,0],
                [[0,false]])]
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
        // this.Materias.forEach(e => {
        //     e.avaible = true
        // });
        this.Materias.forEach(e => {
            let av = true
            if (e.prelac != 0) {
                // Primero Las prelaciones
                e.prelac.forEach(i => {
                    if (!i[1] && !this.Materias[i[0]].Aprobed) {
                        av = false
                        e.Aprobed = false
                    }
                })
                e.prelac.forEach(i => {
                    // if (!this.Materias[i[0]].avaible) {}
                    if (!this.Materias[i[0]].avaible) {
                        e.Aprobed = false
                        av = false
                    }
                    if (i[1]) {
                        e.coprel = !this.Materias[i[0]].Aprobed ? true : false
                        this.Materias[i[0]].dep = !this.Materias[i[0]].coprel ? true : false
                    }

                })
                e.avaible = av
            }
        });
        let posicion = 0
        let tempString = ''
        let lock = false
        // this.Materias.forEach(e => {
        //     e.Aprobed = true
        // });
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
                    clases += 'aviable '
                    if (this.Materias[posicion].Aprobed) clases += 'aprobed '
                    else if (this.Materias[posicion].coprel) clases += 'copre '
                    else if (this.Materias[posicion].dep) clases += 'dep'
                }
                
                tempString +=
                    `<li class='${clases}' onclick='table.infor(${posicion});${this.Materias[posicion].avaible?`table.update(${posicion})`:''}'>
                        <h3>${this.Materias[posicion].nombre}</h3>
                        <p>${this.Materias[posicion].codigo}</p>
                    </li>`;
                posicion++
                if (posicion == this.Materias.length) break
            }
            tempString += '</ul>'
        }
        this.objeto.innerHTML = tempString
        if (this.materiaSelected != undefined) this.infor()
    },
    update(materia) {
        if (this.Materias[materia].Aprobed == true) this.Materias[materia].Aprobed = false
        else this.Materias[materia].Aprobed = true
        this.Generate()
    },
    pass(Semestre) {
        let comp = true
        this.MateriasSemestres[Semestre-1].forEach(e => {
            if (this.Materias[e].avaible && !this.Materias[e].Aprobed) comp = false
        });
        this.MateriasSemestres[Semestre-1].forEach(e => {
            if (this.Materias[e].avaible) 
            this.Materias[e].Aprobed = !comp
        });
        this.Generate()
    },
    infor(materia = this.materiaSelected) {
        this.info.innerHTML = ''
        let tempString = "<div class='"
        if (this.Materias[materia].avaible) {
            tempString+= "aviable "
            if (this.Materias[materia].Aprobed) tempString += "aprobed "
            if (this.Materias[materia].coprel) tempString += "copre "
            else if (this.Materias[materia].dep) tempString += "dep "
        }
        tempString+=`'>
            <h3>${this.Materias[materia].nombre}</h3>
            <i>${this.Materias[materia].codigo}</i>
        </div><h4>Horas</h4><ul class='hours'>`
        for (let i = 0; i < this.Materias[materia].horas[0]; i++) tempString += `<li class='t'>${i==0?this.Materias[materia].horas[0]:''}</li>`
        for (let i = 0; i < this.Materias[materia].horas[1]; i++) tempString += `<li class='p'>${i==0?this.Materias[materia].horas[1]:''}</li>`
        for (let i = 0; i < this.Materias[materia].horas[2]; i++) tempString += `<li class='l'>${i==0?this.Materias[materia].horas[2]:''}</li>`
        tempString+="</ul><b>Prelaciones</b><ul class='list'>"
        this.Materias[materia].prelac.forEach(e => {
            if (!e[1] && e!=0) {
                tempString += "<li class='"
                if (this.Materias[e[0]].Aprobed) tempString += "aprobed "
                if (this.Materias[e[0]].coprel) tempString += "copre "
                else if (this.Materias[e[0]].dep) tempString += "dep "
                tempString +=`'><p>${this.Materias[e[0]].nombre}</p><i>${this.Materias[e[0]].codigo}</i></li>` //e[1]
            }
        });


        this.info.innerHTML = tempString;
        this.materiaSelected = materia
        
    },
    materiaSelected:undefined
}

table.getData()
table.Generate()