<template>
  <div class="artworkHome">
    <nav-header></nav-header>
    <section class="artworkHome-section wrap clearfix">
      <el-card>
        <div class="artworkHome-section-basic">
          <div class="artworkHome-section-basic-left">
            <div class="artworkHome-section-basic-left__artworkImage-box">
              <img :src="artworkDetail.artworkImage" class="artworkHome-section-basic-left__artworkImage" oncontextmenu="return false;">
            </div>
          </div>
          <div class="artworkHome-section-basic-right">
            <el-row>
              <el-button :icon="iconStyle" :class="iconStyle2" circle @click="isLike"></el-button>
              <a :href="downloadUrl" :download="downloadName">
                <el-button type="primary" :disabled="isVip" icon="el-icon-download" circle>
                </el-button>
              </a>
            </el-row>
            <div class="artworkHome-section-basic-right__artworkName">{{artworkDetail.artworkName}}</div>
            <div class="artworkHome-section-basic-right__artworkNameE">{{artworkDetail.artworkNameE}}</div>
            <div class="artworkHome-section-basic-right__author">{{artworkDetail.author}}</div>
            <div class="artworkHome-section-basic-right__artworkYear">{{artworkDetail.artworkYear}}</div>
          </div>
        </div>
        <div class="artworkHome-section-more">
          <div class="artworkHome-section-more__detail">
            <el-card>
              {{artworkDetail.detail}}
            </el-card>
          </div>
        </div>
      </el-card>

      <el-card style="margin-top: 50px;">
        <div class="artworkHome-section-comment">
          <label class="artworkHome-section-comment__label">评论</label>

          <el-card v-show="commentsList.length == 0 ? false : true">
            <ul class="artworkHome-section-comment-list" v-for="(comment,index) of commentsList">
              <li class="artworkHome-section-comment-list__item">
                <div class="artworkHome-section-comment-list__item-left">
                  <div class="artworkHome-section-comment-list__item-left-top">
                    <div class="artworkHome-section-comment-list__item-left-top-sort">{{commentsList.length - index}} 楼</div>
                    <div class="artworkHome-section-comment-list__item-left-top-userName">{{comment.userName}}</div>
                  </div>
                  <div class="artworkHome-section-comment-list__item-left-bottom">
                    <div class="artworkHome-section-comment-list__item-left-bottom-time">{{comment.time}}</div>
                  </div>
                </div>
                <div class="artworkHome-section-comment-list__item-right">
                  <span class="artworkHome-section-comment-list__item-right-content">
                    {{comment.content}}
                  </span>
                </div>
              </li>
            </ul>
          </el-card>

          <el-card class="artworkHome-section-comment-mine" style="margin-top: 10px;margin-bottom: 20px;">
            <el-form ref="form" label-width="100px">
              <el-form-item label="我的评论：">
                <el-input type="textarea" class="artworkHome-section-comment-mine__input" :autosize="{maxRows:4}" maxlength="400" resize="none" v-model="inputContent" placeholder="请输入你的评论（400字以内）"></el-input>
              </el-form-item>
              <el-form-item class="submit-button">
                <el-button type="primary" @click="submit">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>

        </div>
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
  name: "artworkHome",
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      userId: "",
      artworkDetail: {},
      artworkId: "",
      artworksList: [],
      iconStyle: "el-icon-star-off",
      iconStyle2: "is-plain",
      like: false,
      isVip: true, //判断是否为Vip
      downloadUrl: "javascript:return false;", //下载内容路径
      downloadName: "", //下载图片名称
      inputContent: "", //我的评论
      commentsList: [] //评论列表
    }
  },
  created () {
    this.getArtwork()
  },
  methods: {
    // 检查是否登录
    checkLogin () {
      axios.get("/users/checkLogin").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.userId = res.result[2]
          this.likeStatus()
          this.downloadStatus()
        }
      })
    },
    getArtwork () {
      axios.get("/artworkHome/detail", {
        params: {
          artworkId: this.$route.params.id
        }
      }).then(res => {
        this.artworkDetail = res.data.result.array
        this.artworksList = res.data.result.array.artworks
        this.artworkId = res.data.result.array.artworkId
        this.getComment()
        this.checkLogin()
      })
    },
    getComment () {
      let param = {
        artworkId: this.artworkId
      }
      axios.post("/artworkHome/getComment", param).then(res => {
        if (res.data.status == 2) {
          this.getComment()
        } else {
          this.commentsList = res.data.msg[0].comment.reverse()
        }
      })
    },
    isLike () {
      axios.post("/artworkHome/likeJudgment", {
        userId: this.userId,
        artworkId: this.artworkId,
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
    // 收藏状态
    likeStatus () {
      //判断是否收藏
      axios.post("/artworkHome/likeStatus", {
        userId: this.userId,
        artworkId: this.artworkId
      }).then(res => {
        if (res.data.msg != undefined) {
          this.iconStyle = "el-icon-star-on"
          this.iconStyle2 = "el-button--danger"
          this.like = true
        }
      })
    },
    downloadStatus () {
      // 判断是否为Vip
      axios.post("/artworkHome/isVip", {
        userId: this.userId,
      }).then(res => {
        if (res.data.msg[0].isVip) {
          this.isVip = false
          this.downloadUrl = this.artworkDetail.artworkImage
          this.downloadName = this.artworkDetail.artworkNameE + ".jpg"
        }
      })
    },
    submit () {
      if (this.inputContent == "") {
        this.$alert("", "评论内容不能为空", {
          confirmButtonText: '确定',
          center: true
        });
      } else {
        axios.post("/userHome/getUserData").then(res => {
          let theDate = new Date()
          let theTime = theDate.getFullYear() + "-" + (theDate.getMonth() + 1) + "-" + theDate.getDate() + " " + theDate.getHours() + ":" + theDate.getMinutes() + ":" + theDate.getSeconds()
          let params = {
            artworkId: this.artworkId,
            comment: {
              userId: res.data.msg.userId,
              userName: res.data.msg.nickName,
              time: theTime,
              content: this.inputContent
            }
          }
          axios.post("/artworkHome/submitComment", params).then(res => {
            if (res.data.status == "1001") {
              this.$notify.error({
                title: '提交失败',
                message: res.data.msg,
                duration: 2000,
                offset: 0
              });
            } else if (res.data.status == "0") {
              this.$notify({
                title: '提交成功',
                type: 'success',
                duration: 2000,
                offset: 0,
                onClose: () => {
                  this.$router.push({ path: "/Blank" })
                }
              });
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.artworkHome {
  &-section {
    margin-top: 50px;
    margin-bottom: 50px;
    &-basic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 350px;

      &-left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 50%;
        padding-left: 5%;

        &__artworkImage-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 480px;
          height: 240px;
          overflow: hidden;
        }

        &__artworkImage {
          max-width: 480px;
          max-height: 240px;
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        padding-right: 10%;

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

        &__artworkName {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 400px;
          height: 80px;
          font-size: 28px;
        }

        &__artworkNameE {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 400px;
          height: 40px;
          font-size: 18px;
        }

        &__author {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 400px;
          height: 40px;
          font-size: 18px;
        }

        &__artworkYear {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 400px;
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

      &__detail {
        width: 90%;
        margin-bottom: 50px;
      }
    }

    &-comment {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__label {
        height: 100px;
        line-height: 100px;
        font-size: 30px;
      }

      &-mine {
        width: 90%;
      }

      &-list {
        display: flex;
        flex-direction: column;
        width: 1000px;

        &__item {
          display: flex;
          flex-direction: row;
          height: 100px;
          width: 100%;
          border: 1px solid #eeeeee;
          border-radius: 4px;

          &-left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 20%;

            &-top {
              display: flex;
              align-items: center;
              &-sort {
                width: 50px;
                margin-left: 40px;
                text-align: center;
              }

              &-userName {
                flex: 1;
                margin-left: 10px;
                margin-right: 40px;
                text-align: center;
              }
            }
            &-bottom {
              margin-top: 20px;
              display: flex;
              align-items: center;

              &-time {
                flex: 1;
                margin: 0 30px;
                text-align: center;
              }
            }
          }

          &-right {
            display: flex;
            width: 80%;

            &-content {
              width: 760px;
              max-height: 78px;
              overflow: hidden;
              margin: 10px;
              padding: 5px;
              word-wrap: break-word;
              border: 1px solid #eeeeee;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}

.submit-button {
  margin-bottom: 0;
}
</style>