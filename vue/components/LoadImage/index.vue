<template>
  <div class="component-load-image" ref="imageContainerRef">
    <div v-for="img in imageList" class="image-item">
      <img :data-src="img" alt="img">
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'LoadImage',
  props: {
    imageList: {
      type: Array,
      default: () => []
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
    const imageContainerRef = ref(null)

    onMounted(() => {
      const queue = []
      const imageListDOM = imageContainerRef.value.querySelectorAll('img')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgDOM = entry.target
            const imgUrl = imgDOM.getAttribute("data-src")
            queue.push({ imgDOM, imgUrl })
            observer.unobserve(imgDOM)
            runQueue()
          }
        })
      }, {
        root: null,
        rootMargin: '160px',
        threshold: 0.1
      })

      imageListDOM.forEach((imgDOM) => {
        observer.observe(imgDOM);
      })


      const runQueue = () => {
        requestAnimationFrame(() => {
          if (queue.length === 0) return

          const { imgDOM, imgUrl } = queue.shift()
          imgDOM.setAttribute("src", imgUrl)
          runQueue()
        })
      }

    })

    return {
      pictureUrl,
      imageContainerRef
    }
  }
})
</script>

<style scoped>
.component-load-image {
  width: 100%;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
}

.component-load-image .image-item {
  width: 332px;
  height: 100%;
  background-color: rgba(131, 131, 131, 0.19);
}

.component-load-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
