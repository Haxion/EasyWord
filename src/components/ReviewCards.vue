<template>
  <div>
    <h2>复习最近 3 天的单词</h2>
    <div class="card-container">
      <div class="card" v-for="item in wordsList" :key="item.id" :class="[cardBackGround[Math.round(Math.random() * 6 + 1)]]">
        <span>{{item.word}}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCards',
  data () {
    return {
      wordsList: [],
      cardBackGround: []
    }
  },
  created () {
    this.$http.get('/reviewCards').then(res => {
      this.wordsList = res.data
    })

    for (var i = 1; i <= 7; i++) {
      this.cardBackGround.push(`card-background-day${i}`)
    }
    console.log(this.cardBackGround)
  }
}
</script>

<style scoped>

  h2 {
    text-align: center;
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
    /*background: coral;*/
    font-size: 32px;
  }

  .card span {
    color: #ffffff;
    font-size: 28px;
    word-wrap: break-word;
    transition: font-size .2s ease;
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
