<template>
  <div class="demo">点击表头进行排序，输入文字进行筛选</div>
  <Table :columns="columns" :data-source="dataSource" />
</template>
<style scoped>
.demo {
  color: red;
}
</style>
<script>
import Table from "./Table/index.vue";
export default {
  components: { Table },
  data() {
    return {
      name: "demo",
      columns: [
        { title: "姓名", field: "name", key: "1" },
        { title: "年龄", field: "age", key: "2" },
        { title: "性别", field: "gender", key: "3" },
      ],
      dataSource: [
        { name: "卢明", age: 22, gender: "男", id: "a1" },
        { name: "胡丽", age: 28, gender: "女", id: "b2" },
        { name: "张凤", age: 19, gender: "女", id: "c3" },
        { name: "李斌", age: 25, gender: "男", id: "d4" },
        { name: "陈雪", age: 21, gender: "女", id: "e5" },
        { name: "王新", age: 30, gender: "男", id: "f6" },
        { name: "赵柳", age: 27, gender: "女", id: "g7" },
        { name: "孙伟", age: 23, gender: "男", id: "h8" },
        { name: "吴莉", age: 26, gender: "女", id: "i9" },
        { name: "郑强", age: 20, gender: "男", id: "j10" },
        { name: "林婷", age: 24, gender: "女", id: "k11" },
        { name: "黄勇", age: 31, gender: "男", id: "l12" },
        { name: "徐琳", age: 29, gender: "女", id: "m13" },
        { name: "高峰", age: 18, gender: "男", id: "n14" },
        { name: "罗娜", age: 32, gender: "女", id: "o15" },
        { name: "周俊", age: 22, gender: "男", id: "p16" },
        { name: "朱丹", age: 33, gender: "女", id: "q17" },
        { name: "冯刚", age: 20, gender: "男", id: "r18" },
        { name: "胡萍", age: 27, gender: "女", id: "s19" },
        { name: "王波", age: 24, gender: "男", id: "t20" },
      ],
    };
  },
};
</script>
