<template>
  <EasyTable :data="dataList" :col="cols" />
  <div class="page-box">
    <pagination v-model:current="current" :total="total" @change="handleChangePage" />
  </div>
</template>

<script>
import EasyTable from '../table-easy/index.vue'
import Pagination from './pagination.vue'
export default {
  props: {
    dataSource: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
  },
  components: {
    EasyTable,
    Pagination
  },
  data () {
    return {
      // data: this.dataSource,
      cols: this.columns,
      current: 1,
      total: 21
    }
  },
  computed: {
    dataList () {
      return JSON.parse(JSON.stringify(this.dataSource)).slice(10 * (this.current - 1), 10 * (this.current - 1) + 10)
    }
  },
  methods: {
    handleChangePage (current) {
      this.current = current
      console.log(this.current, this.dataList);
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
.page-box{
  text-align: right;
  padding: 10px;
}
</style>
