
<template>
	<div class="demo">
    <!-- table 组件 -->
  	<MyTable :columns="columns" :table-data="tableData" class="demo-table" />
    <!-- 气泡框  -->
    <MyPopover :content="content" :title="title" class="demo-popover" :trigger="triggerType">
        <button class="prop-btn" >hover me</button>
    </MyPopover>

    <MyPopover :content="content" :title="title" class="demo-popover">
        <button class="prop-btn" >click me</button>
    </MyPopover>

    <!-- 图片滚动加载 -->
    <MyLoadImage class="demo-image" :urls="urls" :preloadNumber="2" ></MyLoadImage>

	</div>
</template>
<style scoped>
 .demo{
 }
</style>
<script>
import MyTable from '@/components/Table/index.vue'
import MyPopover from  '@/components/Popover/index.vue'
import MyLoadImage from '@/components/LoadImage/index.vue'
import Mock from 'mockjs'
export default {
	components: { 
    MyTable,
    MyPopover,
    MyLoadImage
  },
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
      content:` <div>
                  <p>Content</p>
                  <p>Content</p>
                </div>`,
      title:'haha',
      triggerType: 'hover',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
	 }
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
<style lang="less" scoped>
.demo {
  padding :20px;
}
.demo-table {
  width: 50%;
}
.demo-popover {
  display: inline-block;
  margin: 20px 50px;
  
  .prop-btn {
    height: 28px;
    padding: 0 10px;
    line-height: 28px;
    border-radius: 4px;
    color: #fff;
    background-color: #258aff;
    border: none;
    cursor: pointer;
  }
}
.demo-image {
  height: 500px;
  width: 50%;
  border: 1px solid #ebeef5;
  border-radius: 8px;

}
</style>
