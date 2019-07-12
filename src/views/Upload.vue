<template>
  <div class="upload">
    <nav-header></nav-header>
    <section class="upload-section wrap clearfix">
      <el-menu :default-active="menuOption" class="upload-section__tab">
        <el-menu-item index="1" @click="switchMenuOption('1')">
          <i class="el-icon-upload"></i>
          <span slot="title">上传艺术家</span>
        </el-menu-item>
        <el-menu-item index="2" @click="switchMenuOption('2')">
          <i class="el-icon-upload"></i>
          <span slot="title">上传艺术品</span>
        </el-menu-item>
      </el-menu>

      <div class="upload-section-content">
        <el-card>
          <div class="upload-section-content-top">
            <el-upload class="upload-demo" drag action="/upload/artist" enctype="multipart/form-data" name="artist" :limit="1" :on-success="success" :on-error="error" :disabled="isShowUpload" v-show="menuOption == '1' ? true : false" :file-list="imageArray">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过3M</div>
            </el-upload>
            <el-upload class="upload-demo" drag action="/upload/artwork" enctype="multipart/form-data" name="artwork" :limit="1" :on-success="success" :on-error="error" :disabled="isShowUpload" v-show="menuOption == '2' ? true : false" :file-list="imageArray">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过3M</div>
            </el-upload>
          </div>

          <div class="upload-section-content-bottom">
            <!-- 艺术家上传表单 -->
            <el-form ref="form" :model="artistForm" label-width="100px" v-show="menuOption == '1' ? true : false">
              <el-form-item label="中文名称">
                <el-input v-model="artistForm.artistName" placeholder="列奥纳多·达·芬奇"></el-input>
              </el-form-item>

              <el-form-item label="英文名称">
                <el-input v-model="artistForm.artistNameE" placeholder="Leonardo da Vinci"></el-input>
              </el-form-item>

              <el-form-item label="出生年月">
                <el-input v-model="artistForm.artistYear" placeholder="1452.04.15－1519.05.02"></el-input>
              </el-form-item>

              <el-form-item label="国籍">
                <el-input v-model="artistForm.artistCountry" placeholder="意大利"></el-input>
              </el-form-item>

              <el-form-item label="地区">
                <el-select v-model="artistForm.artistContinent" placeholder="请选择地区" style="width:500px;">
                  <el-option label="亚洲" value="亚洲"></el-option>
                  <el-option label="欧洲" value="欧洲"></el-option>
                  <el-option label="美洲" value="美洲"></el-option>
                  <el-option label="非洲" value="非洲"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="详情">
                <el-input type="textarea" autosize resize="none" v-model="artistForm.detail" placeholder="列奥纳多·达·芬奇，是意大利文艺复兴时期的一个博学者：在绘画、音乐、建筑、数学、几何学、解剖学、生理学、动物学、植物学、天文学、气象学、地质学、地理学、物理学、光学、力学、发明、土木工程等领域都有显著的成就。这使他成为文艺复兴时期人文主义的代表人物，也使得他成为文艺复兴时期典型的艺术家，也是历史上最著名的画家之一，与米开朗基罗和拉斐尔并称文艺复兴三杰。"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width:245px;">提交</el-button>
                <el-button style="width:245px;" @click="resetField">重置</el-button>
              </el-form-item>
            </el-form>

            <!-- 艺术品上传表单 -->
            <el-form ref="form" :model="artistForm" label-width="100px" v-show="menuOption == '2' ? true : false">
              <el-form-item label="中文名称">
                <el-input v-model="artworkForm.artworkName" placeholder="蒙娜丽莎"></el-input>
              </el-form-item>

              <el-form-item label="英文名称">
                <el-input v-model="artworkForm.artworkNameE" placeholder="La Gioconda"></el-input>
              </el-form-item>

              <el-form-item label="作者">
                <el-input v-model="artworkForm.author" placeholder="列奥纳多·达·芬奇"></el-input>
              </el-form-item>
              <el-form-item label="创作时间">
                <el-input v-model="artworkForm.artworkYear" placeholder="1502–1506"></el-input>
              </el-form-item>

              <el-form-item label="收藏地">
                <el-input v-model="artworkForm.place" placeholder="卢浮宫，法国巴黎"></el-input>
              </el-form-item>

              <el-form-item label="类型">
                <el-select v-model="artworkForm.artworkType" placeholder="请选择类型" style="width:500px;">
                  <el-option label="油画" value="油画"></el-option>
                  <el-option label="壁画" value="壁画"></el-option>
                  <el-option label="国画" value="国画"></el-option>
                  <el-option label="书法" value="书法"></el-option>
                  <el-option label="其他" value="other"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="详情">
                <el-input type="textarea" autosize resize="none" v-model="artworkForm.detail" placeholder="《蒙娜丽莎》是文艺复兴时期画家列奥纳多·达·芬奇所绘的代表作之一。"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width:245px;">提交</el-button>
                <el-button style="width:245px;" @click="resetField">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
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
  name: "upload",
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      userId: "",
      imageArray: [],
      isShowUpload: false,
      artistForm: {
        artistName: "",
        artistNameE: "",
        artistYear: "",
        artistCountry: "",
        artistContinent: "",
        detail: ""
      },
      artworkForm: {
        artworkName: "",
        artworkNameE: "",
        artworkYear: "",
        author: "",
        artworkType: "",
        detail: "",
        place: ""
      },
      menuOption: "1"
    };
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    // 检查是否登录
    checkLogin () {
      axios.get("/users/checkLogin").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.userId = res.result[2]
        }
      })
    },
    onSubmit () {
      if (this.menuOption == "1") {
        let params = this.artistForm
        let paramPlus = { userId: this.userId }
        params = Object.assign(params, paramPlus)
        axios.post("/upload/artistForm", params).then(res => {
          if (res.data.status == "1") {
            this.$message.error({
              message: res.data.msg
            });
          } else {
            if (res.data.status == "1001") {
              this.$message.error({
                message: res.data.msg,
                duration: 2000,
                onClose: () => {
                  this.artistForm = {}
                }
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "success",
                duration: 2000,
                onClose: () => {
                  this.resetField()
                  this.imageArray = []
                  this.isShowUpload = false
                }
              });
            }
          }
        })
      } else {
        let params = this.artworkForm
        let paramPlus = { userId: this.userId }
        params = Object.assign(params, paramPlus)
        axios.post("/upload/artworkForm", params).then(res => {
          if (res.data.status == "1") {
            this.$message.error({
              message: res.data.msg
            });
          } else {
            if (res.data.status == "1001") {
              this.$message.error({
                message: res.data.msg,
                duration: 2000,
                onClose: () => {
                  this.artworkForm = {}
                }
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "success",
                duration: 2000,
                onClose: () => {
                  this.resetField()
                  this.imageArray = []
                  this.isShowUpload = false
                }
              });
            }
          }
        })
      }
    },
    resetField () {
      this.artistForm = {}
      this.artworkForm = {}
    },
    success (response, file, fileList) {
      if (response.status == "1001") {
        this.$message.error({
          message: response.msg,
          duration: 2000,
          onClose: () => {
            this.imageArray = []
          }
        });
      } else {
        this.$message({
          message: '上传成功',
          type: 'success',
          onClose: () => {
            this.isShowUpload = true
          }
        });
      }
    },
    error (err, file, fileList) {
      console.log(err)
      console.log(file.status)
      if (file.status == "fail") {
        this.$message.error('上传失败, 超出文件大小限制')
      }
    },
    switchMenuOption (index) {
      this.menuOption = index
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-section {
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
}

.upload-section__tab {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.upload-section-content {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 50px;
}

.upload-section-content-top {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  .el-upload__tip {
    display: flex;
    justify-content: center;
  }
}

.upload-section-content-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-textarea {
  width: 600px;
}
</style>