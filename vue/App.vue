
<template>
  <div class="App">
    <Table :data="data" :col="col" />
  </div>
</template>

<script>
import Table from './components/Table.vue';

export default {
  components: { Table },
  name: 'App',

  data() {
    return {
      data: [
				{
					key: '1',
					name: '胡彦斌',
					age: 32,
					address: '西湖区湖底公园1号',
				},
				{
					key: '2',
					name: '刘彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				}, {
					key: '1',
					name: '刘彦斌',
					age: 55,
					address: '西湖区湖底公园1号',
				},
				{
					key: '21',
					name: '李彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
			],
			col: [
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: '年龄',
					dataIndex: 'age',
					key: 'age',
				},
				{
					title: '住址',
					dataIndex: 'address',
					key: 'address',
				},
			]
    };
  }
};
</script>
