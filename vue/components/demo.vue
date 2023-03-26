
<template>
	<div class="demo">
  	<MyTable :columns="columns" :table-data="tableData" class="demo-table" />
	</div>
</template>
<style scoped>
 .demo{
 }
</style>
<script>
import MyTable from '@/components/Table/index.vue'
import Mock from 'mockjs'
export default {
	components: { MyTable },
 data() {
	 return {
		 name:'Demo',
    //  table 每列数据对应的字段
		 columns: [
        { label: "id", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "gender" },
        { label: "年龄", prop: "age" },
        { label: "出生日期", prop: "birthday" },
        { label: "出生地", prop: "city" },

      ],
      tableData: [],
	 }
 },
 computed:{
 
 },
 created() {
    const data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|20-70': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': '@cname',  //中文名称
        'gender': '@cword("男女")',  // 性别       
        'age|1-100': 100,  //100以内随机整数,
        'birthday': '@date("yyyy-MM-dd")', //日期
        'city': '@city(true)'  //中国城市
      }]
    })
    this.tableData = data.list
 }
}
</script>
<style>
.demo {
  padding :20px;
}
.demo-table {
  width: 50%;
}
</style>
