<style>
.exceltemp img{
    width: 18px;vertical-align: bottom;
}
.exceltemp .el-upload{
    margin-top:20px;
}
.exceltemp .progress{
    margin-top: 64px;
}
</style>
<template>
 <div class="exceltemp">请按照模板格式上传Excel文档，<img src="./excel.png"/><a :href="down">下载模板</a>
          <el-upload 
            ref="fileup"
            drag 
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :action="up.action"
            :on-success="successcb"
            :on-error="errorcb"
            :on-progress="progresscb"
            :data="data"
            :before-upload="beforecb"
            >
            <i class='el-icon-upload' v-show="!isprogress"/>
            <div class='el-upload__text' v-show="!isprogress">将文件拖到此处，或<em>点击上传</em></div>
            <div class='el-upload__text progress'v-show="isprogress">导入中...</div>
            <div class='el-upload__tip' v-show="err" slot='tip' style='color:red'>{{err}}</div>
          </el-upload>
     </div>
</template>
<script>
    export default {
      name: 'BasExcelTemp',
      data () {
        return {
          err: '',
          isprogress: false
        }
      },
      beforeCreate () {
        if (!window.XLSX) {
          console.error('请添加XLSX https://cdn.bootcss.com/xlsx/0.11.0/xlsx.full.min.js')
        }
      },
      props: {
        down: {},
        data: {},
        up: {},
        success: {}
      },
      methods: {
        successcb (response, file, fileList) {
          let that = this
          this.err = ''
          this.isprogress = false
          this.$parent.doClose()
          let reader = new window.FileReader()
          this.$refs.fileup.clearFiles()
          reader.onload = function (e) {
            let data = e.target.result
            let wb = window.XLSX.read(data, {
              type: 'binary'
            })
            let json = window.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            that.up.success(json)
          }
          reader.readAsBinaryString(file.raw)
        },
        errorcb () {
          this.isprogress = false
          this.err = '上传失败'
        },
        progresscb () {
          this.isprogress = true
        },
        beforecb (file) {
        //   if (!/\.(xls|xlsx)$/.test(file.name)) {
        //     return false
        //   }
        }
      }
    }
</script>