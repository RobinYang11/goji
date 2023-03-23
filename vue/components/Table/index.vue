<template>
  <div v-if="col.length" class="eb-table eb-table-thr-border" :style="{ width: width ? width : '100%'}">
    <table width="100%" cellspacing="0" cellpadding="0">
      <!-- 表头行 -->
      <thead class="eb-table-head-bg">
        <th v-if="index" class="eb-table-thr-border eb-table-thr-index" align="center">序号</th>
        <th v-for="cItem in col" :width="cItem.width" :align="cItem.align ? cItem.align : 'center'" class="eb-table-thr-border">
          {{ cItem.label }}
        </th>
      </thead>
      <!-- 表格数据行 -->
      <tbody v-if="data.length">
        <tr v-for="(dItem, dIndex) in data">
          <td v-if="index" class="eb-table-thr-border eb-table-thr-index" align="center">{{ dIndex + 1 }}</td>
          <td v-for="cItem in col" :width="cItem.width" :align="cItem.align ? cItem.align : 'center'" class="eb-table-thr-border">
            {{typeof dItem === 'object' ? dItem[cItem.name] : '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!data || data.length < 1" class="eb-table-body-empty" :style="{ width: width ? width : '100%'}">
      暂无数据
    </div>
  </div>
</template>

<script>
export default {
  name: "EbTable",
  props: {
    data: {
      type: Array,
      default: function () {
        return [
          // {}
        ]
      },
    },
    col: {
      type: Array,
      default: function () {
        return [
          // {
          //   name: '', // 对应数据data item 的 key
          //   label: '', // 表格列名
          //   width: '', // 列宽
          //   align: 'center', // 内容位置： 默认center  可选值 right, left, center
          // }
        ]
      }
    },
    width: String,
    align: String,
    selection: Boolean,
    index: Boolean,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
.eb-table-thr-border {
  border: 1px solid #000;
}
.eb-table-head-bg {
  background-color: #F4F4F5;
}
.eb-table-body-empty {
  text-align: center;
}
.eb-table table th,td {
  display: table-cell;
  vertical-align: inherit;
}
.eb-table table th {
  padding: 6px 0;
}
.eb-table table td {
  padding: 4px 0;
}
.eb-table-thr-selection,.eb-table-thr-index {
  width: 60px;
}
</style>
