<template>
  <div style="width: 100%; height: 600px; border: 1px solid #ccc; overflow: hidden;">
    <LoadImage :data="dataSource" :isOver="isOver" @lazyLoad="lazyLoad" />
  </div>
</template>

<script>
import LoadImage from './index.vue'
const GenId = require("../utils/snowFlake")
const genId = new GenId({ WorkerId: 1 })
export default {
  components: { LoadImage },
  data () {
    return {
      imgList: [
        'https://img1.baidu.com/it/u=3069316274,2216493367&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422', 'https://pic.3gbizhi.com/2020/0715/20200715125404687.jpg',
        'https://img0.baidu.com/it/u=3298051423,2256566422&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=683', 'https://img1.baidu.com/it/u=668908956,3142956363&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3d901398-5fff-4b1b-9b39-e8d37d9ac62c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682136309&t=8cdf6b2519283cabffb2ac188e9fd588', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fdea210ca-3743-4f2a-b9b1-c2c3b185ae52%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682136309&t=aa59fc3e4b6f3d5012e5bfdf98effd5e',
        'https://img2.baidu.com/it/u=3447143413,168358415&fm=253&fmt=auto&app=138&f=JPEG?w=347&h=500', 'https://file.moyublog.com/d/file/2020-12-19/67da057fd7824f2a2f367cf488790ac2.jpg',
        'https://img2.baidu.com/it/u=4223569044,1151190333&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', 'https://www.gpbctv.com/uploads/20210527/zip_1622099026QUAPEW.jpg'
      ],
      dataSource: [],
      isOver: false
    }
  },
  mounted () {
    this.lazyLoad()
  },
  methods: {
    getImgList () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.imgList.map(url => ({ id: genId.NextId(), url })))
        }, 200);
      })
    },
    lazyLoad () {
      this.getImgList().then(res => {
        this.dataSource = [...this.dataSource, ...res]
        if (this.dataSource.length >= 50) this.isOver = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
