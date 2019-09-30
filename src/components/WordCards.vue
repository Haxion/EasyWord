<template>
  <div>
    <el-row type="flex" justify="center" style="margin-top: 200px">
      <el-col :span="12" align="center">
        <div class="block">
          <el-carousel trigger="click" height="180px" type="card" :interval="4000">
            <el-carousel-item v-for="(item, index) in wordCards" :key="item.id" :class="['card', cardBackGround[index]]">
              <p>{{index + 1}}</p>
              <h1>{{item.word}}</h1>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WordCards',
  props: ['wordCards'],
  data () {
    return {
      cardBackGround: []
    }
  },
  created () {
    let index = 1
    while (this.cardBackGround.length < 6) {
      this.cardBackGround.push(`card-background${index++}`)
    }
  }
}
</script>

<style scoped>

  .card {
    color: #ffffff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(57, 0, 57, 0.62);;
  }

  .card h1 {
    margin: 30px;
    font-size: 35px;
  }

  .card-background1 {
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  }

  .card-background2 {
    background-color: #08AEEA;
    background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%);
  }

  .card-background3 {
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  }

  .card-background4 {
    background-color: #74EBD5;
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
  }

  .card-background5 {
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
  }
</style>
