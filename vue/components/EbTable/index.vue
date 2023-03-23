<template>
  <div v-if="col.length" class="eb-table eb-table-thr-border" :style="{ width: width ? width : '100%'}">
    <table width="100%" cellspacing="0" cellpadding="0">
      <!-- 表头行 -->
      <thead class="eb-table-head-bg" :style="styleConfig?.headerStyle">
        <th v-if="index" class="eb-table-thr-border eb-table-thr-index" align="center">序号</th>
        <th v-for="cItem in newCol" :width="cItem.width" :align="cItem.align ? cItem.align : 'center'" class="eb-table-thr-border">
          {{ cItem.label }}
          <!--    过滤-筛选     -->
          <el-icon v-if="cItem.filter" class="eb-table-th-icon" @click="() => { cItem.showFilter = !cItem.showFilter; this.filterContent = ''}"><Search /></el-icon>
          <div v-if="cItem.filter && cItem.showFilter" class="eb-table-th-filterbox" @mouseleave="cItem.showFilter = false">
            <input :value="filterContent" placeholder="请输入过滤内容" class="eb-table-th-filterbox-input" @change="handleFilterContent"/>
            <input value="搜索" type="button" class="eb-table-th-filterbox-button" @click="handleFilter(cItem.name)" />
          </div>
          <!--    排序   -->
          <el-icon v-if="cItem.sortable && !cItem.sortUp && !cItem.sortDown" class="eb-table-th-icon" @click="handleSortDown(cItem, cItem.name)"><Sort /></el-icon>
          <!--    降序   -->
          <el-icon v-if="cItem.sortable && cItem.sortDown" class="eb-table-th-icon" @click="handleSortDown(cItem, cItem.name)"><SortDown /></el-icon>
          <!--    升序   -->
          <el-icon v-if="cItem.sortable && cItem.sortUp" class="eb-table-th-icon" @click="handleSortUp(cItem, cItem.name)"><SortUp /></el-icon>
        </th>
      </thead>
      <!-- 表格数据行 -->
      <tbody v-if="newData.length">
        <tr v-for="(dItem, dIndex) in newData">
          <td v-if="index" class="eb-table-thr-border eb-table-thr-index" align="center">{{ dIndex + 1 }}</td>
          <td v-for="cItem in col" :width="cItem.width" :align="cItem.align ? cItem.align : 'center'" class="eb-table-thr-border">
            {{typeof dItem === 'object' ? dItem[cItem.name] : '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!newData || newData.length < 1" class="eb-table-body-empty" :style="{ width: width ? width : '100%'}">
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
          //   filter: true, // 过滤 筛选
          //   sortable: true, // 控制排序
          //   align: 'center', // 内容位置： 默认center  可选值 right, left, center
          // }
        ]
      }
    },
    width: String,
    align: String,
    selection: Boolean,
    index: Boolean,
    styleConfig: Object,
  },
  data() {
    return {
      filterContent: '', // 过滤条件
      newData: [...this.data] // 展示数据
    }
  },
  computed: {
    newCol: {
      get() {
        const myCol = this.col
        myCol.forEach(item => {
          if (item.hasOwnProperty('filter')) item['showFilter'] = false
          if (item.hasOwnProperty('sortable')) {
            item['sortUp'] = false
            item['sortDown'] = false
          }
        })
        return myCol
      }
    }
  },
  created() {
  },
  methods: {
    // 过滤内容赋值
    handleFilterContent(data) {
      this.filterContent = data.target.value
    },
    // 处理过滤内容
    handleFilter(colKey) {
      this.newData = this.data.filter(item => item[colKey] && item[colKey].indexOf(this.filterContent) !== -1)
    },
    // 排序--降序
    handleSortDown(cItem, key) {
      this.handleSortIconBack(key)
      cItem.sortUp = true
      cItem.sortDown = false
      this.newData = this.handleSort(key, 'sortDown')
    },
    // 排序--升序
    handleSortUp(cItem, key) {
      this.handleSortIconBack(key)
      cItem.sortUp = false
      cItem.sortDown = true
      this.newData = this.handleSort(key, 'sortUp')
    },
    // 处理排序
    handleSort(key, sortType = 'sortUp') {
      let valueType;
      const keyValueList = this.newData.map(item => {
        return item[key]
      })
      // 判断元素类型
      valueType = keyValueList.some(item => typeof item === 'number') ? 'number' : 'string'
      const downList = valueType === 'number' ? this.handleNumberSort(keyValueList, sortType) : this.handleStringSort(keyValueList, sortType)
      let newData = []
      downList.forEach(item => {
        newData = [...newData, ...this.newData.filter(ni => ni[key] === item)]
      })
      return newData
    },
    // 字符排序
    handleStringSort(arr, sortType = 'sortUp') {
      // 正常排序--升序
      const newArr = arr.sort((a,b) => a.localeCompare(b));
      // 非null, undefined 元素集合
      const valueArr = sortType === 'sortUp' ? newArr.filter(item => item) : newArr.filter(item => item).reverse()
      // null, undefined 元素集合
      const nunList = newArr.filter(item => !item)
      return [...valueArr, ...nunList]
    },
    handleNumberSort(arr, sortType = 'sortUp') {
      // 非null, undefined 元素集合
      const valueArr = arr.filter(item => !isNaN(item))
      // null, undefined 元素集合
      const nunList = arr.filter(item => isNaN(item))
      valueArr.sort((a,b) => {
        return sortType === 'sortUp' ? a - b : b - a
      })
      return [...valueArr, ...nunList]
    },
    // 还原其他列排序图标
    handleSortIconBack(key) {
      this.$nextTick(() => {
        this.newCol.forEach(item => {
          if (item.name !== key) {
            item['sortUp'] = false
            item['sortDown'] = false
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.eb-table-thr-border {
  border: 1px solid #000;
  position: relative;
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

.eb-table-th-icon {
  display: inline-block;
  font-size: 12px;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  cursor: pointer;
}
.eb-table-th-filterbox {
  position: absolute;
  z-index: 999;
  width: 180px;
  height: 70px;
  left: -150px;
  top: -10px;
  padding: 20px 5px;
  border-radius: 4px;
  border: 1px solid #305ee8;
  background-color: #b8f2f9;
  /*box-shadow:  5px 5px 10px #183076,*/
  /*-5px -5px 10px #488cff;*/
}
.eb-table-th-filterbox-input {
  display: inline-block; width: 138px; height: 26px; margin-bottom: 8px;
  outline: none;
  border: none;
}
.eb-table-th-filterbox-input:focus{
  border: 1px solid #305ee8;
}
.eb-table-th-filterbox-button {
  display: inline-block; width: 140px; height: 28px;
  background-color: rgba(48,94,232, 0.6);
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
.eb-table-th-filterbox-button:active {
  background-color: rgba(48,94,232, 1);
}
</style>
