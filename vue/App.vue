
<template>
  <div class="App">
    <!-- <Demo /> -->
    <Table :data="data.tableData" :col="data.tableCol" />
    <Pagination
      v-model:page="query.page"
      :totle="query.totle"
      :size="query.size"
      @pageChange="loadData"
    ></Pagination>
  </div>
</template>

<script setup>
import Demo from "./components/demo.vue";
import Table from "./components/Table.vue";
import { tableData } from "../mock/fileMock";
import { reactive } from "vue";
import Pagination from "./components/Pagination.vue";
let query = reactive({
  size: 4,
  totle: 22,
  page: 2,
});
const data = reactive({
  tableData: tableData,
  tableCol: [
    {
      index: "name",
      name: "名字",
    },
    {
      index: "sex",
      name: "性别",
      filters: ["female", "man"],
    },
    {
      index: "age",
      name: "年龄",
      sortable: true,
    },
    {
      index: "score",
      name: "成绩",
      sortable: true,
    },
    {
      index: "hobby",
      name: "兴趣",
      filters: ["游泳", "跳舞", "唱歌", "打球", "阅读", "排球", "睡觉"],
    },
  ],
});

const loadData = () => {
  console.log("翻页加载数组更新", query);
};
</script>
