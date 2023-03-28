<template>
  <div class="pagination">
    <!-- 上一页 -->
    <div
      :disabled="curPage === 1"
      :class="{ disabled: curPage === 1 }"
      @click="setCurrentPage(curPage - 1)"
    >
      <svg-icon iconFileName="prev"></svg-icon>
    </div>
    <!-- 起始页 -->
    <div v-show="startEnd.start > 1"  @click="setCurrentPage(1)">1</div>
    <div class="disabled" v-show="startEnd.start > 2">...</div>
    <!-- 连续页码 -->
    <div
      v-for="item in startEndArr"
      :key="item"
      :class="{ active: item === curPage }"
      @click="setCurrentPage(item)"
    >
      {{ item }}
    </div>
    <div class="disabled" v-show="startEnd.end < totalPage - 1">...</div>
    <!-- 最后一页 -->
    <div v-show="startEnd.end < totalPage" @click="setCurrentPage(totalPage)">
      {{ totalPage }}
    </div>
    <div
      :disabled="curPage === totalPage"
      :class="{ disabled: curPage === totalPage }"
      @click="setCurrentPage(curPage + 1)"
    >
      <svg-icon iconFileName="next"></svg-icon>
    </div>
    <div class="total">共 {{ total }} 条</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },

  data() {
    return {
      curPage: this.currentPage,
      continues: 3
    };
  },
  computed: {
    totalPage() {
      const { total, pageSize } = this
      return Math.ceil(total / pageSize)
    },
    // 获取连续页码，设置页码 ...
    startEnd() {
      const { curPage, continues, totalPage } = this
      let start, end
      start = curPage - Math.floor(continues / 2);
      if (start < 1) {
        start = 1
      }
      end = start + continues - 1;
      if (end > totalPage) {
        end = totalPage
        start = end - continues + 1;
        if (start < 1) {
          start = 1
        }
      }
      return { start, end };
    },
    startEndArr(){
      const arr = []
      const {start, end} = this.startEnd
      for(let page = start; page <= end; page++){
        arr.push(page)
      }
      return arr
    }
  },
  methods: {
    // 切换页码
    setCurrentPage(page) {
      if (page === this.curPage) return
      if(page > this.totalPage) return
      if(page <= 0 ) return
      this.curPage = page;
      this.$emit("currentChange", page)
    },
  },
  
};
</script>
<style lang="less" scoped>
.pagination {
  margin: 20px;
  text-align: center;
  div {
    display: inline-block;
    margin: 0 8px;
    vertical-align: top;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    &.active {
      font-weight: 600;
      color: #258aff;
    }
    &.disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }
  .total {
    display: inline-block;
    line-height: 28px;
  }
}
</style>