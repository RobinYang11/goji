<template>
  <div class="component-load-image">
    <img ref="imgRef" :src="pictureUrl" alt="">
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'LoadImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    fallback: {
      type: String,
      default: ''
    },
    loading: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const pictureUrl = ref("")
    const imgRef = ref(null)

    const loadImage = () => {
      const img = new Image()
      img.src = props.src
      img.onload = function() {
        pictureUrl.value = this.src
      }
      img.onerror = function() {
        pictureUrl.value = this.fallback || "https://pic.616pic.com/ys_img/00/58/34/XibLrSEeQF.jpg"
      }
    }

    const preLoad = () => {
      const img = new Image()
      img.src = props.loading
      img.onload = function() {
        // TODO: 最好还是做个限时，不然会闪现
        // 防止图片加载完成后，src已经有值了
        if (pictureUrl.value) return
        pictureUrl.value = this.src
      }
    }

    onMounted(() => {
      preLoad()

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
            observer.unobserve(entry.target)
          }
        })
      })
      observer.observe(imgRef.value);
    })

    return {
      pictureUrl,
      imgRef
    }
  }
})
</script>

<style scoped>
.component-load-image {
  width: 320px;
  height: 400px;
  background-color: orange;
  overflow: hidden;
}

.component-load-image img {
  width: 100%;
  height: 100%;
  obj-fit: cover;
}
</style>
