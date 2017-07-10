<template>
    <div style="width:800px">
        <bas-input-tree 
        ref="tree"
        :data="treeData" 
        placeholder="请选择行业" 
        v-model="value"
        :show-checkbox='false'  
        label="industryName"
        node-key="industryId"
        parent-key="parentId" 
        :noParent="0"
        > 
        </bas-input-tree>
        <div>12312313123</div>
    </div>
</template>
<script>
    import json from './bas-input-tree-data.js'
    export default {
      data () {
        return {
          value: [],
          treeData: [],
          defaultValue: []
        }
      },
      created () {
        var that = this
        setTimeout(function () {
          that.value = [283]
        }, 200)
        setTimeout(function () {
          that.treeData = json.data
        }, 400)
  },
      methods: {
        handleCheckChange (data, checked, indeterminate) {
          console.log(data, checked, indeterminate)
        },
        handleNodeClick (data) {
          console.log(data)
        }
      },
      watch: {
        value (n) {
          console.log(n)
        }
      }
      // created () {
        // window.fetch('http://192.168.150.41:8003/platform/v1/standardindustrys?pageSize=9999',
        //   {
        //     method: 'get',
        //     mode: 'no-cors',
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //       'Access-Control-Allow-Origin': 'http://192.168.150.41:8003'
        //     }
        //   }).then(function (res) {
        //     console.log(res)
        //   }).then(function (res) {
        //     console.log(res)
        //   })

      // }
    }
</script>
