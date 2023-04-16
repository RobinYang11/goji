<template>
  <Popover title="弹框标题">
    <button>点击我</button>
    <template #content>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </template>
  </Popover>
</template>

<script>
import Popover from './index.vue'
export default {
  components: { Popover }
}
</script>

<style>
</style>
