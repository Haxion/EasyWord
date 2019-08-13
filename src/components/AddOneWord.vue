<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col align="center">
        <h2>单词录入</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-edit el-input__icon"
          v-model="input"
          clearable
          ref="myinput"
          @keyup.native.enter="addWord">
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button icon="el-icon-upload" type="primary" plain @click="addWord"></el-button>
      </el-col>
    </el-row>

    <!-- 引入单词卡片组件 -->
    <word-cards :word-cards="wordCards"></word-cards>
  </div>

</template>

<script>
import WordCards from './WordCards'

export default {
  name: 'AddOneWord',
  inject: ['notifyMessage'],
  data () {
    return {
      input: '',
      wordCards: ['welcome', 'to', 'my', 'dicitonary', 'enjoy!']
    }
  },
  methods: {
    // 添加一个单词
    addWord () {
      if (this.input === '') {
        return
      }

      let time = new Date()
      let wordData = {
        date: time.getTime(),
        word: this.input.toLowerCase(),
        dateFormat: `${time.toLocaleDateString().split(' ')[0]}  ${time.toLocaleTimeString()}`
      }

      this.$http.post('/addOneWord', wordData).then(res => {
        this.notifyMessage('添加成功', '', 'success')
      })
    }
  },
  created () {
    // 自动获取单词卡片的数据
    this.$http.get('/addOneWord/cardWords').then(res => {
      this.wordCards = res.data

      this.$refs.myinput.focus() // 输入框自动对焦
    })
  },
  components: {
    WordCards
  }
}
</script>

<style scoped>

</style>
