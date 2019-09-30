<template>
  <div>
    <el-row>
      <el-col align="center">
        <h2>按字母查询</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10" align="center">
        <el-input
          placeholder="输入待查找单词包含的字母，不确定的部分用空格代替"
          prefix-icon="el-icon-search"
          ref="myinput"
          clearable
          autofocus
          v-model="input"
          @keyup.native.enter="getWords(input)">
        </el-input>
      </el-col>
    </el-row>

    <!--表格数据展示-->
    <div class="table">
      <el-table
        :data="wordsList"
        stripe
        highlight-current-row
        fit
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="word"
          label="单词"
          align="center"
          width="230">
        </el-table-column>
        <el-table-column
          prop="dateFormat"
          label="添加日期"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editWord(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteWord(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchByLetters',
  inject: ['notifyMessage', 'editWord'],
  data () {
    return {
      input: '',
      oldInput: '',
      wordsList: []
    }
  },
  methods: {
    getWords (letter) {
      if (letter === '' || letter === this.oldInput || /^\s*$/.test(letter)) {
        return
      }

      this.oldInput = this.input

      this.$http.post('/searchByLetters', {word: letter}).then(res => {
        this.wordsList = res.data

        if (this.wordsList.length === 0) {
          this.notifyMessage('查询失败', `未找到包含上述字母的单词记录。`, 'warning')
          return
        }

        this.notifyMessage('查询成功', `共有 ${this.wordsList.length} 个单词。`, 'success')
      })
    },
    deleteWord (index, row, done) {
      let word = row.word
      let wordID = row._id
      this.$confirm(`确认删除 ${word} 吗？`)
        .then(_ => {
          this.input = ''
          this.wordsList.splice(index, 1)
          this.$http.post('/deleteWord', {wordID: wordID}).then(res => {
            this.$message({
              message: `原单词 ${word} 删除成功`,
              type: 'success'
            })
          })
        })
        .catch(_ => {})
      console.log(index, row)
    }
  },
  mounted () {
    this.$refs.myinput.focus()
  }
}
</script>

<style scoped>
  .table {
    position: relative;
    margin: 30px auto;
    width: 640px;
  }
</style>
