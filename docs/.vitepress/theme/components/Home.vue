<script setup lang="ts"></script>

<template>
  <div class="MilkUp">
    <div class="milk">
      <svg xmlns="http://www.w3.org/2000/svg" width="1241" height="951" viewBox="0 0 1241 951" fill="none">
        <g opacity="0.4">
          <path
            d="M103.925 147.326C70.0044 115.307 5 47.7209 5 0H1236C1229.62 23.1701 1198.43 38.0279 1185.75 58.4593C1158.49 102.396 1084.06 147.347 1063.97 194.976C1058.92 206.936 1060.46 215.038 1056.1 227.26C1028.36 304.852 931.062 327.795 889.124 365.655C847.186 403.514 831.534 436.879 819.462 491.864C809.033 539.362 815.454 672.407 788.916 672.407C762.378 672.407 756.255 529.984 756.255 520.642C756.255 511.3 752.879 502.875 741.985 503C731.199 503.124 727.715 511.3 727.715 520.642C727.715 529.984 736.107 944.453 693.495 944.453C645.143 944.453 650.462 700.71 650.462 682.387C650.462 664.064 647.337 638.069 626.016 637.5C604.325 636.922 599.82 671.774 599.82 682.387C599.82 693 595.398 811.139 560.417 811.139C525.437 811.139 519.206 506.863 519.206 493.5C519.206 480.137 509.842 470.429 496.5 470.429C483.158 470.429 474 477.5 474 493.5C474 509.5 468.032 565.825 440 565.825C411.968 565.825 394.5 486 389 459.294C383.5 432.588 346.348 359.852 308.602 332.996C274.07 308.427 282.5 311.773 229.5 282C178.806 253.522 150.121 214.71 135.83 189.873C126.966 174.47 116.848 159.525 103.925 147.326Z"></path>
        </g>
      </svg>
    </div>
    <div class="titles">
      <span class="mainTitle">Milk<span class="up">Up</span><span class="down">down</span></span>
      <span class="subTitle"><span class="up">A desktop WYSIWYG Markdown editor</span> <span class="down">A plugin driven framework to build WYSIWYG Markdown editor.</span></span>
      <span class="download">Download</span>
    </div>
    <div class="case">
      <img src="../assets/dark2.png" alt="" />
      <img src="../assets/light2.png" alt="" />
      <img src="../assets/dark1.png" alt="" />
      <img src="../assets/light1.png" alt="" />
    </div>
    <div class="intro">
      <h1>Free & open-source WYSIWYG Markdown editor</h1>
    </div>
    <div class="footer">
      <img src="/logo.svg" alt="" />
      <div class="frendLink">
        <a href="https://milkdown.dev" target="_blank"><img src="/milkdown-logo.svg" alt="" />MilkDown</a>
        <a href="https://github.com/Auto-Plugin" target="_blank"><img src="/autoplugin.svg" alt="" />AutoPlugin</a>
        <a href="https://vercel.com/?utm_source=milkup" target="_blank"><img src="/vercel.svg" alt="" class="vercel" />Vercel</a>
      </div>
      <div class="copyRight">Copyright © [2025] Larry Zhu</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.MilkUp {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  .intro {
    position: absolute;
    top: 221%;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    padding: 20px;
    color: var(--color);
    display: flex;
    height: 40%;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 78px;
    }
  }
  .footer {
    position: absolute;
    top: 250%;
    width: 100%;
    height: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: var(--background-1);
    .frendLink {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
      a {
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 34px;
          margin-right: 10px;
          &.vercel {
            width: 80px;
          }
        }
      }
    }
  }
  .case {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    gap: 80px;
    padding: 20px;
    width: calc(100% - 40px);
    height: 100%;
    overflow: hidden;
    img {
      width: 60%;
      height: auto;
      margin: 0 20px;
      border-radius: 16px;
      box-shadow: var(--shadow);
      transition: 0.2s;
      position: absolute;
      &:nth-child(1) {
        top: 0;
        left: 0;
      }
      &:nth-child(2) {
        top: 50px;
        left: 25%;
      }
      &:nth-child(3) {
        top: 100px;
        left: 50%;
      }
      &:nth-child(4) {
        top: 150px;
        left: 75%;
      }
    }
  }
  .titles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: var(--color);
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.2s;
    .mainTitle {
      font-size: 72px;
      line-height: 72px;
      font-weight: bold;
    }
    .subTitle {
      font-size: 24px;
      line-height: 32px;
      margin: 40px 0;
      font-weight: normal;
    }
    .download {
      background: #6b8bb3;
      padding: 16px 48px;
      border-radius: 1000px;
      width: fit-content;
      cursor: pointer;
      transition: 0.2s;
      color: var(--color-1);
      &:hover {
        background: #5a7a9c;
      }
    }
  }
  .milk {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(180deg);
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: -1;
    svg {
      width: 1200px;
      height: auto;
      g {
        path {
          transform: translateY(-200px) scaleY(0);
          animation: 1.2s ease-in-out 0s 1 normal forwards running style_draw__yS_sr;
          animation-delay: 0.2s;
          fill: var(--milk);
        }
        filter: var(--filter-shadow);
      }
    }
  }
}
</style>
