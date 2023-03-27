
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

  <!-- LoadImage组件 -->
  <div class="box">
    <div class="title">LoadImage组件</div>
    <LoadImage :data="dataList" :isOver="isOver" @lazyLoad="lazyLoad"></LoadImage>
  </div>

  <!-- Table组件 -->
  <div class="box">
    <div class="title">Table组件</div>
    <Table :data="tableData" :col="col"></Table>
  </div>


  <!-- 我只是来撑开window的滚动条的 -->
  <div style="height: 500px;"></div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Modal from './components/modal/index.vue'
import Popover from './components/popover/index.vue'
import LoadImage from './components/loadImage/index.vue'
import Table from './components/table/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Modal,
    Popover,
    LoadImage,
    Table,
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




    // -------------------- loadImage --------------------
    const urlList = [
      'https://pic.3gbizhi.com/2020/0715/20200715125404687.jpg', 'https://img1.baidu.com/it/u=3069316274,2216493367&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422',
      'https://img0.baidu.com/it/u=3298051423,2256566422&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=683', 'https://img1.baidu.com/it/u=668908956,3142956363&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3d901398-5fff-4b1b-9b39-e8d37d9ac62c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682136309&t=8cdf6b2519283cabffb2ac188e9fd588', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fdea210ca-3743-4f2a-b9b1-c2c3b185ae52%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682136309&t=aa59fc3e4b6f3d5012e5bfdf98effd5e',
      'https://img2.baidu.com/it/u=3447143413,168358415&fm=253&fmt=auto&app=138&f=JPEG?w=347&h=500', 'https://file.moyublog.com/d/file/2020-12-19/67da057fd7824f2a2f367cf488790ac2.jpg',
      'https://img2.baidu.com/it/u=4223569044,1151190333&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', 'https://www.gpbctv.com/uploads/20210527/zip_1622099026QUAPEW.jpg'
    ]

    const getId = () => {
      return Math.ceil(Math.random() * 100000000)
    }

    const isOver = ref(false)
    const dataList = ref(urlList.map(url => ({ id: getId(), url })))

    const getUrls = () => { // 模拟一次获取10张图片的接口
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(urlList.map(url => ({ id: getId(), url })))
        }, 500)
      })
    }

    const lazyLoad = () => { // 滚动加载
      getUrls().then(urlList => {
        const result = [...dataList.value, ...urlList]
        // 当一共加载超过50张图片后, 标记所有图片已经加载完毕(测试)
        if (result.length >= 50) isOver.value = true
        dataList.value = result
      })
    }
    // -------------------- loadImage --------------------




    // -------------------- table --------------------
    const tableDataMap = [
      { name: '张一', sex: '男', age: 43, address: 'I\'m address ...', key: 1 },
      { name: '张二', sex: '女', age: 32, address: 'I\'m address ...', key: 2 },
      { name: '张三', sex: '男', age: 54, address: 'I\'m address ...', key: 3 },
      { name: '张四', sex: '女', age: 36, address: 'I\'m address ...', key: 4 },
      { name: '张五', sex: '男', age: 38, address: 'I\'m address ...', key: 5 },
      { name: '张六', sex: '女', age: 31, address: 'I\'m address ...', key: 6 },
      { name: '张七', sex: '男', age: 25, address: 'I\'m address ...', key: 7 },
      { name: '张八', sex: '女', age: 35, address: 'I\'m address ...', key: 8 },
      { name: '张九', sex: '男', age: 37, address: 'I\'m address ...', key: 9 },
      { name: '张十', sex: '女', age: 35, address: 'I\'m address ...', key: 10 },
      { name: '张十一', sex: '男', age: 39, address: 'I\'m address ...', key: 11 },
      { name: '张十二', sex: '女', age: 20, address: 'I\'m address ...', key: 12 },
      { name: '张十三', sex: '男', age: 28, address: 'I\'m address ...', key: 13 },
      { name: '张十四', sex: '女', age: 26, address: 'I\'m address ...', key: 14 },
      { name: '张十五', sex: '男', age: 27, address: 'I\'m address ...', key: 15 },
      { name: '张十六', sex: '女', age: 29, address: 'I\'m address ...', key: 16 },
      { name: '张十七', sex: '男', age: 21, address: 'I\'m address ...', key: 17 },
      { name: '张十八', sex: '女', age: 24, address: 'I\'m address ...', key: 18 },
      { name: '张十九', sex: '男', age: 30, address: 'I\'m address ...', key: 19 },
      { name: '张二十', sex: '女', age: 28, address: 'I\'m address ...', key: 20 },
    ]

    const tableData = ref(tableDataMap.slice(0, 10))
    const col = ref([
      {
        title: '名称',
        dataIndex: 'name',
        sorter: false,
        filter: false
      },
      {
        title: '性别',
        dataIndex: 'sex',
        sorter: false,
        filter: true
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: true,
        filter: false
      },
      {
        title: '地址',
        dataIndex: 'address',
        sorter: false,
        filter: false
      }
    ])
    // -------------------- table --------------------

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

      // loadImage prop
      isOver,
      dataList,
      lazyLoad,

      // table prop
      tableData,
      col,
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
