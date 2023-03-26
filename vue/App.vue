
<template>
  <div class="App">
    <Demo />
  </div>
</template>

<script>
import Demo from './components/demo.vue';
export default {
  components: { Demo },
  name: 'App',

  data() {
    return {
        msg: "有追求的",
    };
  }
};
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>
