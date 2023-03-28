<template>
  <div class="demo">this is a {{ name }}</div>
  <RETableDemo/>
</template>
<style scoped>
.demo {
  color: red
}
</style>
<script>
import RETableDemo from './RETable/demo.vue'

export default {
  components: {RETableDemo},
  data() {
    return {
      name: "demo"
    }
  }
}
</script>
