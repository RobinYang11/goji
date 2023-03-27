<!-- Bubble.vue -->
<template>
  <div class="bubble" :style="{ top: position[1] + 'px', left: position[0] + 'px' }">
    <div class="bubble__arrow"></div>
    <div class="bubble__content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'Bubble',
  props: {
    content: String,
    position: {
      type: Array,
      default: () => [0, 0]
    }
  }
}
</script>

<style scoped>
.bubble {
  position: absolute;
  width: 120px;
  height: 80px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  overflow: hidden;
}

.bubble__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 6px 0 6px;
  border-color: #fff transparent transparent transparent;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.bubble__content {
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  padding: 10px;
}
</style>