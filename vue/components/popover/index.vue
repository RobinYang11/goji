<template>
  <div class="__pop_class" ref="self" @click.stop="toClick" @mouseenter="toHover" @mouseleave="toLeave">
    <!-- 触发气泡框的标题元素 -->
    <slot></slot>

    <!-- pop框 -->
    <teleport to="body" v-if="isRend">
      <div class="__pop_frame_class" ref="popFrame" :style="popStyle" @click.stop @mouseenter="toHover" @mouseleave="toLeave">
        <!-- title框 -->
        <slot name="title" v-if="showTitle">
          <div class="__pop_frame_title">{{ title }}</div>
        </slot>

        <!-- content框 -->
        <slot name="content">
          <div class="__pop_frame_content">No data ...</div>
        </slot>
      </div>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { _getScrollParents, _getScrollDistance, _getOffset, _BD, _unBD, _body } from '../../asset-lib/utils.js'

export default defineComponent({
  emits: ['popShow', 'popClose'],
  props: {
    title: {
      type: String,
      default: 'title',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    trigger: {
      type: String,
      difault: 'hover',
    },
  },
  setup (props, { emit, expose }) {
    const self = ref(null) // 自身元素
    const popFrame = ref(null) // 弹框元素
    const isRend = ref(false) // 是否渲染到页面
    const popStyle = ref({
      left: 0,
      top: 0,
      opacity: 0,
    })

    let timer = null
    
    const triggerType = computed(() => {
      return props.trigger === 'click' ? 'click' : 'hover'
    })

    const computeLocation = () => { // 核心计算pop框偏移方法
      const { x: offsetX, y: offsetY } = _getOffset(self.value) // 获取组件到页面顶端的距离
      const { x: distanceX, y: distanceY } = _getScrollDistance(self.value) // 获取组件的所有父元素的综合滚动条偏移
      const selfWidth = self.value.offsetWidth
      const frameWidth = popFrame.value.offsetWidth
      const frameHeight = popFrame.value.offsetHeight
      
      popStyle.value = {
        left: `${offsetX - distanceX - frameWidth / 2 + selfWidth / 2 - 4}px`, // 最后一个4表示箭头宽度的一半
        top: `${offsetY - distanceY - frameHeight - 10}px`,
        opacity: 1,
      }
    }

    const showPop = () => {
      isRend.value = true
      emit('popShow')
      nextTick(() => { // 这里调用nextTick保证popFrame已经渲染(在computeLocation()方法中须用popFrame的高度来计算y轴偏移)
        computeLocation()
      })
    }

    const hidePop = () => {
      popStyle.value.opacity = 0
      emit('popClose')
      setTimeout(() => {
        isRend.value = false
      }, 300)
    }

    const toClick = () => {
      if (triggerType.value === 'click') {
        if (isRend.value) {
          hidePop()
        } else {
          showPop()
        }
      }
    }

    const toHover = () => {
      if (triggerType.value === 'hover') {
        if (timer) clearTimeout(timer)
        if (!isRend.value) showPop()
      }
    }

    const toLeave = () => {
      if (triggerType.value === 'hover') {
        timer = setTimeout(() => {
          hidePop()
        }, 500)
      }
    }

    const onScroll = () => {
      if (isRend.value) {
        computeLocation()
      }
    }

    let scrollParents = [] // 本组件的所有有滚动条的父元素
    watch(
      () => self.value, // 当组件被渲染后马上获取本组件的所有有滚动条的父元素
      el => {
        scrollParents = _getScrollParents(el)
        scrollParents.forEach(el => {
          _BD(el, 'scroll', onScroll) // 给所有有滚动样式的元素绑定事件
        })
      }
    )

    _BD(_body, 'click', hidePop)

    onBeforeUnmount(() => {
      scrollParents.forEach(el => {
        _unBD(el, 'scroll', onScroll) // 给所有有滚动样式的元素解绑事件
      })
      _unBD(_body, 'click', hidePop)
      scrollParents = null
    })

    expose({
      close: hidePop,
    })

    return {
      self,
      popFrame,
      isRend,
      popStyle,
      toClick,
      toHover,
      toLeave,
    }
  }
})
</script>

<style>
.__pop_class { display: inline-block; }

.__pop_frame_class { transition: opacity .3s; border-radius: 5px; background: white; box-shadow: 3px 3px 10px rgba(0, 0, 0, .3); position: absolute; z-index: 99999; }
.__pop_frame_class::before { content: ''; width: 0; height: 0; border: 8px solid transparent; border-top: 8px solid white; position: absolute; left: calc(50% - 4px); top: calc(100% - 1px); z-index: 10; }
.__pop_frame_class::after { content: ''; width: 0; height: 0; border: 8px solid transparent; border-top: 8px solid rgba(0, 0, 0, .05); position: absolute; left: calc(50% - 4px); top: 100%; }
.__pop_frame_title { min-width: 130px; font-weight: 900; line-height: 30px; font-size: 16px; padding-left: 10px; border-bottom: 1px solid #DCDFE6; }
.__pop_frame_content { min-width: 140px; min-height: 80px; color: lightgray; font-size: 12px; display: flex; justify-content: center; align-items: center; }
</style>



