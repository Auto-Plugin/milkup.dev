<script setup lang='ts'>
</script>

<template>
  <div class='AboutBox'>
    <div class="team">
      <h1>milkup 和 Auto-Plugin</h1>
      <h6>About Us</h6>
      <p>milkup 是一个由开源社区驱动的项目，旨在为用户提供一个免费且功能强大的桌面端 Markdown 编辑器。</p>
      <p>我们的团队(Auto-Plugin)由一群热爱技术和开源的开发者组成，致力于不断改进和优化 milkup 的功能和用户体验。我们还有其他的广受好评的开源项目，请查看我们的 👉 <a
          href="https://github.com/Auto-Plugin" alt="Auto-Plugin">组织主页</a> </p>
      <h1>这是 milkup 的贡献者们，向他们致敬！</h1>
      <img src="https://contrib.rocks/image?repo=Auto-Plugin/milkup" alt="Contributors" />
      <div class="tags">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
        <img src="https://img.shields.io/github/v/release/Auto-Plugin/milkup" alt="release">
        <img src="https://img.shields.io/github/stars/Auto-Plugin/milkup" alt="stars">
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.AboutBox {
  width: 100%;
  height: 100%;

  .team {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: var(--background-2);
    color: var(--text-1);
    gap: 20px;

    h1 {
      font-size: 36px;
      margin-top: 100px;
    }

    .tags {
      display: flex;
      gap: 10px;
      margin-top: 60px;
    }
  }
}
</style>