<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import "./assets/css/reset.css";
  import "./assets/css/base.css";

  export default {
    data() {
      return {}
    },
    mounted() {
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
      })
    }
  };
</script>