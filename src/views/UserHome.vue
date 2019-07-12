<template>
  <div class="userHome">
    <nav-header></nav-header>
    <section class="userHome-section wrap clearfix">
      <div class="userHome-section-left">
        <el-menu :default-active="menuOption" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="switchMenuOption('1')">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="switchMenuOption('2')">
            <i class="el-icon-star-on"></i>
            <span slot="title">艺术家收藏夹</span>
          </el-menu-item>
          <el-menu-item index="3" @click="switchMenuOption('3')">
            <i class="el-icon-star-on"></i>
            <span slot="title">艺术品收藏夹</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="userHome-section-right">
        <!-- 信息 -->
        <div class="userHome-section-right-information" v-show="menuOption == '1' ? true : false">
          <!-- 个人信息 -->
          <el-card v-show="!isModify">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="modify">
                <svg-icon icon-class="edit" style="transform: scale(1.2);"></svg-icon>
              </el-button>
              </el-switch>
            </div>
            <div class="item">
              <svg-icon icon-class="phone"></svg-icon> 手机：{{information.userName}}
            </div>
            <div class="item">
              <svg-icon icon-class="name"></svg-icon> 昵称：{{information.nickName}}
            </div>
            <div class="item">
              <svg-icon icon-class="skin"></svg-icon> 性别：{{information.sex}}
              <svg-icon icon-class="man" v-show="isMan"></svg-icon>
              <svg-icon icon-class="woman" v-show="isWoman"></svg-icon>
            </div>
            <div class="item">
              <svg-icon icon-class="A"></svg-icon> 年龄：{{information.age}} 岁
            </div>
            <div class="item">
              <svg-icon icon-class="crown"> </svg-icon> VIP：
              <span v-show="information.isVip">是</span>
              <span v-show="!information.isVip">否</span>
            </div>
          </el-card>
          <!-- 修改信息 -->
          <el-card v-show="isModify">
            <div slot="header" class="clearfix">
              <span>修改信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="done">
                <svg-icon icon-class="save" style="transform: scale(1.2);"></svg-icon>
              </el-button>
            </div>
            <div class="item">
              <span class="item__label"> 手机：</span>
              <span class="item__content">{{information.userName}}</span>
            </div>
            <el-form ref="form" :model="form" label-width="60px">
              <el-form-item label="昵称：">
                <el-input v-model="form.nickName">{{information.nickName}}</el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio-group v-model="form.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄：">
                <el-date-picker v-model="form.age" type="date" placeholder="选择日期" value-format="yyyy-M-dd">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <!-- 收藏夹 -->
        <div class="userHome-section-right-favorites">
          <!-- 艺术家收藏夹 -->
          <el-card v-show="menuOption == '2' ? true : false">
            <div slot="header" class="clearfix">
              <span>艺术家收藏夹</span>
            </div>
            <el-collapse v-model="activeName" accordion v-for="(item, index) of information.favoritesArtists" key="index">
              <el-collapse-item :name="index">
                <template slot="title">
                  <svg-icon icon-class="user"></svg-icon>&nbsp;&nbsp;&nbsp;&nbsp;{{item.artistName}}
                </template>
                <div class="userHome-section-right-favorites__item">
                  <div class="userHome-section-right-favorites__item-left">
                    <div>中文名：{{item.artistName}}</div>
                    <div>外文名：{{item.artistNameE}}</div>
                    <div>地区：{{item.artistContinent}}</div>
                    <div>国籍：{{item.artistCountry}}</div>
                    <div>生辰：{{item.artistYear}}</div>
                    <div>作品:
                      <span v-for="artwork of item.artworks"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{artwork}}</span>
                    </div>
                  </div>
                  <div class="userHome-section-right-favorites__item-right">
                    <img :src="item.artistImage" class="userHome-section-right-favorites__item-right-img" oncontextmenu="return false;">
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <!-- 艺术品收藏夹 -->
          <el-card v-show="menuOption == '3' ? true : false">
            <div slot="header" class="clearfix">
              <span>艺术品收藏夹</span>
            </div>
            <el-collapse v-model="activeName" accordion v-for="(item, index) of information.favoritesArtworks" key="index">
              <el-collapse-item :name="index">
                <template slot="title">
                  <svg-icon icon-class="art"></svg-icon>&nbsp;&nbsp;&nbsp;&nbsp;{{item.artworkName}}
                </template>
                <div class="userHome-section-right-favorites__item">
                  <div class="userHome-section-right-favorites__item-left">
                    <div>中文名：{{item.artworkName}}</div>
                    <div>外文名：{{item.artworkNameE}}</div>
                    <div>作者：{{item.author}}</div>
                    <div>创作时间：{{item.artworkYear}}</div>
                    <div>类型：{{item.artworkType}}</div>
                    <div>收藏位置：{{item.place}}</div>
                    <div>详情：{{item.detail}}</div>
                  </div>
                  <div class="userHome-section-right-favorites__item-right">
                    <img :src="item.artworkImage" class="userHome-section-right-favorites__item-right-img" oncontextmenu="return false;">
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </div>
    </section>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import axios from "axios";

export default {
  name: "userHome",
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      isModify: false,
      isMan: false,
      isWoman: false,
      activeName: '1',
      information: {
        userName: "",
        nickName: "",
        age: "",
        sex: "",
        isVip: true,
        favoritesArtists: [],
        favoritesArtworks: []
      },
      form: {
        nickName: "",
        sex: "",
        age: ""
      },
      menuOption: '1'
    };
  },
  created () {
    this.getUserData()
  },
  methods: {
    getUserData () {
      axios.post("/userHome/getUserData").then(res => {
        this.information = res.data.msg
        this.form.nickName = this.information.nickName
        this.form.sex = this.information.sex
        this.form.age = this.information.age
        // 生日转年龄
        this.information.age = this.getAge(this.information.age)
        if (this.information.sex == "男") {
          this.isMan = true
        } else if (this.information.sex == "女") {
          this.isWoman = true
        }
        console.log(this.information.age);
      }).catch(err => {
        console.log(err);
      })
    },
    getAge (birthday) {
      let age;
      const birthdayArr = birthday.split('-');
      const birthdayYear = birthdayArr[0];
      const birthdayMonth = birthdayArr[1];
      const birthdayDay = birthdayArr[2];
      const today = new Date();
      const nowYear = today.getFullYear();
      const nowMonth = today.getMonth() + 1;
      const nowDay = today.getDate();

      if (nowYear == birthdayYear) {
        age = 0; // 同年 则为0岁  
      } else {
        const ageDiff = nowYear - birthdayYear; // 年之差  
        if (ageDiff > 0) {
          if (nowMonth == birthdayMonth) {
            const dayDiff = nowDay - birthdayDay; // 日之差
            if (dayDiff < 0) {
              age = ageDiff - 1;
            } else {
              age = ageDiff;
            }
          } else {
            const monthDiff = nowMonth - birthdayMonth; // 月之差        
            if (monthDiff < 0) {
              age = ageDiff - 1;
            } else {
              age = ageDiff;
            }
          }
        } else {
          age = '未知'; // 返回-1 表示出生日期输入错误 晚于今天    
        }
      }
      return age; // 返回周岁年龄
    },
    modify () {
      this.isModify = true
    },
    done () {
      // 提交表单
      axios.post("/userHome/modifyUserData", this.form).then(res => {
        console.log(res);
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2000,
          offset: 0,
          onClose: () => {
            this.$router.push({ path: "/Blank" })
          }
        });
        this.isModify = false
        this.information.nickName = this.form.nickName
        this.information.sex = this.form.sex
        if (this.form.sex == "男") {
          this.isMan = true
          this.isWoman = false
        } else if (this.form.sex == "女") {
          this.isWoman = true
          this.isMan = false
        }
        this.information.age = this.getAge(this.form.age)
      }).catch(err => {
        console.log(err);
      })
    },
    switchMenuOption (index) {
      this.menuOption = index
    }
  }
};
</script>

<style lang="scss" scoped>
.userHome {
  font-size: 14px;
  &-section {
    display: flex;
    min-height: 500px;
    margin-top: 50px;
    margin-bottom: 50px;
    &-left {
      width: 20%;
    }
    &-right {
      width: 80%;
      margin-left: 50px;
      &-information {
      }
      &-favorites {
        &__item {
          display: flex;
          &-left {
            width: 50%;
          }
          &-right {
            display: flex;
            justify-content: center;
            width: 50%;
            &-img {
              max-width: 400px;
              max-height: 240px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}

.item {
  margin-bottom: 18px;
}

.item__label {
  width: 60px;
  height: 40px;
  line-height: 40px;
  padding: 0 12px 0 6px;
  color: #606266;
  text-align: center;
}

.item__content {
  color: #606266;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  margin: 0 50px;
}
</style>