<template>
  <HardTable :dataSource="dataSource" :columns="columns" />
</template>

<script>
import HardTable from './index.vue'
export default {
  components: {
    HardTable
  },
  data () {
    return {
      dataSource: [
        { id: 0, name: "李河", age: 10, address: "江西省" },
        { id: 1, name: "东方晶松", age: 56, address: "台湾省" },
        { id: 2, name: "严伯娟仁", age: 28, address: "山东省" },
        { id: 3, name: "纪阅晴", age: 9, address: "河南省" },
        { id: 4, name: "白彬", age: 25, address: "湖北省" },
        { id: 5, name: "解唯", age: 45, address: "湖南省" },
        { id: 6, name: "靳霄思", age: 31, address: "广东省" },
        { id: 7, name: "李承卿倩", age: 62, address: "海南省" },
        { id: 8, name: "魏武娴姬", age: 54, address: "四川省" },
        { id: 9, name: "甄诚琛", age: 32, address: "贵州省" },
        { id: 10, name: "慕容克超", age: 75, address: "云南省" },
        { id: 11, name: "司马新怡", age: 11, address: "河北省" },
        { id: 12, name: "包文瑗", age: 25, address: "山西省" },
        { id: 13, name: "毕爽辉", age: 14, address: "辽宁省" },
        { id: 14, name: "米君桦建", age: 17, address: "吉林省" },
        { id: 15, name: "陆艳云", age: 34, address: "黑龙江省" },
        { id: 16, name: "施祥", age: 52, address: "江苏省" },
        { id: 17, name: "呼延阳弘俊", age: 58, address: "浙江省" },
        { id: 18, name: "廖秀园", age: 64, address: "安徽省" },
        { id: 19, name: "衣楠世", age: 68, address: "福建省" },
        { id: 20, name: "习成", age: 41, address: "陕西省" }
      ],
      columns: [
        { dataIndex: "id", title: "编号", sorter: true, filter: true },
        { dataIndex: "name", title: "姓名", filter: true },
        { dataIndex: "age", title: "年龄", sorter: true, filter: true },
        { dataIndex: "address", title: "省份地址", filter: true },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
