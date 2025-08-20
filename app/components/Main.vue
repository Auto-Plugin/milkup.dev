<script setup lang='ts'>
import Banner from './Banner.vue';
import Intro from './Intro.vue';
</script>

<template>
  <main class='MainBox'>
    <Banner />
    <Intro />
  </main>
</template>

<style lang='less' scoped>
.MainBox {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: var(--background);
}
</style>