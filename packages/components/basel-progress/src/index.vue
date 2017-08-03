<style>
.bas-progress{
  display: table;
  margin: auto;
  position: relative;
}
.bas-progress .line{
    height: 1px;
    background: #666;
    position: absolute;
    left: 90px;
    right: 90px;
    top: 20px;
    z-index:-1;
}
.bas-progress .wrap{
  text-align: center;
  float: left;
  width:180px;
}
.bas-progress .circle{
    display: inline-block;
    background: #ccc;
    border-radius: 100%;
    width: 40px;
    height: 40px; 
    line-height: 40px;
    color:#fff;
}
.bas-progress .circle.now{
    background: #666;
}
.bas-progress .title{
  margin-top:20px;
}
</style>
<template>
    <span class="bas-progress">
        <div class="line"></div>
        <div class="wrap" v-for="(value,key) in data">
            <div :class="{circle:true,now:i>=key}">{{key}}</div>
            <div class="title">{{value}}</div>
        </div>
    </span>
</template>
<script>
  export default {
    name: 'BasProgress',
    data () {
      return {
        i: 0
      }
    },
    props: ['data']
  }
</script>
