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
/* Blog Shared */

.bannerLogo {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 2 50%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bannerLogo .banimg {
  position: absolute;
  width: 350px;
  height: 350px;
  display:none;
}

.bannerLogo img {
  image-rendering: pixelated;
  position: absolute;
}

.bannerLogo img.float.tl {
  left: 5px;
  top: 5px;
  animation:float 4s infinite ease;
  transition: .5s ease-in;
}
.bannerLogo img.float.rb {
  right: 5px;
  bottom: 5px;
  animation:float 4s infinite ease;
  transition: .5s ease-in;
}

.bannerLogo img.center {
  left: 72px;
  top: 108px;
  animation:float 6s infinite ease;
}

.bannerLogo:has(img.center:hover,img.float.rb:hover) img.float.tl {
  left:0;
  top: 0;
  /* scale: .9; */
  animation-duration: 6s;
  transition: .4s ease-in;
}

.bannerLogo:has(img.center:hover,img.float.tl:hover) img.float.rb {
  right: 0;
  bottom: 0;
  /* scale: .9; */
  animation-duration: 6s;
  transition: .4s ease-in;
}

.bannerLogo img.float.tl:hover,.bannerLogo img.float.rb:hover {
  scale: 1.1;
}

.bannerLogo div.grad {
  position: absolute;
  /* top: 25px; */
  /* left: 25px; */
  width: 350px;
  height: 350px;
  background: linear-gradient(90deg,#3e63dd 0, #ffc400 7.5em,#bb0000 15em);
  filter: blur(65px) opacity(.7);
  transition:.5s ease-out;
}
.bannerLogo:hover div.grad {
  opacity: 1;
  transition:.3s ease-in;
  filter: blur(75px) opacity(1);
}

@keyframes float {
  0% {transform: translateY(3%)}
  50% {transform: translateY(-1%)}
  100% {transform: translateY(3%)}
}

/* Title */

@keyframes titleGradAnim {
  to {
      background-position: 0em;
  }
  from {
      background-position: 15em;
  }
}
</style>