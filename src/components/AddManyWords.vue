<template>
  <div>
    <el-row>
      <el-col align="center">
        <label for="input">
          <h2>一次性录入</h2>
        </label>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input
          id="input"
          ref="myinput"
          type="textarea"
          resize="none"
          :rows="20"
          autofocus
          placeholder="请输入内容"
          label="一次性录入"
          v-model="textarea">
        </el-input>
        <div class="btn-group">
          <div class="btn-item">
            <el-button type="primary" plain @click="cleanWords">清空</el-button>
            <el-button type="primary" plain @click="addWords">提交</el-button>
          </div>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddManyWords',
  inject: ['notifyMessage'],
  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    addWords () {
      if (this.textarea === '') {
        return
      }
      let wordsList = []
      let time = new Date()
      let date = time.getTime()
      let dateFormat = `${time.toLocaleDateString().split(' ')[0]}  ${time.toLocaleTimeString()}`
      let textareaFormat = this.textarea.split(/(\s*\n+\s*)/)

      for (let i of textareaFormat) {
        if (/(\s*\n+\s*)/.test(i) === false && i !== '') {
          wordsList.push({word: i, date: date, dateFormat: dateFormat})
        }
      }

      this.$http.post('/addManyWords', {wordsList}).then(res => {
        this.notifyMessage('添加成功', `共添加了 ${wordsList.length} 条单词记录`, 'success')
      })
    },
    cleanWords () {
      this.textarea = ''
      this.$refs.myinput.focus()
    }
  }
}
</script>

<style scoped>
 .btn-group {
  position: relative;
   margin-top: 30px;
   background: lightcoral;
 }

  .btn-item {
    position: absolute;
    right: 0;
  }
</style>
