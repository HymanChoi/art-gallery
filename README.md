# ArtGallery

#### 介绍
艺术长廊

#### 项目结构
```
| - build  
| - config  
| - mock       -- json静态数据  
| - resource   -- 静态资源文件  
| - server     -- express框架后端文件  
| - | - models  
| - | - | - artworks.js   -- 艺术家数据模型  
| - | - | - artists.js    -- 艺术品数据模型  
| - | - | - users.js      -- 用户数据模型  
| - | - routes  
| - | - | - artists.js    -- 艺术家相关接口  
| - | - | - artworks.js   -- 艺术品相关接口  
| - | - | - users.js      -- 用户相关接口  
| - src  
| - | - assets   -- 样式文件  
| - | - components  
| - | - | - ModalBox.vue    -- 模态框组件  
| - | - | - NavHeader.vue   -- 头部组件  
| - | - | - NavSearch.vue   -- 搜索框组件  
| - | - | - NavFooter.vue   -- 底部组件  
| - | - router   -- 路由配置文件  
| - | - util     -- 公用方法文件  
| - | - views  
| - | - | - Home.vue              -- 商品列表页组件  
| - | - | - ArtistsList.vue       -- 艺术家列表页组件  
| - | - | - ArtistHome.vue        -- 艺术家主页组件  
| - | - | - ArtworksList.vue      -- 艺术品列表页组件  
| - | - | - ArtworkHome.vue       -- 艺术品主页组件  
| - | - | - RankingLists.vue      -- 排行榜列表页组件  
| - | - | - RankingListHome.vue   -- 排行榜主页组件  
| - | - | - UserHome.vue          -- 个人主页组件  
| - | - | - Upload.vue            -- 上传页组件  
| - | - | - ErrorCorrection.vue   -- 纠错页组件  
| - | - | - Review.vue            -- 审核页组件  
| - | - App.vue  
| - | - main.js  
| - static   -- 项目所用图片，图标
```

#### 项目架构
Vue + Express + MongoDB

#### 安装教程
1. Project setup
```
npm install
```
2. Compiles and hot-reloads for development
```
npm run serve
```
3. Compiles and minifies for production
```
npm run build
```

#### 使用说明

1. xxxx
2. xxxx
3. xxxx
