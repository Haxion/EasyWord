<template>
  <div id="app">
    <el-container style="height: 100%">
      <!--顶部-->
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <!--内容区-->
      <el-container>
        <!--侧栏-->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);border-bottom: 1px solid #eee">
          <el-menu router :default-openeds="['1', '2', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-circle-plus-outline"></i>添加单词</template>
              <el-menu-item index="/dictionary/addOneWord">
                <i class="iconfont icon-danhangshurukuang icon-fontsize"></i>
                单个输入
              </el-menu-item>
              <el-menu-item index="/dictionary/addManyWords">
                <i class="iconfont icon-duohangshurukuang icon-fontsize"></i>
                一次性输入
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-search"></i>查询单词</template>
              <el-menu-item index="/dictionary/searchByDate">
                <i class="iconfont icon-riqi icon-fontsize"></i>
                选日期查询
              </el-menu-item>
              <el-menu-item index="/dictionary/searchByLetters">
                <i class="iconfont icon-sort icon-fontsize"></i>
                按字母查询
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-view"></i>复习单词</template>
              <el-menu-item index="/dictionary/reviewCards">
                <i class="iconfont icon-qiapian icon-fontsize"></i>
                复习卡片
              </el-menu-item>
              <el-menu-item index="/dictionary/bulletScreen">
                <i class="iconfont icon-sudu icon-fontsize"></i>
                弹幕挑战
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside >
        <!--右侧数据-->
        <el-main>
          <!--<keep-alive>-->
            <router-view></router-view>
          <!--</keep-alive>-->
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    // 消息通知
    notifyMessage (title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      })
    },
    editWord (index, row) {
      let wordID = row._id

      this.$prompt('请输入新单词', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z]+$/i,
        inputErrorMessage: '请输入正确的单词！'
      }).then(({ value }) => {
        row.word = value // 重置当前选择行的单词为新输入的单词
        this.$http.post('/editWord', {word: row.word, wordID: wordID}).then(res => {
          this.$message({
            message: '修改成功。',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
      })
    }
  },
  provide: function () {
    return {
      notifyMessage: this.notifyMessage,
      editWord: this.editWord
    }
  }
}
</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .icon-fontsize{
    font-size: 20px;
  }

  .el-main{
    min-width: 830px;
  }

</style>
