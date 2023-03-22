
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

  <!-- Popover组件 -->
  <div class="box">
    <div class="title">Popover组件</div>
    <div class="scroll" ref="scrollBox">
      <div class="scroll-content">
        <Popover class="my-pop mt" trigger="click" title="click pop">
          <button>click me</button>
          <template #content>
            <div class="pop-content">
              我是 <span class="pop-color">{{ msg }}</span> 的内容!
            </div>
          </template>
        </Popover>
        <br>
        <Popover class="my-pop" :showTitle="false" @popShow="popShow" @popClose="popClose">
          <button>hover me</button>
        </Popover>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Modal from './components/modal/index.vue'
import Popover from './components/popover/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Modal,
    Popover,
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




    // -------------------- popover --------------------
    const scrollBox = ref(null)
    onMounted(() => { // 设置初始滚动条 - 测试用
      scrollBox.value.scrollLeft = 300
      scrollBox.value.scrollTop = 480
    })
    const popShow = () => {
      console.log('我展示了!')
    }
    const popClose = () => {
      console.log('我消失了!')
    }
    // -------------------- popover --------------------

    return {
      msg,

      // modal prop
      showModal,
      toShowModal,
      modalRef,

      // popover prop
      scrollBox,
      popShow,
      popClose,
    }
  }
})
</script>

<style>
._not-chooseable { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }

.box { padding: 20px; }
.title { font-size: 18px; font-weight: 900; padding: 10px 0; }
.scroll { width: 500px; height: 300px; background: rgba(0, 0, 0, .03); overflow: auto; }
.scroll-content { width: 2000px; height: 2000px; }


/* modal */
.__modal_title { width: calc(100% - 60px); line-height: 40px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 16px; font-weight: 700; position: relative; left: 10px; top: 0; }
.__modal_hr { width: calc(100% - 20px); height: 1px; background: #DCDFE6; transform-origin: center bottom; transform: scale(1, .5); position: absolute; left: 10px; bottom: 0; }
.__modal_foot_btn { min-width: 80px; min-height: 30px; margin-right: 10px; }

/* popover */
.my-pop { margin-top: 100px; margin-left: 380px; }
.mt { margin-top: 500px; }
.pop-content { padding: 10px; font-size: 14px; }
.pop-color { color: salmon; }
</style>
