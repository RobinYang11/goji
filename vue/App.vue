
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
import EbTable from './components/Table/index.vue';
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
          col3: 'data3',
          col4: 'data4',
          col5: 'data5',
          col6: 'data6'
        },
        {
          col4: 'data4',
          col5: 'data5',
          col6: 'data6'
        }
      ],
      col: [
        {
          name: 'col1',
          label: '列1',
          width: '200px'
        },
        {
          name: 'col2',
          label: '列2',
          align: 'left'
        },
        {
          name: 'col3',
          label: '列3'
        },
        {
          name: 'col4',
          label: '列4',
          align: 'right'
        },
        {
          name: 'col5',
          label: '列5'
        },
        {
          name: 'col6',
          label: '列6'
        },
        {
          name: 'col7',
          label: '列7'
        },
        {
          name: 'col8',
          label: '列8'
        },
        {
          name: 'col9',
          label: '列9'
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
