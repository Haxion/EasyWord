<template>
  <div class="block">
    <el-row>
      <el-col align="center">
        <h2>按日期查询</h2>
      </el-col>

      <!--日期选择器-->
      <el-col align="center">
        <div class="block">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            @change="getWords"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
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
          class-name="col-red"
          width="230">
        </el-table-column>
        <el-table-column
          prop="dateFormat"
          label="添加日期"
          align="center"
          width="180">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SearchByDate',
  inject: ['notifyMessage'],
  data () {
    return {
      dateRange: '',
      wordsList: []
    }
  },
  methods: {
    // 获取对应日期的单词
    getWords (date) {
      if (date === null) {
        return
      }

      date = date.map(item => item.getTime()) // 获取格式化成时间戳的日期

      this.$http.post('/searchByDate', {date}).then(res => {
        this.wordsList = res.data

        if (this.wordsList.length === 0) {
          this.notifyMessage('查询失败', `该日期范围内没有单词记录。`, 'warning')
          return
        }

        this.notifyMessage('查询成功', `共有 ${this.wordsList.length} 个单词。`, 'success')
      })
    }
  }
}
</script>

<style scoped>
  .table {
    position: relative;
    margin: 30px auto;
    width: 460px;
  }
</style>
