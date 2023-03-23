
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
  </div>
</template>

<script>
import CaseyTable from './components/CaseyTable/index.vue';
import CaseyModal from './components/CaseyModal/index.vue';
export default {
  components: { CaseyTable,CaseyModal, },
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
  height: 100vh;
}
.Division-line{
  text-align: center;
  margin: 20px auto;
}
</style>
