<template>
  <div :class="{ __loadimage_class: true, __loadimage_border: border }" :style="containerStyle" ref="Self" @scroll="handleScroll">
    <div class="__loadimage_empty" v-if="!data.length">No Image ...</div>
    <div class="__loadimage_content" ref="Box">
      <div class="__loadimage_col" v-for="col in colList" :key="col.key" :style="imgBoxStyle">
        <div class="__loadimage_imgbox" v-for="item in col.imgList" :key="item.id">
          <img class="__loadimage_img" :src="item.url" alt="">
          <div class="__loadimage_loading">loading ...</div>
        </div>
      </div>
    </div>
    <div class="__loadimage_over" v-if="isOver && !!data.length">------ 所有图片加载完毕 ------</div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, nextTick } from 'vue'

export default defineComponent({
  emits: ['lazyLoad'],
  props: {
    width: {
      type: String,
      default: '600px',
    },
    height: {
      type: String,
      default: '500px',
    },
    border: {
      type: Boolean,
      default: true,
    },
    cols: {
      type: Number,
      default: 3,
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    isOver: {
      type: Boolean,
      default: false,
    }
  },
  setup (props, { emit, expose }) {
    const Self = ref(null)
    const Box = ref(null)

    const containerStyle = computed(() => {
      return {
        width: props.width,
        height: props.height,
      }
    })

    const imgBoxStyle = computed(() => {
      return {
        width: `${100 / props.cols}%`
      }
    })

    let ready = true

    const colList = computed(() => {
      const result = Array.from({length: props.cols}).map((v, i) => {
        return { key: i, imgList: [] }
      })

      const list = [ ... props.data ]
      let index = props.cols - 1

      while (!!list.length) {
        index ++
        if (index > props.cols - 1) index = 0
        result[index].imgList.push(list.shift())
      }

      nextTick(() => {
        ready = true
      })

      return result
    })

    let st = 0 // 缓存上一次的scrollTop值, 用于判断向上滚动还是向下滚动

    const handleScroll = () => {
      if (!props.isOver) {
        const scrollT = Self.value.scrollTop
        if (scrollT > st) { // 向下滚动时
          const domList = Box.value.children
          const len = domList.length
          for (let i = 0; i < len; i ++) {
            // 当纵列的底边(肯定是最短的纵列最先离开)即将(距离100)离开容器底边时, 触发lazyLoad
            if (scrollT + Self.value.offsetHeight + 100 > domList[i].offsetHeight) {
              // 防止多次发送lazyLoad, ready属性将会在colList的计算属性方法中重置
              if (ready) {
                emit('lazyLoad')
                ready = false
              }
              break
            }
          }
        }
        st = scrollT
      }
    }

    expose({
      initState: () => { // 可以通过ref.initState()手动重置ready状态
        ready = true
      }
    })

    return {
      Self,
      Box,
      containerStyle,
      imgBoxStyle,
      colList,
      handleScroll,
    }
  }
})
</script>

<style>
.__loadimage_class { overflow: auto; border-radius: 5px; position: relative; }
.__loadimage_class::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
.__loadimage_class::-webkit-scrollbar-thumb { background: rgba(200, 200, 200, .4); border-radius: 3px; }
.__loadimage_class::-webkit-scrollbar-thumb:hover { background: rgba(200, 200, 200, .6); }
.__loadimage_border { border: 1px solid rgba(0, 0, 0, .05); padding: 2px; }

.__loadimage_empty { width: 100%; height: 100%; color: lightgray; display: flex; justify-content: center; align-items: center; }

.__loadimage_content { width: 100%; overflow: hidden; }
.__loadimage_col { float: left; position: relative; }
.__loadimage_imgbox { width: calc(100% - 14px); float: left; margin: 3px; border: 1px solid lightgray; overflow: hidden; border-radius: 5px; padding: 3px; position: relative; }
.__loadimage_img { width: 100%; min-height: 60px; position: relative; z-index: 10; }
.__loadimage_loading { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; position: absolute; left: 0; top: 0; }
.__loadimage_over { width: 100%; height: 30px; line-height: 30px; font-size: 12px; color: lightgray; text-align: center; }
</style>



