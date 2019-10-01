<template>
  <div class="container">
    <glitch v-if="isGlitchShow"></glitch>
    <div class="bullet-container">
      <canvas id="canvas" width="400" height="400"></canvas>
    </div>

    <!--单词选项-->
    <div class="word-check" v-if="isWordCheckShow">
      <p>请选出弹幕中出现的所有单词</p>
      <el-checkbox-group v-model="checkList" class="word">
        <el-checkbox-button class="word-option" v-for="(item,index) in wordsList.slice(0,6)" :label="item" :key="index">
          {{item}}
        </el-checkbox-button>
      </el-checkbox-group>
      <el-checkbox-group v-model="checkList" class="word">
        <el-checkbox-button class="word-option" v-for="(item,index) in wordsList.slice(6,12)" :label="item"
                            :key="index">{{item}}
        </el-checkbox-button>
      </el-checkbox-group>
      <el-checkbox-group v-model="checkList" class="word">
        <el-checkbox-button class="word-option" v-for="(item,index) in wordsList.slice(12,18)" :label="item"
                            :key="index">{{item}}
        </el-checkbox-button>
      </el-checkbox-group>
      <el-checkbox-group v-model="checkList" class="word">
        <el-checkbox-button class="word-option" v-for="(item,index) in wordsList.slice(18,24)" :label="item"
                            :key="index">{{item}}
        </el-checkbox-button>
      </el-checkbox-group>
      <el-checkbox-group v-model="checkList" class="word">
        <el-checkbox-button class="word-option" v-for="(item,index) in wordsList.slice(24,30)" :label="item"
                            :key="index">{{item}}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>

    <!--控制按钮-->
    <div class="btn-group">
        <el-button type="primary" round @click="start">开始挑战</el-button>
        <el-button type="danger" round @click="end">结束挑战</el-button>
        <el-button type="success" round @click="confirm">验证结果</el-button>
    </div>
  </div>
</template>

<script>
import Glitch from '../components/Glitch'
export default {
  name: 'BulletScreen',
  components: {
    Glitch
  },
  data () {
    return {
      wordsList: [], // 总单词数组
      colorList: ['#FE0302', '#FE0302', '#FFAA02', '#FFD302', '#CC0273', '#A0EE00', '#00CD00'], // 弹幕颜色数组
      distance: 0, // 每个弹幕的距离
      bulletItem: [], // 保存弹幕实例数组
      bulletTrack: [50, 100, 200, 300], // 弹幕轨道的高度
      bulletPosition: [], // 弹幕实例坐标数组
      recycleBulletItem: [], // 收集结束的弹幕数组
      isBulletScreenRunning: false, // 弹幕是否开启
      requestAnimationFrameID: [], // 动画序号数组
      canvas: {
        speed: 5 // 弹幕速度
      },
      freshFn: this.bulletWordAnimation.bind(this), // 动画刷新,
      checkList: [], // 单词勾选结果数组
      isWordCheckShow: false, // 单词选项是否显示
      isGlitchShow: true // glitch 文字是否显现
    }
  },
  methods: {
    // 创建弹幕实例
    createBulletWord () {
      console.log(this.wordsList.slice(0, 20))
      this.canvas.el = document.getElementById('canvas') // 获取 canvas
      this.canvas.containerWidth = this.canvas.el.parentElement.clientWidth // 获取父容器宽度
      this.distance = this.canvas.containerWidth

      this.canvas.el.width = this.canvas.containerWidth // 设置 canvas 宽度

      this.canvas.ctx = this.canvas.el.getContext('2d')
      this.canvas.ctx.fillStyle = '#000000'
      this.canvas.ctx.fillRect(0, 0, this.canvas.el.width, this.canvas.el.height) // canvas 范围

      class BulletWord {
        constructor (word, color, fontSize, positionX, positionY) {
          this.word = word
          this.color = color
          this.font = fontSize
          this.positionX = positionX
          this.positionY = positionY
        }
      }

      // 如果当前弹幕实例数组为空
      for (let word of this.wordsList.slice(0, 20)) {
        let params = this.initBulletItem()
        let bulletWord = new BulletWord(word, ...params)
        this.bulletItem.push(bulletWord)
      }

      this.requestAnimationFrameID.push(window.requestAnimationFrame(this.freshFn))
    },
    // 刷新动画
    bulletWordAnimation () {
      this.canvas.ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height)

      for (let item of this.bulletItem) {
        if (item.positionX < -300) {
          item.positionX = this.canvas.el.width
          this.recycleBulletItem.push(this.bulletItem.shift())

          if (this.bulletItem.length === 0) {
            this.end()
            return
          }
        } else {
          item.positionX -= this.canvas.speed
          this.canvas.ctx.fillStyle = item.color // 设置 canvas 背景
          this.canvas.ctx.font = item.font // 设置文本大小
          this.canvas.ctx.fillText(item.word, item.positionX, item.positionY, 150) // 设置文本
        }
      }

      this.requestAnimationFrameID.push(window.requestAnimationFrame(this.freshFn))
    },
    // 初始化弹幕实例的属性
    initBulletItem () {
      let color = this.colorList[Math.floor(Math.random() * this.colorList.length)]
      let font = Math.floor(30 + Math.random() * 5) + 'px sans-serif'
      this.distance += Math.floor(180 + Math.random() * 15)
      let positionX = this.distance
      let positionY = this.bulletTrack[Math.floor(Math.random() * this.bulletTrack.length)]
      this.bulletPosition.push([positionX, positionY])

      return [color, font, positionX, positionY]
    },
    // 开启弹幕
    start () {
      if (!this.isBulletScreenRunning) {
        this.isBulletScreenRunning = true // 弹幕状态设置为开启
        this.isWordCheckShow = false // 关闭显示单词列表
        this.isGlitchShow = false // 关闭 glitch 文字
        this.checkList = [] // 重置已选单词数组
        window.onresize = this.resizeWindow.bind(this) // 设置 canvas 自动根据窗口调整

        if (this.bulletItem.length === 0) {
          this.createBulletWord() // 生成弹幕实例
        } else {
          this.requestAnimationFrameID.push(window.requestAnimationFrame(this.freshFn)) // 重新执行动画
        }
      }
    },
    // 关闭弹幕
    end () {
      if (this.isBulletScreenRunning) {
        this.isBulletScreenRunning = false // 弹幕状态设置为关闭
        this.isWordCheckShow = true // 开启显示单词列表

        for (let id of this.requestAnimationFrameID) {
          window.cancelAnimationFrame(id) // 清除动画
        }

        this.requestAnimationFrameID = [] // 清空动画 id 数组

        this.bulletItem = this.recycleBulletItem.concat(this.bulletItem)
        this.recycleBulletItem = []

        this.canvas.ctx.fillStyle = '#000000'
        this.canvas.ctx.fillRect(0, 0, this.canvas.el.width, this.canvas.el.height) // canvas 范围

        for (let index = 0; index < this.bulletItem.length; index++) {
          this.bulletItem[index].positionX = this.bulletPosition[index][0] // 恢复弹幕实例的初始 x
          this.bulletItem[index].positionY = this.bulletPosition[index][1] // 恢复弹幕实例的初始 y
        }
      }
    },
    confirm () {
      let wordList = JSON.parse(JSON.stringify(this.wordsList.slice(0, 20))).sort()
      let checkList = JSON.parse(JSON.stringify(this.checkList)).sort()
      let result = wordList.toString() === checkList.toString() ? '正确选出出现的所有单词，挑战成功！' : '未正确选出出现的所有单词，挑战失败！'

      this.$alert(result, '挑战结果', {
        confirmButtonText: '确定'
      })
    },
    resizeWindow () {
      this.canvas.el.width = this.canvas.el.parentElement.clientWidth
    }
  },
  created () {
    this.$http.get('/bulletScreen').then(res => {
      for (let item of res.data) {
        this.wordsList.push(item.word)
      }
    })
  }
}

</script>

<style scoped>
  /*总容器*/
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    background: black;
    overflow: hidden;
  }

  @keyframes background-gradient {
    from {
      background: aliceblue;
    }
    to {
      background: black;
    }
  }

  /*弹幕容器*/
  .bullet-container {
    position: relative;
    width: 100%;
    height: 400px;
  }

  /*控制按钮*/
  .btn-group {
    position: relative;
    top: 50px;
    margin: 0 auto;
    width: 400px;
    display: flex;
    justify-content: space-around;
  }

  /*单词选项*/
  .word-check {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 672px;
  }

  .word-check p {
    color: #ffffff;
    text-align: center;
    user-select: none;
  }

  .word {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .word-option {
    position: relative;
    margin: 5px 2px;
  }

</style>
