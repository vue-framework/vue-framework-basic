<template>
    <div style="width:100%;font-size: 0;">
        <el-select v-model="value[0]" placeholder="请选择" class="u-address-select" style="width:33%;margin-right:0.5%;">
            <el-option v-for="item in area.provice" :key="item.index" :label="item.name" :value="item.name"  @click.native="changeProvice(item)"></el-option>
        </el-select>
        <el-select v-model="value[1]" placeholder="请选择" class="u-address-select"  style="width:33%;margin-right:0.5%;">
            <el-option v-for="item in area.city" :key="item.index" :label="item.name" :value="item.name" @click.native="changeCity(item)"></el-option>
        </el-select>
        <el-select v-model="value[2]" placeholder="请选择" class="u-address-select u-address-region"  style="width:33%;">
            <el-option v-for="item in area.region" :key="item.id" :label="item" :value="item"></el-option>
        </el-select>
    </div>
</template>
<script>
    import area from './area'
    export default {
      name: 'BasAddress',
      created () {
        if (!this.utils.componentExists(this, 'ElSelect')) {
          throw new Error('请先引用 element-ui 中的 el-select 组件')
        }
      },
      props: ['value'],
      data () {
        return {
          area: {
            provice: area.map,
            city: [],
            region: []
          }
        }
      },
      watch: {
        // back: {
        //   handler (n, o) {
        //     console.log(n, o)
        //     if (this.back !== this.value) { this.$emit('input', n) }
        //   }
        // },
        value: {
          handler (n, o) {
            if (n !== o) {
              this.init(n)
            }
          },
          immediate: true
        }
      },
      methods: {
        init (value) {
          if (value instanceof Array) {
            if (value[0]) {
              this.area.city = area.getChild(area.map, value[0]).city
            }
            if (value[1]) {
              this.area.region = area.getChild(this.area.city, value[1]).area
            }
            this.value = value
          }
        },
        // 变化省
        changeProvice (item) {
          this.area.city = item.city
          this.$set(this.value, 1, '')
          this.$set(this.value, 2, '')
          this.area.region = []
        },
        // 变化市
        changeCity (item) {
          this.area.region = item.area
          this.$set(this.value, 2, '')
        }
      }
    }
</script>
