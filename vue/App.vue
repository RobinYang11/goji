<template>
  <div class="App">
    <Demo/>
  </div>
</template>

<script>
import Demo from './components/demo.vue';
import LoadImage from './components/LoadImage/index.vue';

export default {
  components: {Demo, LoadImage},
  name: 'App',

  data() {
    return {
      msg: "有追求的",
    };
  }
};
</script>

<style>
.App {
  /* height: 1500px; */
}
</style>
