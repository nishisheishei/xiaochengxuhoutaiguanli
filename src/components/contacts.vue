<template>
  <div>
      <!-- <div>{{ message }}</div>
      <div>{{ clonemessage }}</div>
      <button @click="clonemessage++">点击按钮</button> -->
      <!-- <div>{{ cont }}</div> -->

      <button @click="handleEmit">使用$emit</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  // },
  data () {
    return {
      cont: 0,

      // 如果将修改message数据 可以这样
      clonemessage: this.message
    }
  },

  methods: {
    handleEmit() {
      this.$emit('path', this.cont)
    }
  }
}
</script>

<style>

</style>