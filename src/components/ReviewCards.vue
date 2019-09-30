<template>
  <div>
    <!-- 标题及按钮 -->
    <div class="title">
      <h2>复习最近 {{this.totalValue}} 天的单词</h2>
      <el-button icon="el-icon-setting" circle title="设置" @click="drawer = true"></el-button>
    </div>

    <!-- 单词卡片 -->
    <div class="card-container">
      <div class="card" v-for="item in wordsList" :key="item.id" :class="[cardBackGround[Math.round(Math.random() * 6 + 1)]]">
        <span>{{item.word}}</span>
      </div>
    </div>

    <!-- 抽屉 -->
    <el-drawer
      title="设置复习的时间范围"
      align="center"
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="setDays">
      <div class="slider">
        <p>当前选择 <span>{{this.sliderValue}}</span> 天</p>
        <el-slider
          v-model="sliderValue"
          :max="14"
          :min="1"
          show-stops>
        </el-slider>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ReviewCards',
  data () {
    return {
      wordsList: [],
      cardBackGround: [],
      drawer: false,
      direction: 'btt',
      totalValue: 3,
      sliderValue: 3
    }
  },
  methods: {
    getWords () {
      this.$http.post('/reviewCards', {totalDays: this.totalValue}).then(res => {
        this.wordsList = res.data
      })
    },
    setDays (done) {
      this.$confirm('确认本次设置？')
        .then(_ => {
          this.totalValue = this.sliderValue
          this.getWords()
          done()
        })
        .catch(_ => { done() })
    }
  },
  created () {
    this.getWords()

    for (var i = 1; i <= 7; i++) {
      this.cardBackGround.push(`card-background-day${i}`)
    }
  }
}
</script>

<style scoped>

  .title {
    position: relative;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  .title button {
    position: absolute;
    right: 0;
    top: 0;
  }
  .card-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .card {
    position: relative;
    margin: 15px;
    width: 260px;
    height: 160px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 5px 8px rgba(57, 0, 57, 0.62);
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width,height,margin .5s;
  }

  .card:hover span{
    font-size: 32px;
  }

  .card span {
    color: #ffffff;
    font-size: 28px;
    word-wrap: break-word;
    transition: font-size .2s ease;
  }

  .slider {
    position: relative;
    width: 60%;
    left: -20px;
    line-height: 25px;
  }

  .slider p {
    margin: 10px;
    line-height: 25px;
  }

  .slider span{
    font-weight: bold;
    font-size: 25px;
    color: #2c90dd;
  }

  .card-background-day1 {
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  }

  .card-background-day2 {
    background-color: #08AEEA;
    background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%);
  }

  .card-background-day3 {
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  }

  .card-background-day4 {
    background-color: #74EBD5;
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
  }

  .card-background-day5 {
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
  }

  .card-background-day6 {
    background-color: #FEE140;
    background-image: linear-gradient(225deg, #FEE140 0%, #FA709A 100%);
  }

  .card-background-day7 {
    background-color: #3b7fff;
    background-image: linear-gradient(147deg, #3b7fff 0%, #25ffed 74%);
  }
</style>
