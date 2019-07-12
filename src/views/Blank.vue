<template>
  <div id="Blank">

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    this.back()
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
