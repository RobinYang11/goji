

<template>
  <div class="WaterfallList" ref="wrapper">
    <div class="WaterfallBox" ref="box" @scroll="obseverSrcoll">
      <div class="WaterfallCol" v-for="item in colList" :key="item.key" :style="{width:imgWidth}">
          <div class="item" v-for="(v) in item.dataList" :key="v.id">
            <img :src="v.url" style="width:100%" />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  reactive,
  defineEmits,
  defineProps,
  computed,
} from "vue";
import {throttle} from './util'
const emit = defineEmits(["lazyLoad"]);
const props = defineProps({
  list: Array,
  col: {
    type: Number,
    default: 3
  }
});
const wrapper = ref(null)
const box = ref(null)
const imgWidth = ref(`${100 / props.col}%`);
const lazyLoad = ()=>{
    emit('lazyLoad')
}
let colList = computed(() => {
  let imglist = [...props.list];
  let index = 0;
  let list = [];
  for (let i = 0; i < props.col; i++) {
    list.push({ key: i, dataList: [] });
  }
  imglist.forEach((item, ind) => {
    list[index].dataList.push(item);
    index++;
    if (index >= props.col) index = 0;
  });
  imglist = []
  return list;
});
let top = 0
const obseverSrcoll = throttle(()=>{
    const scrollTopHeight = box.value.scrollTop
    const scrollHeight = box.value.scrollHeight
    const clientHeight = wrapper.value.clientHeight
    if(scrollTopHeight+clientHeight>scrollHeight-500){
        lazyLoad()
    }   
},1000)

</script>
<style scoped>
.WaterfallList {
  width: 600px;
  height: 500px;
  overflow: hidden;
  border: 1px solid black;
}
.WaterfallBox {
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
}
.WaterfallCol {
  height: 500px;
}
.item {
  float: left;
  padding: 5px;
  border: 1px solid pink;
}
</style>