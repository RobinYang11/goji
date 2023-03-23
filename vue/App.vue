
<template>
  <div class="App">
    <EbTable
        index
        :data="data"
        :col="col"
        align="right"
    />
  </div>
</template>

<script>
import EbTable from './components/EbTable/index.vue';
export default {
  components: { EbTable },
  name: 'App',

  data() {
    return {
        msg: "有追求的",
      testCheck: true,
      data: [
        {
          col1: 'data1',
          col2: 'data2',
          col3: 'data33',
          col4: 'data42',
          col5: '5你好',
          col6: 'data6',
          col9: 28
        },
        {
          col3: 'data31',
          col4: 'data43',
          col5: '秋思234',
          col7: 'data7-01',
          col6: 'data6',
          col9: 18
        },
        {
          col4: 'data4',
          col5: '5不好',
          col6: 'data6',
          col9: 25
        },
        {
          col3: 'data32',
          col4: 'data41',
          col5: '5李三',
          col7: 'data7-02',
          col6: 'data6',
          col9: 8
        }
      ],
      col: [
        {
          name: 'col1',
          label: '列1',
          // width: '200px'
        },
        {
          name: 'col2',
          label: '列2',
          align: 'left'
        },
        {
          name: 'col3',
          label: '列3',
          sortable: true
        },
        {
          name: 'col4',
          label: '列4',
          align: 'right',
          sortable: true
        },
        {
          name: 'col5',
          label: '列5',
          filter: true
        },
        {
          name: 'col6',
          label: '列6'
        },
        {
          name: 'col7',
          label: '列7',
          filter: true
        },
        {
          name: 'col8',
          label: '列8'
        },
        {
          name: 'col9',
          label: '列9',
          sortable: true
        },
        {
          name: 'col10',
          label: '列10'
        }
      ]
    };
  }
};
</script>
