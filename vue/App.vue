<template>
  <div class="App">
    <div class="Division-line">{{'-------------------以下是表格组件---------------------'}}</div>
      <!--    Question 1.以下是表格组件-->
      <CaseyTable :columns="columns" :data="TableData"/>

    <div class="Division-line">{{'-------------------以下是弹框组件---------------------'}}</div>
      <!--    Question 2.以下是弹框组件-->
      <button @click="showDialog">显示弹框</button>
      <CaseyModal :visible.sync="dialogVisible" title="自定义标题">
        <p>这是弹框的内容</p>
        <template #footer>
          <button @click="handleOK">确定</button>
          <button @click="handleCancel">取消</button>
        </template>
      </CaseyModal>
    <Demo/>
    <LoadImage :imageList="imageUrls" />
  </div>
</template>

<script>
import CaseyTable from './components/CaseyTable/index.vue';
import CaseyModal from './components/CaseyModal/index.vue';
import Demo from './components/demo.vue';
import LoadImage from './components/LoadImage/index.vue';
export default {
  components: {Demo, LoadImage,CaseyTable,CaseyModal,},
  name: 'App',
  data() {
    return {
      // 表头
      columns:[
        {
          title:'姓名',
          key:'name',
          width:'120'
        },
        {
          title:'性别',
          key:'sex',
          width:'60'
        },
        {
          title:'年龄',
          key:'age',
          width:'60'
        }
      ],
      // 表格数据
      TableData:[
        {
          name:'小明',
          sex:'男',
          age:'25'
        },
        {
          name:'小红',
          sex:'女',
          age:'26'
        },
        {
          name:'小刚',
          sex:'男',
          age:'28'
        },
        {
          name:'小蓝',
          sex:'女',
          age:'21'
        },
        {
          name:'花花',
          sex:'女',
          age:'21'
        },
        {
          name:'明明',
          sex:'男',
          age:'21'
        }
      ],
      // 弹框显示
      dialogVisible: false,
      msg: "有追求的",
      imageUrls: [
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679397002175-cf3fa427bfa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1679392454750-a02b9753e683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679398380337-d953e0f65e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1679400859117-2b2b877fb38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      ],
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    handleOK() {
      this.dialogVisible = false;
      // 确定按钮的逻辑
    },
    handleCancel() {
      this.dialogVisible = false;
      // 取消按钮的逻辑
    }
  }
};
</script>
<style scoped >
.App{
height: 1500px;
}
.Division-line{
  text-align: center;
  margin: 20px auto;
}
</style>
