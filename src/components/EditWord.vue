<template>
  <div>
    <h2>修改单词</h2>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input
          placeholder="请输入要修改的新单词"
          prefix-icon="el-icon-edit el-input__icon"
          v-model="word"
          clearable
          ref="myinput"
          @keyup.native.enter="editWord">
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button
          icon="el-icon-upload"
          type="primary"
          plain
          @click="editWord">
        </el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'EditWord',
  data () {
    return {
      word: '',
      wordID: '',
      oldWord: ''
    }
  },
  methods: {
    editWord (done) {
      if (this.word === '' || this.word === this.oldWord) {
        this.$message({
          message: '请输入新的有效单词！',
          type: 'warning'
        })
        return
      }

      this.$confirm('确认本次修改吗？')
        .then(_ => {
          this.$http.post('/editWord', {word: this.word.toLowerCase(), wordID: this.wordID}).then(res => {
            this.$message({
              message: '修改成功，即将返回上级界面。',
              type: 'success'
            })
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
          done()
        })
        .catch(_ => {})
    }
  },
  created () {
    this.word = this.$route.query.word
    this.wordID = this.$route.query.wordID
    this.oldWord = this.word
  },
  mounted () {
    // 输入框自动对焦
    this.$refs.myinput.focus()
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
</style>
