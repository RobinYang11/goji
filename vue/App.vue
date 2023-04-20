
<template>
  <div class="App">
    <Demo/>
    <mytable :col="col" :data="students"/>
  </div>
</template>

<script>
import Demo from './components/demo.vue';
import Mytable from './components/mytable.vue';

export default {
  components: { Demo,Mytable },
  name: 'App',

  data() {
    return {
        msg: "有追求的",
        students:[
        { name: '张三', age: 20, height: 175 },
        { name: '李四', age: 18, height: 170 },
        { name: '王五', age: 22, height: 180 },
        { name: '赵六', age: 19, height: 172 },
        { name: '王五', age: 23, height: 170 }
        ],
        col:[
        { key: 'name', label: '姓名',  },
        { key: 'age', label: '年龄' },
        { key: 'height', label: '身高' }
        ]
    };
  }
};
</script>
