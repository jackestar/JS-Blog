<script setup>
    let bannerBlog = {};
    const bannerScale = element => {
        const parent = bannerBlog.parentElement;
        const scaleX = parent.offsetWidth / element.offsetWidth;
        const scaleY = parent.offsetHeight / element.offsetHeight;
        const scale = (scaleX > scaleY ? scaleY : scaleX)*.75;
        element.style.transform = `scale(${scale})`;
    }
    const inicio = () => {
        bannerBlog = document.querySelector(".bannerLogo div.banimg");
        bannerScale(bannerBlog);
        const observer = new ResizeObserver(() => bannerScale(bannerBlog));
        observer.observe(document.body);
    }
</script>

<template>
    <div class="bannerLogo">
        <div class="banimg">
            <!-- <img src="../../src/Blog-control/chip.png" class="center" @load="inicio"/> -->
            <!-- <img src="../../src/Blog-control/Electro.png" class="float tl"/> -->
            <!-- <img src="../../src/Blog-control/Control.png" class="float rb"/> -->
        </div>
    </div>
</template>


<style>

</style>