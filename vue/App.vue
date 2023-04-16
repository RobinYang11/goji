<template>
  <div class="app">
    <p>第一题 [easy] Table组件</p>
    <TableEasyDemo />
    <p>第二题 [easy] 实现弹框组件</p>
    <ModalDemo />
    <p>第三题 [hard]滚动加载</p>
    <PopoverDemo />
    <p>第四题 [hard] 实现气泡框</p>
    <LoadImgDemo />
    <p>第五题 [hard] 表格带分页</p>
    <TableHardDemo />
  </div>
</template>

<script>
import TableEasyDemo from './components/table-easy/demo.vue'
import ModalDemo from './components/modal/demo.vue'
import LoadImgDemo from './components/scroll-load/demo.vue'
import PopoverDemo from './components/popover/demo.vue'
import TableHardDemo from './components/table-hard/demo.vue'

export default {
  name: 'App',
  components: {
    TableEasyDemo,
    ModalDemo,
    LoadImgDemo,
    PopoverDemo,
    TableHardDemo
  }
}
</script>

<style lang="less" scoped>
</style>