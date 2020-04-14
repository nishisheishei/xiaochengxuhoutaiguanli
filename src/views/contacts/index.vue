<template>
  <div>
    正在建设ing
    <!-- 父传子  单向数据流-->
      <!-- <div style="color:red">{{ msg }}</div>
      <contacts v-bind:message="msg"></contacts>
      <button @click="msg++">点击按钮msg++</button>
      <br>
      <br> -->

      <!-- <contacts v-bind:message="msg"></contacts> -->

      <!-- 子传父 -->
      <!-- <contacts ref="coma"></contacts> -->
      
      <!-- <button @click="handleClick">点击获取contacts组件中的数据</button> -->


      <!-- <contacts @path="handleShadow"></contacts> -->
  </div>
</template>

<script>
// 组件的路径
import contacts from '@/components/contacts'

export default {
  // 定义组件
  components: {
    contacts
  },
  data () {
    return {
      msg: '0',
      // mag: '0123'
    }
  },
  methods: {
    handleClick () {
      // console.log(this.$refs['coma'])
      let coma = this.$refs['coma']
      coma.cont++
    },

    handleShadow(text) {
      console.log(text)
      text++
    }
  }
}
</script>

<style>

</style>