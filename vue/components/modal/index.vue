<template>
  <teleport to="body" v-if="isRend">
    <!-- 遮罩 -->
    <div
      :class="{
        __modal_class: true,
        __modal_mask_on: animationShow,
        __modal_mask_off: !animationShow
      }"
      v-show="modelValue"
      @click="toMaskCancel"
    >
      <!-- 内容区 -->
      <div
        :class="{
          __modal_content: true,
          __modal_content_on: animationShow,
          __modal_content_off: !animationShow
        }"
        :style="containerStyle"
        @click.stop
      >
        <!-- 头部 -->
        <div class="__modal_headbox" v-if="showHeader">
          <slot name="header" :title="title">
            <div class="__modal_title _not-chooseable">{{ title }}</div>
            <div class="__modal_hr"></div>
          </slot>
        </div>
        
        <!-- 关闭按钮 -->
        <div
          class="__modal_close _not-chooseable"
          @click="toCancel"
          v-show="closeable"
        >x</div>
        <!-- 主内容部分 -->
        <div class="__modal_contentbox">
          <slot></slot>
        </div>
        <!-- 底部 -->
        <div class="__modal_footbox" v-if="showFooter">
          <slot name="footer" :close="toCancel" :submit="toSubmit" :cancelText="cancelText" :submitText="submitText">
            <button class="__modal_foot_btn" @click="toCancel">{{ cancelText }}</button>
            <button class="__modal_foot_btn" @click="toSubmit">{{ submitText }}</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  emits: ['cancel', 'submit', 'update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal',
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    maskCloseable: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    submitText: {
      type: String,
      default: '确定',
    },
    width: {
      type: String,
      default: '60%',
    },
    height: {
      type: String,
      default: '40%',
    },
    maxWidth: {
      type: String,
      default: undefined
    },
    maxHeight: {
      type: String,
      default: undefined
    },
  },
  setup(props, { emit, expose }) {
    const isRend = ref(false) // 是否渲染到页面
    const animationShow = ref(false) // 用于判断组件动画的展示

    const containerStyle = computed(() => {
      const json = {
        width: props.width,
        height: props.height,
      }
      if (props.maxWidth) json.maxWidth = props.maxWidth
      if (props.maxHeight) json.maxHeight = props.maxHeight
      return json
    })

    watch(
      () => props.modelValue,
      val => {
        if (val) {
          if (!isRend.value) isRend.value = true
          animationShow.value = true
        }
      },
      {
        immediate: true,
      }
    )
    
    const toCancel = () => {
      animationShow.value = false
      emit('cancel')
      setTimeout(() => {
        emit('update:modelValue', false)
        isRend.value = false
      }, 300)
    }
    
    const toSubmit = () => {
      emit('submit')
    }

    const toMaskCancel = () => {
      if (props.maskCloseable) {
        toCancel()
      }
    }

    expose({
      close: toCancel,
    })

    return {
      isRend,
      animationShow,
      containerStyle,

      toCancel,
      toSubmit,
      toMaskCancel,
    }
  },
})
</script>

<style>
._not-chooseable { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }

.__modal_class { width: 100%; height: 100%; background: rgba(100, 100, 100, .5); position: fixed; left: 0; top: 0; z-index: 99999; }
.__modal_mask_on { animation: _MODAL_MASK_ON 0.3s forwards; }
.__modal_mask_off { animation: _MODAL_MASK_OFF 0.3s forwards; }
.__modal_content { min-height: 160px; background: white; overflow: hidden; border-radius: 3px; box-shadow: 0px 5px 10px rgba(0, 0, 0, .3); transform-origin: center center; position: absolute; left: 50%; top: 20%; }
.__modal_content_on { animation: _MODAL_CONTENT_ON 0.3s forwards; }
.__modal_content_off { animation: _MODAL_CONTENT_OFF 0.3s forwards; }

.__modal_headbox { width: 100%; position: relative; }
.__modal_title { width: calc(100% - 60px); line-height: 40px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 16px; font-weight: 700; position: relative; left: 10px; top: 0; }
.__modal_close { width: 20px; height: 20px; line-height: 18px; text-align: center; border-radius: 5px; font-size: 14px; background: rgba(0, 0, 0, .05); color: #C0C4CC; transition: .3s; cursor: pointer; position: absolute; top: 10px; right: 10px; z-index: 99999; }
.__modal_close:hover { color: #333; }
.__modal_hr { width: calc(100% - 20px); height: 1px; background: #DCDFE6; transform-origin: center bottom; transform: scale(1, .5); position: absolute; left: 10px; bottom: 0; }

.__modal_contentbox { width: calc(100% - 20px); overflow: auto; position: relative; left: 10px; }
.__modal_contentbox::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
.__modal_contentbox::-webkit-scrollbar-thumb { background: rgba(200, 200, 200, .4); border-radius: 3px; }
.__modal_contentbox::-webkit-scrollbar-thumb:hover { background: rgba(200, 200, 200, .6); }

.__modal_footbox { width: 100%; line-height: 48px; text-align: right; position: absolute; bottom: 0; left: 0; }
.__modal_foot_btn { min-width: 80px; min-height: 30px; margin-right: 10px; }

@keyframes _MODAL_MASK_ON {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes _MODAL_MASK_OFF {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes _MODAL_CONTENT_ON {
  from { transform: translate(-50%, -20%) scale(0, 0); }
  to { transform: translate(-50%, -20%) scale(1, 1); }
}

@keyframes _MODAL_CONTENT_OFF {
  from { transform: translate(-50%, -20%) scale(1, 1); }
  to { transform: translate(-50%, -20%) scale(0, 0); }
}
</style>

