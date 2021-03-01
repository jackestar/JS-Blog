setTimeout(()=> {document.querySelector('.bann').classList.toggle('end')},5000)

let r1 = document.querySelector('.add');
let r2 = document.querySelector('.list');
let r3 = document.querySelector('.p');
let act = 0;

let E = 0;

let ia = document.querySelector('h2#b');
let io = document.querySelector('.info');

let chag = document.querySelector('input[placeholder="W/H"]');
let namm = document.querySelector('input[type="text"]')

ia.addEventListener('click', () => {
  io.classList.toggle('dies');
});
io.addEventListener('click', () => {
  io.classList.toggle('dies');
});

let teb = document.querySelector('.info ul');

teb.children[0].addEventListener('click',() => {

});


teb.children[0].addEventListener('click',() => { 
  chag.value = 39;
  namm.value = 'T12-39';
});
teb.children[1].addEventListener('click',() => { 
  chag.value = 75;
  namm.value = 'T12-75';
});
teb.children[2].addEventListener('click',() => { 
  chag.value = 28;
  namm.value = 'T5-28';
});
teb.children[3].addEventListener('click',() => { 
  chag.value = 32;
  namm.value = 'T8-32';
});
teb.children[4].addEventListener('click',() => { 
  chag.value = 17;
  namm.value = 'T8-17';
});
teb.children[5].addEventListener('click',() => { 
  chag.value = 38;
  namm.value = 'F-M';
});
teb.children[6].addEventListener('click',() => { 
  chag.value = 20;
  namm.value = 'F-E';
});
teb.children[7].addEventListener('click',() => { 
  chag.value = 32;
  namm.value = 'F-T';
});


function dele(pre,coun){
  r3.innerHTML -= pre;
  r2.children[coun].remove()
  document.querySelector('.E').value = E;
};

function tot() {
  let W = document.querySelector('.W').value; 
  let Ep = document.querySelector('.E').value;
  let S = document.querySelector('.S').value;
  let H = document.querySelector('.H').value;
  let Np = document.querySelector('.Np').value;//
  let V = document.querySelector('.V').value;
  let I = document.querySelector('.I').value; //
  let D = document.querySelector('.D').value;
  let Pd = document.querySelector('.Pd').value;
  let Nb = document.querySelector('.Nb').value;//
  if ((Ep!=0||Ep!='') && (S!=0||S!='') && (H!=0||H!='') && (W!=0||W!='')) {
    let temp = ((Ep*S)/(H*W))
    document.querySelector('.Np').value = temp.toPrecision(5);
  }
  if ((Ep!=0||Ep!='') && (V!=0||V!='')) {
    let temp = (Ep/V);
    document.querySelector('.I').value = temp.toPrecision(5);
  }
  if ((D!=0||D!='') && (I!=0||I!='') && (Pd!=0||Pd!='')) {
    let temp = ((D*I)/Pd);
    document.querySelector('.Nb').value = temp.toPrecision(5);
  }
}

function add() {
  let name = document.querySelector('input[type="text"]').value;
  let cant = document.querySelector('input[placeholder="Cantidad"]').value;
  let wprh = document.querySelector('input[placeholder="W/H"]').value;
  let hrus = document.querySelector('input[placeholder="Horas Uso"]').value;
  if (cant=='' || wprh=='' || hrus=='') {
    if (name=="T12-39") wprh = 39;
    else if (name=='T12-75') chag.value = 75;
    else if (name=='T12-39') chag.value = 39;
    else if (name=="T5-28") chag.value = 28;
    else if (name=="T8-32") chag.value = 32;
    else if (name=="T8-17") chag.value = 17;
    else if (name=="F-M") chag.value = 38;
    else if (name=="F-E") chag.value = 20;
    else if (name=="F-T") chag.value = 32;
    else alert('Coloca Todo Los datos');
  }
  else if (!name=='') {

    let Epre = cant * wprh * hrus;
    E += Epre;
    act += 1;
    let plan = `<li>
          <p>${name}</p>
          <p>${cant}</p>
          <p>${wprh}</p>
          <p>${hrus}</p>
          <p>${Epre}</p>
          <a href="#" onclick="dele('${Epre}',${act})">Del</a>
        </li>`;
    r2.innerHTML += plan;
    r3.innerHTML = E;

    namm.innerHTML = '';
    document.querySelector('input[placeholder="Cantidad"]').innerHTML = '';
    document.querySelector('input[placeholder="W/H"]').innerHTML = '';
    document.querySelector('input[placeholder="Horas Uso"]').innerHTML = '';

    document.querySelector('.E').value = E;
    tot()
  }
}