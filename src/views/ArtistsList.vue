<template>
  <div class="artistsList">
    <nav-header></nav-header>
    <section class="artistsList-section wrap clearfix">
      <div class="artistsList-section__sort-tab">
        <div class="artistsList-section__sort-tab-option" v-for="(item,index) of sortTab" :key="index" :class="{'artistsList-section__sort-tab-option_active': index == currentSortIndex  ? true : false}" @click="whichSortType(index)">
          <a class="artistsList-section__sort-tab-option-a">{{item.type}}</a>
        </div>
      </div>

      <div class="artistsList-section-main">
        <div class="artistsList-section__filter-tab">
          <div class="artistsList-section__filter-tab-form">
            <a href="#" class="artistsList-section__filter-tab-title">地区</a>
            <div class="artistsList-section__filter-tab-option" v-for="(continent,index) of continentFilter" :key="index" :class="{'artistsList-section__filter-tab-option_active': index == currentContinentIndex  ? true : false}" @click="setContinentFilter(index)">
              <a href="#" class="artistsList-section__filter-tab-option-a">{{continent.theContinent}}</a>
            </div>
          </div>
          <div class="artistsList-section__filter-tab-form">
            <a href="" class="artistsList-section__filter-tab-title">年份</a>
            <div class="artistsList-section__filter-tab-option" v-for="(years,index) of yearsFilter" :key="index" :class="{'artistsList-section__filter-tab-option_active': index == currentYearsIndex ? true : false}" @click="setYearsFilter(index)">
              <a href="#" class="artistsList-section__filter-tab-option-a">{{years.startYears}} {{years.endYears}}</a>
            </div>
          </div>
        </div>

        <div class="artistsList-section-content">
          <ul class="artistsList-section-list">
            <li class="artistsList-section-list__item" v-for="(item,index) of artistsList" :key="index">
              <router-link :to="'/ArtistHome/' + item.artistId">
                <img class="artistsList-section-list__item-img" :src="item.artistImage" oncontextmenu="return false;">
              </router-link>
              <p class="artistsList-section-list__item-basic">{{item.artistName}} ({{item.artistCountry}})</p>
              <p class="artistsList-section-list__item-age">{{item.artistYear}}</p>
            </li>
          </ul>
          <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" v-show="isLoading">
            <svg-icon icon-class="loading-bars" style="width:40px;height:40px"></svg-icon>
          </div>
        </div>

      </div>
    </section>

    <!-- 回到顶部 -->
    <transition name="el-zoom-in-center">
      <div class="backTo transition-box" @click="backTo" v-show="scrolled">
        <i class="el-icon-arrow-up"></i>
      </div>
    </transition>

    <nav-footer v-show="!isLoading"></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import axios from "axios";

export default {
  name: "artistsList",
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      scrolled: false, //是否滑动
      sortType: "0", //排序类型
      sortFlag: true, // 默认升序
      page: "1", //当前页数
      pageSize: "9", //每页数量
      busy: true, // 滚动加载插件默认禁用
      isLoading: false, //是否加载
      currentSortIndex: "0",
      currentContinentIndex: "0",
      currentYearsIndex: "0",
      sortTab: [{
        type: "默认"
      },
      {
        type: "国籍"
      },
      {
        type: "年份"
      }
      ],
      continentChecked: "all",
      yearsChecked: "all",
      continentFilter: [{
        theContinent: "全部"
      },
      {
        theContinent: "亚洲"
      },
      {
        theContinent: "欧洲"
      },
      {
        theContinent: "美洲"
      },
      {
        theContinent: "非洲"
      },
      {
        theContinent: "其他"
      }
      ],
      yearsFilter: [{
        startYears: "全部",
        endYears: ""
      },
      {
        startYears: "公元前",
        endYears: ""
      },
      {
        startYears: "1世纪",
        endYears: " - 10世纪"
      },
      {
        startYears: "11世纪",
        endYears: " - 15世纪"
      },
      {
        startYears: "16世纪",
        endYears: " - 19世纪"
      },
      {
        startYears: "20世纪",
        endYears: " - 至今"
      }
      ],
      artistsList: []
    };
  },
  mounted () {
    this.getArtistsList();
    // 添加滑动监听
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed () {
    // 取消滑动监听
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    getArtistsList (flag) {
      let param = {
        sortType: this.sortType,
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? "1" : "-1",
        continentLevel: this.continentChecked,
        yearsLevel: this.yearsChecked
      };
      //请求前出现
      this.isLoading = true;
      axios
        .get("/artists", {
          params: param
        })
        .then(res => {
          //请求到数据图标消失
          this.isLoading = false;
          if (res.data.status == "0") {
            if (flag) {
              // true.商品数据累加
              this.artistsList = this.artistsList.concat(res.data.result.list);
              if (res.data.result.count < this.pageSize) {
                this.busy = true;// 禁用
              } else {
                this.busy = false; // 启用
              }
            } else {
              // 只加载一页
              this.artistsList = res.data.result.list;
              this.busy = false;
            }
          } else {
            this.artistsList = [];
          }
        });
    },
    whichSortType (index) {
      this.currentSortIndex = index;
      this.sortFlag = !this.sortFlag;
      this.sortType = index;
      this.page = "1";
      this.getArtistsList();
    },
    setContinentFilter (index) {
      this.currentContinentIndex = index;
      this.page = "1";
      this.continentChecked = index;
      this.getArtistsList();
    },
    setYearsFilter (index) {
      this.currentYearsIndex = index;
      this.page = "1";
      this.yearsChecked = index;
      this.getArtistsList();
    },
    //滚动加载插件方法
    loadMore () {
      //滚动就禁用，防止下一个滚动
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getArtistsList(true);
      }, 1000);
    },
    handleScroll () {
      if (window.scrollY == 0) {
        this.scrolled = false
      } else {
        this.scrolled = true
      }
    },
    backTo () {
      window.scroll(0, 0)
    }
  }
};
</script>

<style lang="scss" scoped>
.backTo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 40px;
  height: 40px;
  background-color: #409eff;
  position: fixed;
  right: 5%;
  bottom: 49.5%;
  cursor: pointer;
}

.view-more-normal {
  height: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.artistsList-section__sort-tab {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.artistsList-section__sort-tab-option {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 20px 20px;
  width: 60px;
  height: 30px;
}

.artistsList-section__sort-tab-option-a {
  color: #409eff;
}

.artistsList-section__sort-tab-option_active {
  color: #fff;
  background-color: #409eff;

  .artistsList-section__sort-tab-option-a {
    color: #fff;
  }
}

.artistsList-section__sort-tab-option:hover {
  color: #fff;
  background-color: #409eff;

  .artistsList-section__sort-tab-option-a {
    color: #fff;
  }
}

.artistsList-section-main {
  display: flex;
  justify-content: center;
}

.artistsList-section__filter-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
}

.artistsList-section__filter-tab-form {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #409eff;
  margin-bottom: 10px;
}

.artistsList-section__filter-tab-title {
  display: block;
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-left: 1px solid #409eff;
  border-right: 1px solid #409eff;
  color: #ffffff;
  background-color: #409eff;
}

.artistsList-section__filter-tab-option {
  display: block;
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-left: 1px solid #409eff;
  border-right: 1px solid #409eff;
  text-align: center;
}

.artistsList-section__filter-tab-option:last-child {
  margin-bottom: 5px;
}

.artistsList-section__filter-tab-option-a {
  display: block;
  width: 100%;
  height: 100%;
  color: #409eff;
}

.artistsList-section__filter-tab-option_active {
  background-color: #409eff;

  .artistsList-section__filter-tab-option-a {
    color: #ffffff;
  }
}

.artistsList-section__filter-tab-option:hover {
  background-color: #409eff;

  .artistsList-section__filter-tab-option-a {
    color: #ffffff;
  }
}

.artistsList-section-content {
  width: 75%;
  display: flex;
  flex-direction: column;
}

.artistsList-section-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #409eff;
  border: 1px solid #409eff;
  margin-bottom: 50px;
}

.artistsList-section-list__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 28%;
  height: 280px;
  margin-top: 30px;
  margin-left: 4%;
  background-color: #ffffff;
  border: 1px solid #409eff;
}

.artistsList-section-list__item:last-child {
  margin-bottom: 30px;
}

.artistsList-section-list__item-img {
  width: 180px;
  margin-bottom: 10px;
}

.artistsList-section-list__item-basic {
  font-size: 16px;
  margin-bottom: 10px;
}

.artistsList-section-list__item-age {
  font-size: 14px;
}
</style>