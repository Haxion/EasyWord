<template>
  <div>
    <el-row type="flex" justify="center" style="margin-top: 200px">
      <el-col :span="12" align="center">
        <div class="block">
          <el-carousel trigger="click" height="150px" type="card" :interval="4000">
            <el-carousel-item v-for="(item, index) in wordCards" :key="item.id">
              <p>{{index + 1}}</p>
              <h3 class="">{{item.word}}</h3>
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
  props: ['wordCards']
}
</script>

<style scoped>
  .el-carousel__item h3 {
    margin: 0;
    color: #475669;
    font-size: 38px;
    line-height: 50px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
