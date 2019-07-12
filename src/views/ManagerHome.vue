<template>
  <div class="managerHome">
    <nav-header></nav-header>
    <section class="managerHome-section wrap clearfix">

      <div class="managerHome-section-left">
        <el-menu :default-active="menuOption" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="switchMenuOption('1')">
            <i class="el-icon-upload"></i>
            <span slot="title">上传艺术家</span>
          </el-menu-item>
          <el-menu-item index="2" @click="switchMenuOption('2')">
            <i class="el-icon-upload"></i>
            <span slot="title">上传艺术品</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="managerHome-section-right">
        <el-card v-show="menuOption == '1' ? true : false">
          <div slot="header" class="clearfix">
            <span>上传艺术家</span>
          </div>
          <el-collapse v-model="activeCollapseName" accordion v-for="(item,index) of artistsUploadList" :key="index">
            <el-collapse-item :name="index">
              <template slot="title">
                <svg-icon icon-class="user"></svg-icon>编号：{{item.artistId}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <svg-icon icon-class="user"></svg-icon>上传用户：{{item.userId}}
              </template>
              <div class="managerHome-tab_pane-collapse-item">
                <div class="managerHome-tab_pane-collapse-item-left">
                  <div>中文名：{{item.artistName}}</div>
                  <div>英文名：{{item.artistNameE}}</div>
                  <div>生辰：{{item.artistYear}}</div>
                  <div>国籍：{{item.artistCountry}}</div>
                  <div>地区：{{item.artistContinent}}</div>
                  <div>详情：{{item.detail}}</div>
                </div>
                <div class="managerHome-tab_pane-collapse-item-right">
                  <img class="managerHome-tab_pane-collapse-item-right-img" :src="item.artistImage" oncontextmenu="return false;">
                </div>
              </div>
              <el-row class="tab_pane-btn-group">
                <el-button type="success" @click="pass(index)">通过</el-button>
                <el-button type="danger" @click="remove(index)">删除</el-button>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-card>

        <el-card v-show="menuOption == '2' ? true : false">
          <div slot="header" class="clearfix">
            <span>上传艺术品</span>
          </div>
          <el-collapse v-model="activeCollapseName" accordion v-for="(item,index) of artworksUploadList" :key="index">
            <el-collapse-item :title="'艺术家编号：' + item.artworkId + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +' 上传用户编号：' + item.userId" :name="index">
              <div class="managerHome-tab_pane-collapse-item">
                <div class="managerHome-tab_pane-collapse-item-left">
                  <div>中文名：{{item.artworkName}}</div>
                  <div>英文名：{{item.artworkNameE}}</div>
                  <div>作者：{{item.author}}</div>
                  <div>类型：{{item.artworkType}}</div>
                  <div>创作时间：{{item.artworkYear}}</div>
                  <div>收藏位置：{{item.place}}</div>
                  <div>详情：{{item.detail}}</div>
                </div>
                <div class="managerHome-tab_pane-collapse-item-right">
                  <img class="managerHome-tab_pane-collapse-item-right-img" :src="item.artworkImage" oncontextmenu="return false;">
                </div>
              </div>
              <el-row class="tab_pane-btn-group">
                <el-button type="success" @click="pass(index)">通过</el-button>
                <el-button type="danger" @click="remove(index)">删除</el-button>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-card>

        <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" v-show="isLoading">
          <svg-icon icon-class="loading-bars" style="width:40px;height:40px"></svg-icon>
        </div>
      </div>
    </section>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import axios from 'axios';

export default {
  name: "managerHome",
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      activeTabName: 'artistsUpload', // 默认菜单选项
      tabPosition: "left", // 菜单选项卡位置
      activeCollapseName: 0, // 默认内容选项
      page: "1",
      pageSize: "8",
      busy: true, // 滚动加载插件默认禁用
      isLoading: false,
      artistsUploadList: [],
      artworksUploadList: [],
      isArtistsList: false,
      isArtworksList: true,
      menuOption: "1"
    };
  },
  mounted () {
    this.getArtistsUpload()
  },
  methods: {
    reset () {
      this.page = "1"
      this.artworksUploadList = []
      this.artistsUploadList = []
    },
    handleClick (tab) {
      if (tab.name == "artistsUpload") {
        if (this.isArtistsList) {
          this.reset()
          this.getArtistsUpload()
          this.isArtistsList = false
          this.isArtworksList = true
        }
      } else {
        if (this.isArtworksList) {
          this.reset()
          this.getArtworksUpload()
          this.isArtistsList = true
          this.isArtworksList = false
        }
      }
    },
    // 获取上传艺术家
    getArtistsUpload (flag) {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      axios.post("/managerHome/getArtistsUpload", params).then(res => {
        if (flag) {
          this.artistsUploadList = this.artistsUploadList.concat(res.data.result.list);
          if (res.data.result.count < this.pageSize) {
            this.busy = true; // 禁用
            this.isLoading = false; // 请求到数据图标消失
          } else {
            this.busy = false; // 启用
          }
        } else {
          this.artistsUploadList = res.data.result.list;
          this.busy = false;
        }
      })
    },
    // 获取上传艺术品
    getArtworksUpload (flag) {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      axios.post("/managerHome/getArtworksUpload", params).then(res => {
        if (flag) {
          this.artworksUploadList = this.artworksUploadList.concat(res.data.result.list);
          if (res.data.result.count < this.pageSize) {
            this.busy = true; // 禁用
            this.isLoading = false; //请求到数据图标消失
          } else {
            this.busy = false; // 启用
          }
        } else {
          this.artworksUploadList = res.data.result.list;
          this.busy = false;
        }
      })
    },
    //滚动加载插件方法
    loadMore () {
      //滚动就禁用，防止下一个滚动
      this.busy = true;
      this.page++;
      if (this.menuOption == "1") {
        this.getArtistsUpload(true);
      } else {
        this.getArtworksUpload(true);
      }
    },
    //通过
    pass (index) {
      let params = {}
      if (this.menuOption == "1") {
        params = this.artistsUploadList[index]
      } else {
        params = this.artworksUploadList[index]
      }
      axios.post("/managerHome/pass", params).then(res => {
        if (res.data.status == "0") {
          this.$notify({
            title: '审核通过',
            type: 'success',
            duration: 2000,
            offset: 0,
            onClose: () => {
              this.$router.push({ path: "/Blank" })
            }
          });
        }
      })
    },
    //删除
    remove (index) {
      let params = {}
      if (this.activeTabName == "artistsUpload") {
        params = this.artistsUploadList[index]
      } else {
        params = this.artworksUploadList[index]
      }
      axios.post("/managerHome/remove", params).then(res => {
        if (res.data.status == "0") {
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2000,
            offset: 0,
            onClose: () => {
              this.$router.push({ path: "/Blank" })
            }
          });
        }
      })
    },
    switchMenuOption (index) {
      this.menuOption = index

      if (this.menuOption == "1") {
        if (this.isArtistsList) {
          this.reset()
          this.getArtistsUpload()
          this.isArtistsList = false
          this.isArtworksList = true
        }
      } else {
        if (this.isArtworksList) {
          this.reset()
          this.getArtworksUpload()
          this.isArtistsList = true
          this.isArtworksList = false
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.managerHome-section {
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;

  &-left {
    width: 20%;
  }
  &-right {
    width: 80%;
    margin-left: 50px;
  }
}

.managerHome-tab_pane-collapse-item {
  display: flex;
}

.managerHome-tab_pane-collapse-item-left {
  width: 50%;
  font-size: 13px;
}

.managerHome-tab_pane-collapse-item-right {
  width: 50%;
  display: flex;
  justify-content: center;
}

.managerHome-tab_pane-collapse-item-right-img {
  max-width: 400px;
  max-height: 240px;
  overflow: hidden;
}

.view-more-normal {
  height: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.tab {
  margin: 50px 0;
}
.tab_pane {
  padding: 0 50px;
}
.tab_pane-btn-group {
  margin-top: 20px;
}
</style>