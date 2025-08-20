<script setup lang='ts'>
</script>

<template>
  <header class='HeaderBox'>
    <div class="left">
      <div class="logo">
        <img src="/logo.svg" alt="">
        <span>milkup</span>
      </div>
    </div>
    <div class="right">
      <nav>
        <ul>
          <li><NuxtLink href="/">Home</NuxtLink></li>
          <li><NuxtLink href="/about">About</NuxtLink></li>
          <li><a href="https://github.com/Auto-Plugin/milkup" target="_blank">Github</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang='less' scoped>
.HeaderBox {
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  top: 0;
  left: 0;
  background-color: var(--background-4);

  .left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .right {
    nav {
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-left: 20px;

          a {
            text-decoration: none;
            color: var(--text-color);

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }
}
</style>