<template>
  <header class="nav-header">
    <div class="nav-header-content wrap">
      <p class="nav-header-content-left">
        <router-link to="/">
          <a class="nav-header-content-left__a">首页</a>
        </router-link>
        <router-link to="/ArtistsList">
          <a class="nav-header-content-left__a">艺术家</a>
        </router-link>
        <router-link to="/ArtworksList">
          <a class="nav-header-content-left__a">艺术品</a>
        </router-link>
        <router-link to="/RankingLists">
          <a class="nav-header-content-left__a">排行榜</a>
        </router-link>
        <router-link to="/Upload">
          <a class="nav-header-content-left__a">上传</a>
        </router-link>
      </p>
      <p class="nav-header-content-right">
        <a href="#" class="nav-header-content-right-login" @click="loginModalBox" v-show="!isLogin">登录</a>
        <a href="#" class="nav-header-content-right-register" @click="registerModalBox" v-show="!isLogin">注册</a>
        <router-link :to="homePath">
          <a class="nav-header-content-right__a" v-show="isLogin">{{nickName}}</a>
        </router-link>
        <a href="#" class="nav-header-content-right-login" @click="logout" v-show="isLogin">登出</a>
      </p>
    </div>

    <div v-show="isOpenModalBox">
      <div class="modal-box">
        <div class="modal-box-top">
          <div class="modal-box-top__title">{{title}}</div>
          <div class="modal-box-top__error">
            <svg-icon icon-class="warning" v-show="errorTip"> </svg-icon>
            <span v-show="errorTip" style="margin-left:10px;">{{errorText}}</span>
          </div>
          <div class="modal-box-top__close" @click="closeModalBox">
            <svg-icon icon-class="close"></svg-icon>
          </div>
        </div>
        <div class="modal-box-middle">
          <div class="modal-box-middle__content">
            <div class="modal-box-middle__icon">
              <svg-icon icon-class="user"></svg-icon>
            </div>
            <input type="text" class="modal-box-middle__input" placeholder="手机号" v-model="userName" maxlength=11></input>
          </div>
          <div class="modal-box-middle__content">
            <div class="modal-box-middle__icon">
              <svg-icon icon-class="password"></svg-icon>
            </div>
            <input type="password" class="modal-box-middle__input" placeholder="登录密码" v-model="password"></input>
          </div>
          <div class="modal-box-middle__content" v-show="title != '登录' ? true : false">
            <div class="modal-box-middle__icon">
              <svg-icon icon-class="password"></svg-icon>
            </div>
            <input type="password" class="modal-box-middle__input" placeholder="确认密码" v-model="checkPassword"></input>
          </div>
          <div class="modal-box-middle__content" v-show="title != '登录' ? true : false">
            <div class="modal-box-middle__icon">
              <svg-icon icon-class="key2"></svg-icon>
            </div>
            <input type="text" class="modal-box-middle__input modal-box-middle__verificationCode" placeholder="验证码" v-model="verificationCode"></input>
            <button class="modal-box-middle__btn" @click="getVerification">{{content}}</button>
          </div>
        </div>
        <div class="modal-box-bottom">
          <button type="button" class="modal-box-bottom__btn" @click="submit">{{title}}</button>
          <a class="modal-box-bottom_a" v-show="title == '登录' ? true : false" @click="forgetPasswordModalBox">忘记密码?</a>
        </div>
      </div>
      <div class="modal-overlay" @click="closeModalBox"></div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      isOpenModalBox: false,
      errorTip: false,
      errorText: "",
      isLogin: false,
      title: "登录",
      userName: "",
      password: "",
      checkPassword: "",
      verificationCode: "",
      nickName: "",
      homePath: "/UserHome",
      content: '获取验证码', // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    //打开登录模态框
    loginModalBox () {
      this.isOpenModalBox = true
      this.title = "登录"
      this.reset()
    },
    //打开注册模态框
    registerModalBox () {
      this.isOpenModalBox = true
      this.title = "注册"
      this.reset()
    },
    //打开忘记密码模态框
    forgetPasswordModalBox () {
      this.isOpenModalBox = true
      this.title = "重置"
      this.reset()
    },
    //关闭模态框
    closeModalBox () {
      this.isOpenModalBox = false
      this.error = false
      this.reset()
    },
    //登录&注册
    submit () {
      if (this.title == "登录") {
        if (!this.userName) {
          this.errorTip = true;
          this.errorText = "手机号不能为空";
          return
        } else if (!/^1\d{10}$/.test(this.userName)) {
          this.errorTip = true;
          this.errorText = "手机号格式错误";
          return
        } else if (!this.password) {
          this.errorTip = true;
          this.errorText = "密码不能为空";
          return
        }
        // 判断是否为管理员
        if (this.userName != "10000000000") {
          axios.post("/users/login", {
            userName: this.userName,
            password: this.password
          }).then(response => {
            let res = response.data;
            if (res.status == "0") {
              this.isOpenModalBox = false;
              if (res.result.nickName != undefined) {
                this.nickName = res.result.nickName;
              } else {
                this.nickName = res.result.userName;
              }
              this.$notify({
                title: '登录成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            } else {
              this.errorTip = true;
              this.errorText = res.msg;
            }
          })
        } else {
          axios.post("/managers/login", {
            userName: this.userName,
            password: this.password
          }).then(response => {
            let res = response.data;
            if (res.status == "0") {
              this.isOpenModalBox = false;
              if (res.result.nickName != undefined) {
                this.nickName = res.result.nickName;
              } else {
                this.nickName = res.result.userName;
              }
              this.$notify({
                title: '登录成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            } else {
              this.errorTip = true;
              this.errorText = res.msg;
            }
          })
        }
      } else if (this.title == "注册") {
        if (!this.userName) {
          this.errorTip = true;
          this.errorText = "手机号不能为空";
          return
        } else if (!/^1\d{10}$/.test(this.userName)) {
          this.errorTip = true;
          this.errorText = "手机号格式错误";
          return
        } else if (!this.password) {
          this.errorTip = true;
          this.errorText = "密码不能为空";
          return
        } else if (!this.checkPassword) {
          this.errorTip = true;
          this.errorText = "确认密码不能为空";
          return
        } else if (this.password != this.checkPassword) {
          this.errorTip = true;
          this.errorText = "两次密码不一致";
          return
        } else if (!this.verificationCode) {
          this.errorTip = true;
          this.errorText = "验证码不能为空";
          return
        }
        // 判断是否为管理员
        if (this.userName != "10000000000") {
          axios.post("/users/register", {
            userName: this.userName,
            password: this.password,
            verificationCode: this.verificationCode
          }).then(response => {
            let res = response.data;
            if (res.status == "0") {
              this.isOpenModalBox = false;
              if (res.result.nickName != undefined) {
                this.nickName = res.result.nickName;
              } else {
                this.nickName = res.result.userName;
              }
              this.$notify({
                title: '注册成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            } else {
              this.errorTip = true;
              this.errorText = res.msg;
            }
          })
        } else {
          axios.post("/managers/register", {
            userName: this.userName,
            password: this.password,
            verificationCode: this.verificationCode
          }).then(response => {
            let res = response.data;
            if (res.status == "0") {
              this.isOpenModalBox = false;
              if (res.result.nickName != undefined) {
                this.nickName = res.result.nickName;
              } else {
                this.nickName = res.result.userName;
              }
              this.$notify({
                title: '注册成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            } else {
              this.errorTip = true;
              this.errorText = res.msg;
            }
          })
        }
      } else if (this.title == "重置") {
        if (!this.userName) {
          this.errorTip = true;
          this.errorText = "手机号不能为空";
          return
        } else if (!/^1\d{10}$/.test(this.userName)) {
          this.errorTip = true;
          this.errorText = "手机号格式错误";
          return
        } else if (!this.password) {
          this.errorTip = true;
          this.errorText = "密码不能为空";
          return
        } else if (!this.checkPassword) {
          this.errorTip = true;
          this.errorText = "确认密码不能为空";
          return
        } else if (this.password != this.checkPassword) {
          this.errorTip = true;
          this.errorText = "两次密码不一致";
          return
        } else if (!this.verificationCode) {
          this.errorTip = true;
          this.errorText = "验证码不能为空";
          return
        }
        // 判断是否为管理员
        if (this.userName != "10000000000") {
          axios.post("/users/forgetPassword", {
            userName: this.userName,
            password: this.password,
            verificationCode: this.verificationCode
          }).then(response => {
            let res = response.data;
            if (res.status == "0") {
              this.isOpenModalBox = false;
              if (res.result.nickName != undefined) {
                this.nickName = res.result.nickName;
              } else {
                this.nickName = res.result.userName;
              }
              this.$notify({
                title: '重置成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            } else {
              this.errorTip = true;
              this.errorText = res.msg;
            }
          })
        } else {
          axios.post("/managers/forgetPassword", {
            userName: this.userName,
            password: this.password,
            verificationCode: this.verificationCode
          }).then(response => {
            let res = response.data;
            if (res.status == "0") {
              this.isOpenModalBox = false;
              if (res.result.nickName != undefined) {
                this.nickName = res.result.nickName;
              } else {
                this.nickName = res.result.userName;
              }
              this.$notify({
                title: '重置成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            } else {
              this.errorTip = true;
              this.errorText = res.msg;
            }
          })
        }
      }
    },
    //登出
    logout () {
      axios.post("/users/logout").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.nickName = "";
          this.isLogin = false;
          this.$notify({
            title: '登出成功',
            type: 'success',
            duration: 2000,
            offset: 0,
            onClose: () => {
              this.$router.push({ path: "/" })
            }
          });
        }
      })
    },
    //检查是否登录
    checkLogin () {
      axios.get("/users/checkLogin").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.isLogin = true;
          if (res.result[2].match("M")) {
            this.homePath = "/ManagerHome"
          }
          if (res.result[0] != "undefined") {
            this.nickName = res.result[0];
          } else {
            this.nickName = res.result[1];
          }
        }
      })
    },
    // 清空表单和错误提示
    reset () {
      this.userName = "";
      this.password = "";
      this.checkPassword = "";
      this.verificationCode = "";
      this.errorTip = false;
      this.errorText = "";
    },
    getVerification () {
      //改动的是这两行代码
      if (!this.canClick) return
      this.canClick = false

      //这里解决60秒不见了的问题
      this.content = this.totalTime + 's重新获取'

      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's重新获取'

        //当倒计时小于0时清除定时器
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新获取'
          this.totalTime = 60
          this.canClick = true
        }
      }, 1000)
    }
  }
};
</script>

<style lang="scss">
.nav-header {
  font-size: 16px;
  background-color: #409eff;

  & .nav-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .nav-header-content-left {
      display: flex;
      margin: 20px 0 60px 20px;

      & .nav-header-content-left__a {
        margin-left: 20px;
        color: #fff;

        &:hover {
          color: #eee;
          cursor: pointer;
        }
      }
    }

    & .nav-header-content-right {
      display: flex;
      align-items: center;
      margin: 20px 20px 60px 0;

      & .nav-header-content-right__a,
      & .nav-header-content-right-login,
      & .nav-header-content-right-register {
        margin-right: 20px;
        color: #fff;

        &:hover {
          color: #eee;
          cursor: pointer;
        }
      }
    }
  }
}

.modal-box {
  z-index: 999;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.6);

  .modal-box-top {
    display: flex;
    justify-content: flex-start;

    .modal-box-top__title {
      display: flex;
      align-items: center;
      font-size: 24px;
      margin: 20px 0 20px 40px;
      width: 60px;
      height: 40px;
    }

    .modal-box-top__error {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: red;
      margin: 20px 0 20px 20px;
      width: 240px;
      height: 40px;
    }

    .modal-box-top__close {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      margin: 10px;
      cursor: pointer;
    }

    .fa-times:hover {
      color: rgb(197, 197, 197);
    }
  }

  .modal-box-middle {
    .modal-box-middle__content {
      display: flex;
      justify-content: center;
    }

    .modal-box-middle__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin: 0 0 30px 30px;
    }

    .modal-box-middle__input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 290px;
      height: 40px;
      font-size: 16px;
      margin: 0 40px 30px 0;
      padding: 0 10px;
    }

    .modal-box-middle__verificationCode {
      width: 180px;
      margin: 0 20px 20px 0;
    }

    .modal-box-middle__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 40px;
      margin: 0 40px 20px 0;
      border: none;
      color: white;
      background-color: #409eff;
      cursor: pointer;
    }

    .modal-box-middle__btn:hover {
      background-color: #76cff8;
    }
  }

  .modal-box-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

    .modal-box-bottom__btn {
      height: 40px;
      width: 320px;
      margin-bottom: 30px;
      border: none;
      color: white;
      background-color: #409eff;
      cursor: pointer;
    }

    .modal-box-bottom__btn:hover {
      background-color: #76cff8;
    }

    .modal-box-bottom_a {
      height: 20px;
      margin-bottom: 20px;
    }
  }
}

.modal-overlay {
  z-index: 888;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>