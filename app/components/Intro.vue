<script setup lang='ts'>
</script>

<template>
  <section class='IntroBox'>
    <div class="intro-content">
      <h2>为什么选择 milkup</h2>
      <h6>Why milkup?</h6>
      <div class="features">
        <div class="featItem">
          <div class="featText">
            <span class="title">所见即所得</span>
            <span class="desc">WYSIWYG</span>
            <div class="detail">
              <p>编写即渲染，无需分屏</p>
            </div>
          </div>
          <img src="@/assets/imgs/hybrid.png" alt="Hybrid Mode" />
        </div>
        <div class="featItem">
          <div class="featText">
            <span class="title">HTML 支持</span>
            <span class="desc">HTML Support</span>
            <div class="detail">
              <p>支持 HTML 标签，增强内容表现力</p>
              <p>混合模式可直接编辑 HTML 块</p>
            </div>
          </div>
          <img src="@/assets/imgs/htmlsp.png" alt="HTML Support" />
        </div>
        <div class="featItem">
          <div class="featText">
            <span class="title">自定义图床，粘贴即上传</span>
            <span class="desc">Image Support</span>
            <div class="detail">
              <p>内置自定义图床，粘贴即上传</p>
              <p>可使用本地图片</p>
              <p>可转为 Base64</p>
            </div>
          </div>
          <img src="@/assets/imgs/imgsp.png" alt="Image Support" />
        </div>
        <div class="featItem">
          <div class="featText">
            <span class="title">强大的源码视图</span>
            <span class="desc">Source Code View</span>
            <div class="detail">
              <p>支持源码视图</p>
              <p>搜索替换</p>
              <p>语法提示和高亮</p>
            </div>
          </div>
          <img src="@/assets/imgs/source.png" alt="Source Code View" />
        </div>
        <div class="featItem">
          <div class="featText">
            <span class="title">主题切换</span>
            <span class="desc">Themes</span>
            <div class="detail">
              <p>已内置多种主题，满足日常需求</p>
            </div>
          </div>
          <img src="@/assets/imgs/themes.png" alt="Themes" />
        </div>
        <div class="featItem">
          <div class="featText">
            <span class="title">自定义主题</span>
            <span class="desc">Custom Themes</span>
            <div class="detail">
              <p>支持自定义主题，满足个性化需求</p>
              <p>几乎所有元素颜色都支持自定义</p>
            </div>
          </div>
          <img src="@/assets/imgs/cthemes.png" alt="Custom Themes" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang='less' scoped>
.IntroBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-2);
  padding: 20px;

  .intro-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    h2 {
      font-size: 36px;
      color: var(--color);
      margin-bottom: 10px;
    }

    h6 {
      font-size: 18px;
      color: var(--color-1);
      margin-bottom: 20px;
    }

    img {
      width: 100%;
      max-width: 50%;
      height: auto;
      border-radius: 8px;
    }

    .features {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .featItem {
        display: flex;
        gap: 120px;

        &:nth-child(odd) {
          flex-direction: row-reverse;
        }

        .featText {
          flex: 1;
          padding: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--color-1);
          }

          .desc {
            font-size: 16px;
            color: var(--color);
            margin-bottom: 10px;
          }

          .detail {
            font-size: 16px;
            color: var(--color);
            p {
              margin: 5px 0;
            }
          }
        }
      }
    }
  }
}
</style>