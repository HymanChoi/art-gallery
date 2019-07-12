<template>
  <div class="nav-search">
    <h1 class="nav-search__title">艺术长廊</h1>
    <p class="nav-search__subtitle">畅游艺术世界 品味别样人生</p>
    <div class="nav-search-form-group">
      <el-input placeholder="关键字" v-model="inputContent" class="input-with-select nav-search-form-group__input">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="艺术家" value="1"></el-option>
          <el-option label="艺术品" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      inputContent: "",
      select: ""
    };
  },
  methods: {
    search () {
      if (this.select == "") {
        this.$alert("", "搜索类型不能为空", {
          confirmButtonText: '确定',
          center: true
        });
      } else if (this.inputContent == "") {
        this.$alert("", "搜索内容不能为空", {
          confirmButtonText: '确定',
          center: true
        });
      } else {
        if (this.select == "1") {
          let param = {
            artistName: this.inputContent
          }
          axios.post("/search/searchArtists", param).then(res => {
            if (res.data.status == "1") {
              this.$alert("", "找不到 “" + this.inputContent + "”", {
                confirmButtonText: '确定',
                center: true,
                callback: () => {
                  this.inputContent = ""
                }
              });
            } else {
              this.$router.push({ path: "/ArtistHome/" + res.data.msg })
            }
          })
        } else if (this.select == "2") {
          let param = {
            artworkName: this.inputContent
          }
          axios.post("/search/searchArtworks", param).then(res => {
            if (res.data.status == "1") {
              this.$alert("", "找不到 “" + this.inputContent + "”", {
                confirmButtonText: '确定',
                center: true,
                callback: () => {
                  this.inputContent = ""
                }
              });
            } else {
              this.$router.push({ path: "/ArtworkHome/" + res.data.msg })
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.nav-search {
  text-align: center;
  background-color: #409eff;

  & .nav-search__title {
    padding-top: 30px;
    font-size: 56px;
    color: #fff;
    text-shadow: -5px 5px 0 rgba(0, 0, 0, 0.1);
  }

  & .nav-search__subtitle {
    padding-top: 30px;
    color: #fff;
    font-size: 20px;
  }

  & .nav-search-form-group {
    padding-top: 30px;
    padding-bottom: 100px;

    & .nav-search-form-group__input {
      width: 450px;
    }
  }
}

.el-select .el-input {
  width: 90px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>