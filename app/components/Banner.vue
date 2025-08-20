<script setup lang='ts'>
import milkupSvg from '~/assets/imgs/milk.svg?raw';
</script>

<template>
  <section class='BannerBox'>
    <div class="milkup" v-html="milkupSvg"></div>
    <div class="title">
      <h1>milkup</h1>
      <h4>免费 & 所见即所得 & 桌面端 markdown 编辑器</h4>
      <h6>a free WYSIWYG desktop markdown editor</h6>
    </div>
    <a class="download" href="https://github.com/Auto-Plugin/milkup/releases" target="_blank">
      <span>download</span>
    </a>
  </section>
</template>

<style lang='less' scoped>
.BannerBox {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    text-align: center;
    color: var(--color-1);
    position: relative;

    h1 {
      font-size: 48px;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 24px;
      margin-bottom: 5px;
    }

    h6 {
      font-size: 16px;
      color: var(--text-2);
    }
  }

  .download {
    position: relative;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--color-1);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: white;

    &:hover {
      background-color: var(--color-2);
    }
  }

  .milkup {
    position: absolute;
    bottom: 0;
    transform: rotate(180deg);

    :deep(g) {
      fill: var(--background-milk);
      filter: drop-shadow(0 2px 5px rgba(184, 194, 215, 0.452));

      path {
        animation: milkup 1.2s ease-in-out forwards;
        transform-origin: 0 0;
      }
    }
  }

  @keyframes milkup {
    0% {
      transform: translateY(-200px) scaleY(0);
    }

    100% {
      transform: translateY(0) scaleY(1);
    }
  }
}
</style>