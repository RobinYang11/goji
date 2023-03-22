
<template>
  <div class="App">
    要做 {{msg}} 的码农
  </div>

  <!-- Modal组件 -->
  <div class="box">
    <div class="title">Modal组件</div>
    <button @click="toShowModal">showModal</button>
    <Modal v-model="showModal" ref="modalRef">
      <template #header="{title}">
        <div class="__modal_title _um-_not-chooseable">{{ title }}</div>
        <div class="__modal_hr"></div>
      </template>
      我是 {{ msg }} 的 Modal 组件
      <template #footer="{close, submit, cancelText, submitText}">
        <button class="__modal_foot_btn" @click="close">{{ cancelText }}</button>
        <button class="__modal_foot_btn" @click="submit">{{ submitText }}</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Modal from './components/modal/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Modal,
  },
  setup (props) {
    const msg = ref('有追求')

    // -------------------- modal --------------------
    const modalRef = ref(null)
    const showModal = ref(false)
    const toShowModal = () => {
      showModal.value = true
      setTimeout(() => {
        // 可以通过 modalRef.value.close() 方法来关闭弹框
        modalRef.value.close()
      }, 3000)
    }
    // -------------------- modal --------------------

    return {
      msg,

      // modal prop
      showModal,
      toShowModal,
      modalRef
    }
  }
})
</script>

<style>
._not-chooseable { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }

.box { padding: 20px; }
.title { font-size: 18px; font-weight: 900; padding: 10px 0; }


/* modal */
.__modal_title { width: calc(100% - 60px); line-height: 40px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 16px; font-weight: 700; position: relative; left: 10px; top: 0; }
.__modal_hr { width: calc(100% - 20px); height: 1px; background: #DCDFE6; transform-origin: center bottom; transform: scale(1, .5); position: absolute; left: 10px; bottom: 0; }
.__modal_foot_btn { min-width: 80px; min-height: 30px; margin-right: 10px; }
</style>
