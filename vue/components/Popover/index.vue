<template>
  <div class="popover">
    <!-- popover 触发 -->
    <div @click="handleClick" class="popover-item">
      <slot ></slot>
    </div>
    <!-- popover 提示内容 -->
    <div class="popover-content">
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
      type: String,
      default:'click'
    },
  },
  components:{
  },
  data() {
    return {}
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleClick(){
      console.log(123)
    }
  },
}
</script>

<style lang='less' scoped>
.popover {
  position: relative;
  &-item {
  }
  &-content {
    position: absolute;
    bottom: 0;
    padding: 12px;
    min-width: 100px;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%),
    
  }
  &-title {
    font-weight: 700;
  }

}
</style>
