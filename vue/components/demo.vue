
<template>
  <div class="demo">
    this is a {{ name }}
    <div class="container" @click="showBubble">
      <Bubble
        v-if="isBubbleShow"
        :content="bubbleContent"
        :position="bubblePosition"
      >
      </Bubble>
    </div>
  </div>
</template>
<style scoped>
.demo {
  color: red;
}
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
import Bubble from './Bubble.vue'
export default {
	components: {
    Bubble
  },
  data () {
		return {
			name: 'Demo',
			isBubbleShow: false,
      bubbleContent: '点击页面任意位置',
      bubblePosition: [0, 0]
		}
  },
	methods: {
    showBubble (event) {
      this.isBubbleShow = !this.isBubbleShow
      this.bubblePosition = [event.clientX, event.clientY]
    }
  }
}
</script>
