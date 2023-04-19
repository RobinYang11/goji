<template>
  <button @click="handleShowModal(1)">打开弹框（自定义页脚）</button>
  <Modal v-model:visible="visible1" title="打开弹框（自定义页脚）">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <template #footer>
      <span>自定义页脚</span>
    </template>
  </Modal>
  <button @click="handleShowModal(2)">打开弹框（自定义页眉）</button>
  <Modal v-model:visible="visible2">
    <template #title>
      <span>打开弹框（自定义页眉）</span>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
</template>

<script>
import Modal from './index.vue'
export default {
  components: {
    Modal
  },
  data () {
    return {
      visible1: false,
      visible2: false,
    }
  },
  methods: {
    handleShowModal (num) {
      num === 1 && (this.visible1 = true)
      num === 2 && (this.visible2 = true)
    }
  }
}
</script>

<style>
</style>