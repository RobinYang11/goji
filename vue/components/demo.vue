<template>
  <div>
    <div class="demo">this is a {{ name }}</div>
    <hr />

    <div>Table</div>
    <mytable
      class="mytable"
      :data="list"
      :col="listHead"
      :filterable="true"
      filterBy="id>=5"
      :sortable="true"
      sortBy="grade,1"
      border="1px solid blue"
      bgColor="skyblue"
      color="red"
    ></mytable>
    <hr />

    <div>Modal</div>
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
    <loadimage class="loadimage" :duration="300" :timer="2000"></loadimage>
    <hr />

    <div>Popover</div>
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
    <tablepagination
      class="tablePage"
      width="80px"
      height="50px"
      bgColor="skyblue"
      border="1px solid red"
      borderCollapse="collapse"
      :sortable="true"
      sortBy="id,1"
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
