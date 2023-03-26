<template>
  <div>
    <div class="demo">this is a {{ name }}</div>
    <hr />

    <div>Table</div>
    <!--
		 mytable组件：
		属性：data,col,sortable,sortBy,filterable,filterBy,tAlign,vAlign,bgColor,color,border
			data值为要展示为表格的数据，是个数组，元素是对象
			col值为表头，是个数组，元素是字符串，字符串顺序与上述对象的属性应该一一对应
			sortable是否排序，默认为false
			sortBy值是一个字符串，字符串中间用逗号分开，逗号前面的为排序依据，逗号后面的为排序方式，可选值有-1和1，-1表示降序，1表示升序
			filterable是否筛选，默认为false
			filterBy值为字符串，表示筛选条件
      tAlign属性，值是字符串，用于设置每个表格的水平文本对齐方式
      vAlign属性，值是字符串，用于设置每个表格的垂直方向的文本对齐方式
      bgColor属性，值是字符串，用于设置每个表格的背景颜色
      color属性，值是字符串，用于设置每个表格内的文本颜色
      border属性，值是字符串，用于设置每个表格边框
	 -->
    <mytable
      class="mytable"
      :data="list"
      :col="listHead"
      :filterable="true"
      filterBy="id>=3"
      :sortable="true"
      sortBy="grade,1"
      border="1px solid blue"
      bgColor="skyblue"
      color="red"
    ></mytable>
    <hr />

    <div>Modal</div>
    <!-- 
		mymodal组件：
		属性：title,cancelText,confirmText,contentText,mask,bgColor,color,width
		事件：cancel,confirm
		title属性，值为一个字符串，用来填充弹出框的标题，默认值为‘提示’
		cancelText属性，值为一个字符串，用来设置取消按钮的文本内容，默认值为‘取消’
		confirmText属性，值为一个字符串，用来设置确定按钮的文本内容,默认值为‘确定’
		contentText属性，值为一个字符串，用来设置弹出框的正文内容,默认值为‘确定删除吗？’
		mask属性，值为布尔类型，用来设置是否显示遮罩层，true:显示遮罩层，false:不显示遮罩层，默认值为false
    bgColor属性，值为一个字符串，用来设置弹出框的背景颜色
    color属性，值为一个字符串，用来设置弹出框的文本颜色
    width属性，值为一个字符串，用来设置弹出框的宽度
		
		cancel事件，点击取消按钮时触发的事件
		confirm事件，点击确定按钮时触发的事件
	 -->
    <button @click="show = true">点击弹框</button>
    <mymodal
      v-show="show"
      @cancel="handleCancel"
      @confirm="handleConfirm"
      :title="title"
      :cancelText="cancelText"
      :confirmText="confirmText"
      :contentText="contentText"
      :mask="true"
      width="20%"
      bgColor="orange"
      color="white"
    ></mymodal>
    <hr />

    <div>loadImage</div>
    <!--
       loadimage组件：
		属性：imgUrls,imgWidth,imgHeight,duration,timer,timingFunction
		imgUrls属性，值为数组类型，元素是字符串，是轮播展示的图片路径
		imgWidth属性，值为一个字符串，用来设置图片的宽度
		imgHeight属性，值为一个字符串，用来设置图片的高度
		duration属性，值是Number类型的，用来设置每张图片的过渡时间
		timer属性，值是Number类型的，用来设置每张图片的显示时间，并且值不能低于2倍的duration
    timingFunction属性，值为一个字符串，用来设置图片的过渡函数
     -->
    <loadimage class="loadimage" :duration="300" :timer="2000"></loadimage>
    <hr />

    <div>Popover</div>
    <!-- 
      mypop组件：
		属性：show,title,content,width,color,align，placement
    show属性，值为布尔类型，用来控制气泡框的显示与隐藏
		title属性，值为一个字符串，用来填充气泡框的标题，默认值为‘气泡框标题’
		content属性，值为一个字符串，用来填充气泡框的内容，默认值为‘我是气泡框内容区我是气泡框内容区我是气泡框内容区’
		width属性，值为一个字符串，用来设置气泡框的宽度,默认值为‘150px’
		color属性，值为一个字符串，用来设置气泡框中文字的颜色,默认值为‘black’
		align属性，值为一个字符串，用来设置气泡框中文字的对齐方式，默认值为‘left’
    placement属性，值为一个字符串，用来设置气泡框的位置，可选值有 "left","right","top","bottom",默认值为bottom

     -->
    <mypop
      :show="showPop"
      title="小标题"
      content="测试一下测试一下"
      width="150px"
      color="blue"
      align="center"
      :placement="placement"
    >
      <button @click="handlePop">点击切换气泡框</button>
    </mypop>
    <hr />

    <div>TablePagination</div>
    <!-- 
      tablepagination组件：
		属性：data,col,sortable,sortBy,filterable,filterBy,width,height,tAlign,vAlign,bgColor,color,border，
          pageSize，pageBtn，currentPage
    事件：changeCurrentPage，prevPage，nextPage
			data值为要展示为表格的数据，是个数组，元素是对象
			col值为表头，是个数组，元素是字符串，字符串顺序与上述对象的属性应该一一对应
			sortable是否排序，默认为false
			sortBy值是一个字符串，字符串中间用逗号分开，逗号前面的为排序依据，逗号后面的为排序方式，可选值有-1和1，-1表示降序，1表示升序
			filterable是否筛选，默认为false
			filterBy值为字符串，表示筛选条件
      width属性，值为字符串，用于设置单元格的宽度
      height属性，值为字符串，用于设置单元格的高度
      tAlign属性，值是字符串，用于设置单元格的水平文本对齐方式
      vAlign属性，值是字符串，用于设置单元格的垂直方向的文本对齐方式
      bgColor属性，值是字符串，用于设置每单元格的背景颜色
      color属性，值是字符串，用于设置单元格内的文本颜色
      border属性，值是字符串，用于设置单元格边框
      borderCollapse属性，值是字符串，用于设置单元格之间的边框是否合并
      pageSize属性，值是Number，用于设置每页表格展示数据的数量
      pageBtn属性，值是Number，用于设置每页表格连续页码的数量
      currentPage属性，值是Number，用于设置当前页
      事件：
      changeCurrentPage改变当前页时触发
      prevPage点击上一页时触发
      nextPage点击下一页时触发
     -->
    <tablepagination
      class="tablePage"
      width="80px"
      height="50px"
      bgColor="skyblue"
      border="1px solid red"
      borderCollapse="collapse"
      :sortable="true"
      sortBy="grade,1"
      :data="list"
      :col="listHead"
      :pageSize="pageSize"
      :pageBtn="pageBtn"
      :currentPage="currentPage"
      @changeCurrentPage="handleCurrentPage"
      @prevPage="handlePrev"
      @nextPage="handleNext"
    ></tablepagination>
  </div>
</template>
<style scoped lang="less">
.demo {
  color: red;
}
.mytable {
  background-color: rgb(211, 204, 204);
  border: 1px solid rgb(163, 183, 206);
  width: 400px;
  height: 300px;
  text-align: center;
  border-collapse: collapse;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
}
.loadimage {
  width: 300px;
  padding-top: 250px;
}
.tablePage {
  text-align: left;
}
</style>
<script>
import { reactive, ref } from "vue";
import mytable from "./mytable.vue";
import mymodal from "./mymodal.vue";
import loadimage from "./loadimage.vue";
import mypop from "./mypop.vue";
import tablepagination from "./tablepagination.vue";
export default {
  setup() {
    let name = ref("Demo");

    //测试 table 的相关数据
    let listHead = reactive(["名字", "成绩", "id"]);
    let list = reactive([
      { name: "w", grade: 12, id: 1 },
      { name: "s", grade: 134, id: 2 },
      { name: "j", grade: 54, id: 3 },
      { name: "su", grade: 75, id: 4 },
      { name: "g", grade: 9, id: 5 },
      { name: "m", grade: 7, id: 6 },
      { name: "n", grade: 87, id: 7 },
      { name: "b", grade: 34, id: 8 },
      { name: "a", grade: 5, id: 9 },
      { name: "i", grade: 6, id: 10 },
      { name: "h", grade: 97, id: 11 },
      { name: "k", grade: 40, id: 12 },
    ]);

    //测试 modal 的相关数据
    let show = ref(false);
    let title = ref("提示");
    let cancelText = ref("取消呀");
    let confirmText = ref("确定喽");
    let contentText = ref("确定删除这个项目吗？");
    //取消事件的回调函数
    function handleCancel() {
      show.value = false;
    }
    //确定事件的回调函数
    function handleConfirm() {
      show.value = false;
    }

    //测试 Popover 的相关数据
    let showPop = ref(false);
    let placement = ref("right");
    //切换气泡框的回调函数
    function handlePop() {
      showPop.value = !showPop.value;
    }

    //测试 TablePagination 的相关数据
    let currentPage = ref(1);
    let pageSize = ref(5);
    let pageBtn = ref(3);
    function handlePrev() {
      currentPage.value--;
    }
    function handleNext() {
      currentPage.value++;
    }
    function handleCurrentPage(p) {
      currentPage.value = p;
    }

    return {
      name,
      listHead,
      list,
      show,
      title,
      cancelText,
      confirmText,
      contentText,
      handleCancel,
      handleConfirm,
      showPop,
      placement,
      handlePop,
      currentPage,
      pageSize,
      pageBtn,
      handlePrev,
      handleNext,
      handleCurrentPage,
    };
  },
  components: {
    mytable,
    mymodal,
    loadimage,
    mypop,
    tablepagination,
  },
};
</script>
