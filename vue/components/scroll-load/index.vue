<template>
  <div class="nc-image-list" ref="listBox" @scroll="handleScroll">
    <div ref="listContent" v-if="data.length" class="nc-image-list-content">
      <div class="nc-image-list-content-col" v-for="col in colList" :key="col.key">
        <div class="nc-image-list-content-item" v-for="item in col.imgList" :key="item.id">
          <img class="nc-image-list-conten-img" :src="item.url" alt="">
        </div>
      </div>
    </div>
    <div class="nc-image-list-empty" v-else>暂无数据</div>
    <div class="nc-image-list-over" v-if="isOver && data.length">没有更多了</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    cols: {
      type: Number,
      default: 5
    },
    isOver: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lastScrollTop: 0,
      canEmit: true
    }
  },
  computed: {
    colList () {
      const that = this
      const result = []
      for (let i = 0; i < that.cols; i++) {
        result.push({ key: i, imgList: [] })
      }

      const list = [...this.data]
      let index = this.cols - 1

      while (!!list.length) {
        index++
        if (index > this.cols - 1) index = 0
        result[index].imgList.push(list.shift())
      }
      this.$nextTick(() => {
        this.canEmit = true
      })

      return result
    }
  },
  methods: {
    handleScroll () {
      if (!this.isOver) {
        const scrollT = this.$refs.listBox.scrollTop
        if (scrollT > this.lastScrollTop) {
          const domList = this.$refs.listContent.children
          for (let i = 0; i < domList.length; i++) {
            if (scrollT + this.$refs.listBox.offsetHeight + 150 > domList[i].offsetHeight) {
              if (this.canEmit) {
                this.$emit('lazyLoad')
                this.canEmit = false
              }
              break
            }
          }
        }
        this.lastScrollTop = scrollT
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nc-image-list {
  width: calc(100% - 5px);
  height: 100%;
  position: relative;
  padding: 2px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200, 0.4);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(200, 200, 200, 0.6);
  }
}
.nc-image-list-content {
  display: flex;
  gap: 5px;
}
.nc-image-list-content-col {
  flex: 1;
}
.nc-image-list-content-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 5px;
  overflow: hidden;
}
.nc-image-list-conten-img {
  width: 100%;
}
</style>
