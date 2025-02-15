<script setup>
let inicio = () => {
  let start = document.querySelector('div.anim img.gf');
  let loop = document.querySelector('div.anim img.gf.i');
  setTimeout(() => {
    start.style.display = "none"
    loop.style.display = "block"
  }, 1500);
}
</script>

<template>
  <div class="lost">
    <div class="anim">
    <img class="gf" src="../../src/start.gif" alt="Animación inicio" @load="inicio">
    <img class="gf i" src="../../src/loop.gif" alt="Animación bucle" @load="inicio">
    <img class="notf" src="../../src/404.gif" alt="404">
  </div>
  <h1>Pagina no encontrada</h1>
  <a href="/Blog">Volver al Inicio</a>
  </div>
</template>


<style>
div.lost {
  display:flex;
  align-items: center;
  flex-direction: column;
}
div.lost h1{
  text-align: center;
  font-weight: 800;
  font-size: 2em;
}
div.lost a {
  padding:1em;
  border:var(--vp-c-text-1) solid .2em;
  margin: 1em 0;
  border-radius:1em;
}
div.lost a:hover {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}
div.anim {
  display:flex;
  justify-content: center;
  margin:1em;
  align-items:start;
}
div.anim img.gf {
  background-color: #0e0d16;
  padding:1em;
  border-radius: 1em;
}
div.anim img.gf.i {
  display:none;
}
div.anim img {
  width: 25vw;
  image-rendering: pixelated;
  border-left: solid 1em #232e3e;
}

div.anim img.notf {
  position:absolute;
}

</style>