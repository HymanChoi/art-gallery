<template>
  <div class="home">
    <nav-header></nav-header>
    <nav-search></nav-search>
    <section class="home-section wrap clearfix">
      <div class="home-section-artists__sort-tab">
        <div class="home-section-artists__sort-tab-option" v-for="(item,index) of artistsSortTab" :key="index" :class="{'home-section-artists__sort-tab-option_active': index == currentArtistsSortType  ? true : false}" @click="whichArtistsSortType(index)">
          <a class="home-section-artists__sort-tab-option-a">{{item.type}}</a>
        </div>
      </div>
      <el-card shadow="always" :body-style="{ padding: '0px' }">
        <div class="home-section-artists">
          <ul class="home-section-artists-list">
            <li class="home-section-artists-list__item" v-for="(item,index) of artistsList" :key="index">
              <router-link :to="'/ArtistHome/' + item.artistId">
                <img class="home-section-artists-list__item-img" :src="item.artistImage" oncontextmenu="return false;">
              </router-link>
              <p class="home-section-artists-list__item-basic">{{item.artistName}} ({{item.artistCountry}})</p>
              <p class="home-section-artists-list__item-age">{{item.artistYear}}</p>
            </li>
          </ul>
        </div>
      </el-card>
      <div class="home-section-artworks__sort-tab">
        <div class="home-section-artworks__sort-tab-option" v-for="(item,index) of artworksSortTab" :key="index" :class="{'home-section-artworks__sort-tab-option_active': index == currentArtworksSortType  ? true : false}" @click="whichArtworksSortType(index)">
          <a class="home-section-artworks__sort-tab-option-a">{{item.type}}</a>
        </div>
      </div>
      <el-card shadow="always" :body-style="{ padding: '0px' }">
        <div class="home-section-artworks">
          <ul class="home-section-artworks-list">
            <li class="home-section-artworks-list__item" v-for="(item,index) of artworksList" :key="index">
              <div class="home-section-artworks-list__item-img-box">
                <router-link :to="'/ArtworkHome/' + item.artworkId">
                  <img class="home-section-artworks-list__item-img" :src="item.artworkImage" oncontextmenu="return false;">
                </router-link>
              </div>
              <p class="home-section-artworks-list__item-basic">{{item.artworkName}}</p>
              <p class="home-section-artworks-list__item-age">{{item.type}} ({{item.artworkYear}})</p>
            </li>
          </ul>
        </div>
      </el-card>
      <div class="home-section-rankinglists">
        <div class="home-section-rankinglists-list">
          <div class="home-section-rankinglists-list__item">
            <h2 class="home-section-rankinglists-list__item-title">最喜爱艺术家</h2>
            <table class="home-section-rankinglists-list__item-table" border="1">
              <tr>
                <th>\</th>
                <th>作者</th>
                <th>代表作</th>
                <th>喜爱值</th>
              </tr>
              <tr>
                <td>1</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>5</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>6</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>7</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>8</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>9</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>10</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
            </table>
          </div>
          <div class="home-section-rankinglists-list__item">
            <h2 class="home-section-rankinglists-list__item-title">最喜爱艺术品</h2>
            <table class="home-section-rankinglists-list__item-table" border="1">
              <tr>
                <th>\</th>
                <th>作品名</th>
                <th>作者</th>
                <th>喜爱值</th>
              </tr>
              <tr>
                <td>1</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>5</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>6</td>
                <td>15210441885</td>
                <td>15210441885</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>7</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>8</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>9</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>10</td>
                <td>13661725475</td>
                <td>13661725475</td>
                <td>1,000,000</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

    </section>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavSearch from "@/components/NavSearch.vue";
import NavFooter from "@/components/NavFooter.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    NavHeader,
    NavSearch,
    NavFooter
  },
  data () {
    return {
      sortType: "0",
      sortFlag: true, // 默认升序
      currentArtistsSortType: "0",
      currentArtworksSortType: "0",
      artistsSortTab: [{
        type: "默认"
      },
      {
        type: "国籍"
      },
      {
        type: "年份"
      }
      ],
      artworksSortTab: [{
        type: "默认"
      },
      {
        type: "种类"
      },
      {
        type: "年份"
      }
      ],
      artistsList: [],
      artworksList: []
    };
  },
  mounted () {
    this.getArtistsList();
    this.getArtworksList();
  },
  methods: {
    getArtistsList () {
      let param = {
        listType: 0,
        sortType: this.sortType,
        sort: this.sortFlag ? "1" : "-1"
      };
      axios
        .get("/home", {
          params: param
        })
        .then(res => {
          if (res.data.status == "0") {
            // 只加载一页
            this.artistsList = res.data.result.list;
          } else {
            this.artistsList = [];
          }
        });
    },
    getArtworksList () {
      let param = {
        listType: 1,
        sortType: this.sortType,
        sort: this.sortFlag ? "1" : "-1"
      };
      axios
        .get("/home", {
          params: param
        })
        .then(res => {
          if (res.data.status == "0") {
            // 只加载一页
            this.artworksList = res.data.result.list;
          } else {
            this.artworksList = [];
          }
        });
    },
    whichArtistsSortType (index) {
      this.currentArtistsSortType = index;
      this.sortFlag = !this.sortFlag;
      this.sortType = index;
      this.getArtistsList();
    },
    whichArtworksSortType (index) {
      this.currentArtworksSortType = index;
      this.sortFlag = !this.sortFlag;
      this.sortType = index;
      this.getArtworksList();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  &-section {
    &-artists {
      &__sort-tab {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &-option {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 20px 20px 0;
          width: 60px;
          height: 30px;

          &-a {
            color: #409eff;
          }

          &_active {
            color: #fff;
            background-color: #409eff;

            .home-section-artists__sort-tab-option-a {
              color: #fff;
            }
          }

          &:hover {
            color: #fff;
            background-color: #409eff;

            .home-section-artists__sort-tab-option-a {
              color: #fff;
            }
          }
        }
      }

      &-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        background-color: #409eff;

        &__item {
          width: 320px;
          height: 330px;
          margin: 40px 0;
          background-color: #fff;

          &-img {
            height: 200px;
            margin-top: 30px;
          }

          &-basic {
            margin-top: 20px;
            line-height: 20px;
            font-size: 20px;
          }

          &-age {
            margin-top: 20px;
            line-height: 20px;
            font-size: 16px;
          }
        }
      }
    }

    &-artworks {
      &__sort-tab {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &-option {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 20px 20px 0;
          width: 60px;
          height: 30px;

          &-a {
            color: #409eff;
          }

          &_active {
            color: #fff;
            background-color: #409eff;

            .home-section-artworks__sort-tab-option-a {
              color: #fff;
            }
          }

          &:hover {
            color: #fff;
            background-color: #409eff;

            .home-section-artworks__sort-tab-option-a {
              color: #fff;
            }
          }
        }
      }

      &-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        background-color: #409eff;

        &__item {
          width: 320px;
          height: 330px;
          margin: 40px 0;
          background-color: #fff;

          &-img-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 230px;
            overflow: hidden;
          }

          &-img {
            max-width: 300px;
            max-height: 210px;
            margin-top: 30px;
          }

          &-basic {
            margin-top: 20px;
            line-height: 20px;
            font-size: 20px;
          }

          &-age {
            margin-top: 20px;
            line-height: 20px;
            font-size: 16px;
          }
        }
      }
    }

    &-rankinglists {
      .home-section-rankinglists-list {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .home-section-rankinglists-list__item {
          text-align: center;
          margin: 30px 0;

          .home-section-rankinglists-list__item-title {
            color: #fff;
            background-color: #409eff;
            width: 600px;
            padding: 0 50px;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
          }

          .home-section-rankinglists-list__item-table {
            width: 600px;
          }
        }
      }
    }
  }
}

/* 表格样式 */
table {
  border: 1px solid #ffffff;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px auto;
}

table th {
  background: #409eff;
  color: #fff;
  border-bottom-width: 0;
  text-align: center;
  height: 2.2rem;
}

table th:nth-child(1) {
  width: 60px;
}

table th:nth-child(2) {
  width: 160px;
}

table th:nth-child(3) {
  width: 180px;
}

table th:nth-child(4) {
  width: 100px;
}

table td {
  background: #d9ecff;
  text-align: center;
  height: 2.2rem;
}

table td:nth-child(1) {
  color: #ffffff;
  background: #66b1ff;
  text-align: center;
  height: 2.2rem;
}
</style>