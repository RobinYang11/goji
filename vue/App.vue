<template>
  <div class="App">
    <Demo/>
    <LoadImage
      :src="this.imageUrl1"
      :loading="this.loadingImageUrl"
    />
    <LoadImage :fallback="this.fallbackImageUrl" :loading="this.loadingImageUrl" :src="this.badImageUrl5"/>
    <LoadImage :loading="this.loadingImageUrl" :src="this.imageUrl2"/>
    <LoadImage :loading="this.loadingImageUrl" :src="this.imageUrl4"/>
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
      loadingImageUrl: 'https://img0.baidu.com/it/u=1894270481,1645928567&fm=253&fmt=auto&app=138&f=JPEG?w=474&h=500',
      imageUrl1: 'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      imageUrl2: 'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      imageUrl3: 'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      imageUrl4: 'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      fallbackImageUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      badImageUrl5: 'https://xxximages.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    };
  }
};
</script>

<style>
.App {
  height: 1500px;
}
</style>
