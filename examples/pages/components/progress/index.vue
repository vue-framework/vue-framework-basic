<template>
<div>
    <bas-progress @change="change" :data="data"></bas-progress> 
</div>
</template>
<script>
 export default {
   data () {
     return {
       data: ['查看企业资料', '完善企业信息', '审核完成']
     }
   },
   methods: {
     change (index) {
       console.log(index)
     }
   }
 }
</script>
