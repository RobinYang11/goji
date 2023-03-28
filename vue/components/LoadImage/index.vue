<template>
  <div class="load-image">
    <div class="image-wrapper" ref="loadImage">
      <img
        v-for="(url, index) in imageUrl" :key="index"
        :src="url"
        class="img"
        :style="{width: imgWidth, height: imgHeight}"
      />
    </div>
  </div>
</template>

<script>
export default {
  name:'LoadImage',
  components:{
    
  },
  props: {
    urls:Array,
    imgWidth: {
      type:String,
      default: '100%'
    },
    imgHeight:{
      type:String,
      default: '500px'
    },
    preloadNumber:{
      type:Number,
      default: 3
    }
  },
  data() {
    return {
     imageUrl:[]
    }
  },
  created(){
    this.imageUrl = this.urls.slice(0,this.preloadNumber)
  },
  mounted(){
    this.$refs.loadImage.addEventListener('scroll',this.debounce(this.handleScroll),1000)
  },
  destroyed(){
    this.$refs.loadImage.removeEventListener('scroll',this.debounce(this.handleScroll),1000)
  },
  methods: {
    addImage(){
      // 添加或请求图片
      const length = this.imageUrl.length
      const addImg = this.urls[length]
      if(length<this.urls.length ){
        this.imageUrl.push(addImg)
      }
    },

    handleScroll() {
      //  滚动条滚过的距离
      const scrollTop = this.$refs.loadImage.scrollTop
      //  loadImage 组件的可视高度
      const clientHeight = this.$refs.loadImage.clientHeight
      //  滚动条长度
      const scrollHeight = this.$refs.loadImage.scrollHeight

      // 当滚动过的距离+可视区的高度>=滚动条长度时，相当于滚动到了底部
      if (scrollTop + clientHeight >= scrollHeight) {
        // 触底,添加图片
        this.addImage()
      }


    },

    // 防抖优化触底加载
    debounce(fn, delay) {
      let timer = null
      return function (...arg) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, arg)
        }, delay);
      }
    }
  },
}
</script>

<style lang='less' scoped>
.load-image {
  .image-wrapper {
    height: 100%;
    overflow: auto;
    .img {
      display: block;
      margin: 10px 0;
    }
  }

}
</style>
