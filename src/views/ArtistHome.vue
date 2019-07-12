<template>
  <div class="artistHome">
    <nav-header></nav-header>
    <section class="artistHome-section wrap clearfix">
      <el-card shadow="always">
        <div class="artistHome-section-basic">
          <div class="artistHome-section-basic-left">
            <img :src="artistDetail.artistImage" class="artistHome-section-basic-left__artistImage" oncontextmenu="return false;">
          </div>
          <div class="artistHome-section-basic-right">
            <el-row>
              <el-button :icon="iconStyle" :class="iconStyle2" circle @click="isLike"></el-button>
              <a :href="downloadUrl" :download="downloadName">
                <el-button type="primary" :disabled="isVip" icon="el-icon-download" circle>
                </el-button>
              </a>
            </el-row>
            <div class="artistHome-section-basic-right__artistName">{{artistDetail.artistName}}</div>
            <div class="artistHome-section-basic-right__artistNameE">{{artistDetail.artistNameE}}</div>
            <div class="artistHome-section-basic-right__artistCountry">{{artistDetail.artistCountry}}</div>
            <div class="artistHome-section-basic-right__artistYear">{{artistDetail.artistYear}}</div>
          </div>
        </div>
        <div class="artistHome-section-more">
          <div class="artistHome-section-more__detail">
            <el-card shadow="always">
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列奥纳多·达·芬奇（意大利語：Leonardo da Vinci；儒略历1452年4月15日－1519年5月2日）[註 1]，又譯达文西，全名李奧納多·迪·瑟皮耶罗·达·芬奇（Leonardo di ser Piero da Vinci，意为「文西城皮耶羅先生之子──李奧納多」），是意大利文藝復興時期的一个博學者：在繪畫、音樂、建築、數學、幾何學、解剖學、生理學、動物學、植物學、天文學、氣象學、地質學、地理學、物理學、光學、力學、發明、土木工程等領域都有顯著的成就。这使他成为文艺复兴时期人文主义的代表人物，也使得他成為文藝復興時期典型的藝術家，也是歷史上最著名的畫家之一，與米開朗基羅和拉斐尔並稱文艺复兴三杰。小行星3000为纪念达·芬奇而被命名為“列奥纳多”。列奥纳多·达·芬奇（意大利語：Leonardo da Vinci；儒略历1452年4月15日－1519年5月2日）[註 1]，又譯达文西，全名李奧納多·迪·瑟皮耶罗·达·芬奇（Leonardo di ser Piero da Vinci，意为「文西城皮耶羅先生之子──李奧納多」），是意大利文藝復興時期的一个博學者：在繪畫、音樂、建築、數學、幾何學、解剖學、生理學、動物學、植物學、天文學、氣象學、地質學、地理學、物理學、光學、力學、發明、土木工程等領域都有顯著的成就。这使他成为文艺复兴时期人文主义的代表人物，也使得他成為文藝復興時期典型的藝術家，也是歷史上最著名的畫家之一，與米開朗基羅和拉斐尔並稱文艺复兴三杰。小行星3000为纪念达·芬奇而被命名為“列奥纳多”。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列奥纳多·达·芬奇常常被描述成一个博学者中的典型、一个有着“不可遏制的好奇心”和“极其活跃的创造性想象力”的人。[1]他被广泛地认同为迄今为止最伟大画家之一，或许他还是所有人中拥有最多不同类型的天赋的人[2]。按照艺术史学者海伦·加德纳（英语：Helen Gardner (art historian)）的说法，他的兴趣到达了一个前所未有的范围和深度，而且“他的思想和人格似乎是超出常人的，而他本身却是神秘又疏远”[1]。Marco Rosci提出尽管现在已经有许多关于列奥纳多·达·芬奇的推测，他的世界观却是从本质上符合逻辑的而不是神秘的，他使用的经验主义的手法在那个时期也是不寻常的。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;达·芬奇是公证员瑟皮耶罗·达芬奇和农民妇女卡特琳娜的非婚生子女，他在意大利佛罗伦萨中一个叫做芬奇的地方出生成长。列奥纳多从小在著名的佛罗伦斯画家安德烈·德尔·委罗基奥的画室受教育。他的早期工作生涯都是为米兰的卢多维科·斯福尔扎服务。他后来在罗马、波隆那和威尼斯工作，在弗朗索瓦一世授予他的法国的家中度过了人生中最后一年。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;达·芬奇过去与现在都主要以画家著称，并以其画作写实性和极具影响力闻名[2]。在他的作品中，《蒙娜丽莎》是最负盛名且最常被模仿的肖像[4]。《最后的晚餐》被认为是所有时期中最多被复制的宗教绘画，只有米开朗基罗的《创造亚当》[1]的声望能与之媲美。列奥纳多的绘画《维特鲁威人》也被认为是一个文化的象征[5]，他被复制在各种各样的物品上，如欧元、教科书和T恤衫上。他的绘画中有15张遗留了下来，之所以数量这么少，是因为他持续不断地，频繁地用新技术进行灾难性的试验以及他作画时一贯的拖延[注 2]。不论如何，他的作品，连同他那包含了绘图、科学图解和他关于绘图本质的思想的笔记本，使他成为了同时代中只有米开朗基罗才能与提并论的、对后世的艺术家有巨大影响的艺术家。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;达·芬奇受到人们的尊崇是因为他[2]技术上的独创性。他具有超越当时的广泛构思，其中著名的概念性发明有：直升机、机关枪、机器人、坦克、太阳能聚焦使用、计算器[6]、双层壳，他还勾勒出了板块构造论的基本理论框架。但达 · 芬奇的作品中衹有极少数画作流传下来，加上散布在形形色色收藏中包括了绘画、科学示意图、笔记的手稿。达·芬奇的发明大多是超前的，在当时，只有少数设计在当时被建造出来，而多数设计在当时是不可实现的[注 3]。但达·芬奇的一些小发明，例如一个自动的绕轴机，一个用于测试金属线的张力的机器，这些发明第一次预示了一个有制造业的世界[注 4]。他在解剖学、土木工程、光学和流体力学方面都有过重要的探索。</p>
              <!-- {{artistDetail.detail}} -->
            </el-card>
          </div>
        </div>
      </el-card>
      <label class="artistHome-section__label">作品</label>
      <el-card shadow="always" :body-style="{ padding: '0px' }">
        <ul class="artistHome-section-artistworkList">
          <li class="artistHome-section-artistworkList__item" v-for="(item,index) of artworksList" :key="index">
            <div class="artistHome-section-artistworkList__item-box">
              <router-link :to="'/ArtworkHome/' + item.artworkId">
                <img class="artistHome-section-artistworkList__item-box-img" :src="item.artworkImage" oncontextmenu="return false;">
              </router-link>
            </div>
            <p class="artistHome-section-artistworkList__item-basic">{{item.artworkName}} </p>
            <p class="artistHome-section-artistworkList__item-age">{{item.type}} ({{item.artworkYear}})</p>
          </li>
        </ul>
      </el-card>
    </section>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import axios from "axios";

export default {
  name: "artistHome",
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      userId: "",
      artistDetail: {},
      artistId: "",
      artworksList: [],
      iconStyle: "el-icon-star-off",
      iconStyle2: "is-plain",
      like: false,
      isVip: true,
      downloadUrl: "javascript:return false;",
      downloadName: ""
    }
  },
  created () {
    this.getArtist()
  },
  methods: {
    // 检查是否登录
    checkLogin () {
      axios.get("/users/checkLogin").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.userId = res.result[2]
          this.likeStatus()
        }
      })
    },
    getArtist () {
      axios.get("/artistHome/detail", {
        params: {
          artistId: this.$route.params.id,
        }
      }).then(res => {
        this.artistDetail = res.data.result.array
        this.artworksList = res.data.result.array.artworks
        this.artistId = res.data.result.array.artistId
        this.checkLogin()
        this.getArtworksList()
      })
    },
    getArtworksList () {
      axios.post("/artistHome/getArtworksList", {
        artworksList: this.artworksList,
        userId: this.userId
      }).then(res => {
        this.artworksList = res.data.result.list;
      })
    },
    isLike () {
      axios.post("/artistHome/likeJudgment", {
        userId: this.userId,
        artistId: this.artistId,
        like: this.like
      }).then(res => {
        if (res.data.status == "1001") {
          this.$notify.error({
            title: '添加失败',
            message: res.data.msg,
            duration: 2000,
            offset: 0
          });
        } else {
          if (this.iconStyle == "el-icon-star-off") {
            this.iconStyle = "el-icon-star-on"
            this.iconStyle2 = "el-button--danger"
            this.like = true
            this.$notify({
              title: '添加成功',
              message: '已添加到个人收藏夹',
              type: 'success',
              duration: 2000,
              offset: 0
            });
          } else {
            this.iconStyle = "el-icon-star-off"
            this.iconStyle2 = "is-plain"
            this.like = false
            this.$notify({
              title: '删除成功',
              message: '已在个人收藏夹中删除',
              type: 'success',
              duration: 2000,
              offset: 0
            });
          }
        }
      })
    },
    likeStatus () {
      axios.post("/artistHome/likeStatus", {
        userId: this.userId,
        artistId: this.artistId
      }).then(res => {
        if (res.data.msg == undefined) {
          console.log("未收藏");
        } else {
          this.iconStyle = "el-icon-star-on"
          this.iconStyle2 = "el-button--danger"
          this.like = true
        }
      })
      axios.post("/artistHome/isVip", {
        userId: this.userId,
      }).then(res => {
        if (res.data.msg[0].isVip) {
          this.isVip = false
          this.downloadUrl = this.artistDetail.artistImage
          this.downloadName = this.artistDetail.artistNameE + ".jpg"
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.artistHome {
  &-section {
    margin-top: 50px;
    margin-bottom: 50px;
    &-basic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 350px;
      border-bottom: none;

      &-left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 40%;

        &__artistImage {
          width: 240px;
          height: 240px;
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60%;
        padding-right: 5%;

        .el-button {
          margin: 0 15px;
        }

        .is-plain {
          color: #f56c6c;
          background: #fef0f0;
          border-color: #fbc4c4;
        }

        .el-button--danger {
          color: #fff;
          background-color: #f56c6c;
          border-color: #f56c6c;
        }

        &__artistName {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 80px;
          font-size: 28px;
        }

        &__artistNameE {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 40px;
          font-size: 18px;
        }

        &__artistCountry {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 40px;
          font-size: 18px;
        }

        &__artistYear {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 40px;
          font-size: 18px;
        }
      }
    }

    &-more {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-top: none;

      &__detail {
        width: 90%;
        padding: 30px;
        margin-bottom: 50px;
      }
    }

    &__label {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      font-size: 30px;
    }

    &-artistworkList {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      background-color: #409eff;
      border: 1px solid #409eff;

      &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 28%;
        height: 320px;
        margin-top: 50px;
        margin-left: 4%;
        background-color: #ffffff;
        border: 1px solid #409eff;

        &:last-child {
          margin-bottom: 50px;
        }

        &-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 180px;
          overflow: hidden;
          margin-bottom: 20px;

          &-img {
            max-width: 220px;
            max-height: 180px;
          }
        }

        &-basic {
          max-width: 220px;
          font-size: 16px;
          margin-bottom: 10px;
        }

        &-age {
          font-size: 16px;
        }
      }
    }
  }
}
</style>