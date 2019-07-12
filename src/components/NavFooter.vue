<template>
  <footer class="nav-footer">
    <div class="nav-footer-content wrap">
      <div class="nav-footer-content-top">
        <div class="nav-footer-content-top__museum">
          <span class="nav-footer-content-top__museum-title">博物馆</span>
          <a href="http://www.chnmuseum.cn/" class="nav-footer-content-top__museum-href">中国国家博物馆</a>
          <a href="https://www.dpm.org.cn/Home.html" class="nav-footer-content-top__museum-href">故宫博物院</a>
          <a href="http://www.njmuseum.com/html/default.html" class="nav-footer-content-top__museum-href">南京博物馆</a>
          <a href="http://www.auroramuseum.cn/" class="nav-footer-content-top__museum-href">震旦博物馆</a>
          <a href="https://www.npm.gov.tw/" class="nav-footer-content-top__museum-href">国立故宫博物院</a>
          <a href="https://www.louvre.fr/zh" class="nav-footer-content-top__museum-href">卢浮宫博物馆</a>
          <a href="https://www.tnm.jp/modules/r_free_page/index.php?id=162" class="nav-footer-content-top__museum-href">东京国立博物馆</a>
          <a href="https://www.rijksmuseum.nl/cn/general-information-chinese" class="nav-footer-content-top__museum-href">荷兰国立博物馆</a>
          <a href="https://www.britishmuseum.org/visiting.aspx?lang=zh-CHS" class="nav-footer-content-top__museum-href">大英博物馆</a>
          <a href="https://www.metmuseum.org/" class="nav-footer-content-top__museum-href">大都会艺术博物馆</a>
        </div>
        <div class="nav-footer-content-top__website">
          <span class="nav-footer-content-top__website-title">艺术网站</span>
          <a href="https://www.desertx.org/" class="nav-footer-content-top__website-href">DesertX</a>
          <a href="https://www.artupon.com/" class="nav-footer-content-top__website-href">ArtUpon</a>
          <a href="https://folioart.co.uk/" class="nav-footer-content-top__website-href">FolioArt</a>
          <a href="https://www.watercolourworld.org/" class="nav-footer-content-top__website-href">Watercolour World</a>
          <a href="http://www.ifavart.com/" class="nav-footer-content-top__website-href">iFavart</a>
          <a href="http://www.knstrct.com/" class="nav-footer-content-top__website-href">Knstrct</a>
          <a href="https://www.culturetype.com/" class="nav-footer-content-top__website-href">Culturetype</a>
          <a href="http://www.nsyard.com/" class="nav-footer-content-top__website-href">N'S YARD</a>
          <a href="http://www.jagda.or.jp/" class="nav-footer-content-top__website-href">JAGDA</a>
          <a href="http://lumenprize.com/" class="nav-footer-content-top__website-href">LumenPrize</a>
        </div>
      </div>
      <div class="nav-footer-content-bottom">
        <p class="nav-footer-content-bottom__p">Designed by Hyman</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {};
  }
};
</script>

<style lang="scss">
.nav-footer {
  background-color: #409eff;

  &-content {
    &-top {
      display: flex;
      height: 80%;

      &__museum {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        height: 100%;

        &-title {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 50px 200px 30px;
          font-size: 18px;
          color: #fff;
        }

        &-href {
          display: flex;
          justify-content: start;
          width: 150px;
          margin: 0 75px;
          color: #fff;
        }
      }

      &__website {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        height: 225px;

        &-title {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 50px 200px 30px;
          font-size: 18px;
          color: #fff;
        }

        &-href {
          display: flex;
          justify-content: start;
          width: 150px;
          margin: 0 75px;
          color: #fff;
        }
      }
    }
    &-bottom {
      display: flex;
      justify-content: center;
      height: 20%;

      &__p {
        height: 100px;
        line-height: 100px;
        color: #fff;
      }
    }
  }
}
</style>