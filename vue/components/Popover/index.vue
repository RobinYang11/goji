<template>
  <div class="popover" @mouseenter="handleMouseEnter($event)" @mouseleave="handleMouseLeave">
    <!-- popover 触发 -->
    <div @click="handleClick($event)"  class="popover-item">
      <slot ></slot>
    </div>
    <!-- popover 提示内容 -->
    <div class="popover-content" :style="{ top: clientY+'px', left:clientX+'px' }" v-show="popoverVisible" ref="popoverContent" @click="($event)=>{$event.stopPropagation()}">
      <div class="popover-title">{{ title }}</div>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Popover',
  props:{
    content: String,
    title: {
      type: String,
      default: 'Title'
    },
    trigger:{
      type:String,
      default:'click'
    }
  },
  data() {
    return {
      popoverVisible: false,
      clientY:0,
      clientX:0,
    }
  },
  mounted() {
    window.addEventListener('click', this.handleCancelPopover)
  },
  destroyed() {
    window.removeEventListener('click',this.handleCancelPopover)
  },
  methods: {
    handleClick(e){
      e.stopPropagation();
      this.popoverVisible = !this.popoverVisible 
      const width = e.target.clientWidth
      const itemCenter = e.target.offsetLeft + width/2 // 计算元素的中间点距浏览器的x轴位置
      const itemTop = e.target.offsetTop  // 计算元素距浏览器的顶部位置
      this.$nextTick(()=>{
        const contentCenter = this.$refs.popoverContent.offsetWidth   // 提示框的自身宽度
        const contentHeight = this.$refs.popoverContent.offsetHeight  // 提示框的自身高度
        this.clientX = itemCenter - contentCenter/2  
        this.clientY = itemTop - contentHeight -15
      })
    },
    handleMouseEnter(e){
      if(this.trigger === 'hover'){
        this.handleClick(e)
      } 
    },
    handleCancelPopover() {
      this.$nextTick(()=>{
        if(this.popoverVisible){
          this.popoverVisible = false
        }
      })
    },
    handleMouseLeave(e){
      if(this.trigger === 'hover'){
        this.handleCancelPopover()
      }
    }

  },
}
</script>

<style lang='less' scoped>
.popover {
  &-content {
    position: absolute;
    padding: 12px;
    min-width: 100px;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%);
    // 倒三角通过 filter滤镜 实现三角形的阴影效果
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -20px;
      left: 0;
      right: 0;
      margin: auto;
      border: 10px solid;
      border-color: #fff transparent transparent;
      filter: drop-shadow( 0 6px 16px 0 rgb(0 0 0 / 8%));
    }
  }
  &-title {
    font-weight: 700;
  }
}
</style>
