<script setup>
import { ref, onMounted, nextTick } from 'vue';

const bannerBlog = ref(null);

const bannerScale = () => {
  if (!bannerBlog.value) return;

  const parent = bannerBlog.value.parentElement;
  if (!parent) return;

  const scaleX = parent.offsetWidth / bannerBlog.value.offsetWidth;
  const scaleY = parent.offsetHeight / bannerBlog.value.offsetHeight;
  const scale = Math.min(scaleX, scaleY) * 0.75;

  bannerBlog.value.style.transform = `scale(${scale})`;
};

onMounted(() => {
  nextTick(() => {
    bannerBlog.value = document.querySelector(".bannerLogo div.banimg");
    console.log(bannerBlog.value)
    if (bannerBlog.value) {
      bannerBlog.value.style.display = "flex"
      bannerScale();

      const observer = new ResizeObserver(bannerScale);
      observer.observe(bannerBlog.value.parentElement);
    } else {
      console.error("Banner element not found!");
    }
  });
});

</script>

<template>
  <div class="bannerLogo">
    <div class="banimg" ref="bannerBlog">
      <img src="../../src/Blog/chip.png" class="center" @load="bannerScale"/>
      <img src="../../src/Blog/Electro.png" class="float tl"/>
      <img src="../../src/Blog/Control.png" class="float rb"/>
    </div>
  </div>
</template>

<style>

</style>