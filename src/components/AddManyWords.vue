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
          <div class="radio-group">
            <el-radio-group v-model="strict" size="mini">
              <el-radio label="false" border>宽松模式</el-radio>
              <el-radio label="true" border>严格模式</el-radio>
            </el-radio-group>
          </div>
          <div class="btn-item">
            <el-button type="primary" plain @click="cleanWords">清空</el-button>
            <el-button type="primary" plain @click="addWords">提交</el-button>
          </div>
        </div>
        <div class="tips">
          <p v-show="strict === 'false'">
            提示：宽松模式下，自动忽略输入的非字母字符，并将单词直接添加进词库。
          </p>
          <p v-show="strict === 'true'">
            提示：严格模式下，若存在非字母字符，需手动清除非字母字符后才能添加进词库。
          </p>
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
      textarea: '',
      strict: 'false' // 是否对输入的单词使用宽松检查
    }
  },
  methods: {
    addWords () {
      if (this.textarea === '') {
        return
      }

      if (this.strict === 'true') {
        let res = /[^a-zA-Z\s]+/
        if (res.test(this.textarea) === true) {
          this.$message.error('严格模式：请手动清除非字母的字符！')
          return
        }
      }

      let wordsList = []
      let time = new Date()
      let date = time.getTime()
      let dateFormat = `${time.toLocaleDateString().split(' ')[0]}  ${time.toLocaleTimeString()}`
      let textareaFormat = this.textarea.match(/[a-zA-Z]+/g)

      if (textareaFormat !== null) {
        for (let i of textareaFormat) {
          wordsList.push({word: i, date: date, dateFormat: dateFormat})
        }

        this.$http.post('/addManyWords', {wordsList}).then(res => {
          this.notifyMessage('添加成功', `共添加了 ${wordsList.length} 条单词记录`, 'success')
        })
      } else {
        this.$message.warning('当前内容中未包含有效单词内容！')
      }
    },
    cleanWords () {
      this.textarea = ''
      this.$refs.myinput.focus()
    }
  },
  mounted () {
    // 输入框自动对焦
    this.$refs.myinput.focus()
  }
}
</script>

<style scoped>
  .btn-group {
    position: relative;
    margin-top: 15px;
    height: 40px;
  }

  .btn-item {
    position: absolute;
    right: 0;
  }

  .radio-group {
    position: absolute;
    left: 0;
  }

  .tips {
    position: relative;
    color: lightcoral;
    font-size: 14px;
    user-select: none;
  }
</style>
