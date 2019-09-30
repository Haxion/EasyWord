<template>
  <div class="container">
    <p>这是弹幕</p>
    <!-- 弹幕区域 -->
    <div class="bullet-screen-area">
      <div class="bullet-screen-track">
        <div class="bullet-screen-item" ref="item1">
          <!--<span>弹幕.....</span>-->
          <span v-for="item in wordsList.slice(0,9)" :key="item.id" :style="{color: getHex(), fontSize: getFontSize()}">{{item.word}}</span>
        </div>
      </div>
      <div class="bullet-screen-track">
        <div class="bullet-screen-item" ref="item2">
          <!--<span>弹幕.....</span>-->
          <span v-for="item in wordsList.slice(10,19)" :key="item.id"
                :style="{color: getHex(), fontSize: getFontSize()}">{{item.word}}</span>
        </div>
      </div>
      <div class="bullet-screen-track">
        <div class="bullet-screen-item" ref="item3">
          <!--<span>弹幕.....</span>-->
          <span v-for="item in wordsList.slice(20,29)" :key="item.id"
                :style="{color: getHex(), fontSize: getFontSize()}">{{item.word}}</span>
        </div>
      </div>
    </div>
    <!-- 控制区域 -->
    <div class="control-area">
      <el-button type="primary" plain @click="begin">开始</el-button>
      <el-button type="danger" plain @click="stop">结束</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BulletScreen',
  data () {
    return {
      wordsList: [],
      isBegin: false,
      colorList: ['#FE0302', '#FE0302', '#FFAA02', '#FFD302', '#CC0273', '#A0EE00', '#00CD00']
    }
  },
  methods: {
    showItem () {
      console.log(this.$refs)
    },
    getHex () {
      let random = Math.floor(Math.random() * this.colorList.length)
      return this.colorList[random]
    },
    getFontSize () {
      let random = Math.floor(Math.random() * 20 + 20)
      return random + 'px'
    },
    // 停止弹幕
    stop () {
      if (this.isBegin === false) {
        return
      }
      this.isBegin = false
      for (let i in this.$refs) {
        let myClassList = this.$refs[i].classList // 获取类名数组
        let animationClassName = 'bullet-screen-animation'// 设置动画类名
        myClassList.remove(animationClassName) // 删除动画类名
      }
    },
    // 开启弹幕
    begin () {
      if (this.isBegin === true) {
        return
      }
      this.isBegin = true
      for (let i in this.$refs) {
        let myClassList = this.$refs[i].classList // 获取类名数组
        let animationClassName = 'bullet-screen-animation' // 设置动画类名
        myClassList.add(animationClassName) // 添加动画类名
      }
    }
  },
  created: function () {
    this.$http.get('/bulletScreen').then(res => {
      this.wordsList = res.data
    })
  },
  mounted () {
    this.showItem()
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  /*弹幕区域*/
  .bullet-screen-area {
    position: relative;
    width: 100%;
    height: 50%;
    /*background: darkgray;*/
  }

  /*弹幕轨道*/
  .bullet-screen-track {
    position: relative;
    margin-top: 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    /*background: aquamarine;*/
    overflow: hidden;
  }

  /*弹幕*/
  .bullet-screen-item {
    position: relative;
    left: 100%;
    display: flex;
    justify-content: space-around;
  }

  /*弹幕文字样式*/
  .bullet-screen-item span {
    color: #ffffff;
    font-weight: bold;
  }

  .bullet-screen-animation {
    animation: bullet-screen-item 10s linear infinite;
    animation-fill-mode: both;
  }

  @keyframes bullet-screen-item {
    0% {
      left: 100%;
    }
    100% {
      left: -100%;
    }
  }

  .control-area {
    position: relative;
    margin-top: 50px;
    width: 100%;
    height: 30%;
    background: green;
  }
</style>
