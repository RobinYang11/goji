<template>
  <table class="nc-table-wrapper" border="0" cellpadding="0" cellspacing="0">
    <thead class="nc-table-thead">
      <tr>
        <th v-for="column in columns" :key="column.name">
          <div class="nc-table-thead-th">
            <span class="can-click" @click="handleSort(column.dataIndex, column, true)">
              <span>{{ column.title }}</span>
              <template v-if="column.sorter">
                <svg class="nc-talbe-thead-sort" :class="{active: column.sort == 'ascend'}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M511.96 257.73L67 766.27h890L511.96 257.73z"></path>
                </svg>
                <svg class="nc-talbe-thead-sort" :class="{active: column.sort == 'descend'}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path d="M511.96 766.27L67 257.73h890L511.96 766.27z"></path>
                </svg>
              </template>
            </span>
            <svg class="nc-table-thead-filter" v-if="column.filter" @click="handleShowPop($event, column.dataIndex)" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M568.552727 954.181818a86.341818 86.341818 0 0 1-41.425454-10.472727l-114.269091-62.836364a86.574545 86.574545 0 0 1-44.916364-76.101818V442.181818a16.989091 16.989091 0 0 0-6.981818-13.730909L97.047273 218.298182 93.090909 214.807273A85.876364 85.876364 0 0 1 155.927273 69.818182h711.214545A86.574545 86.574545 0 0 1 930.909091 214.807273l-3.490909 3.490909-266.24 213.410909a17.454545 17.454545 0 0 0-6.050909 13.730909v422.4A86.341818 86.341818 0 0 1 568.552727 954.181818zM141.963636 166.632727l262.283637 209.454546A85.178182 85.178182 0 0 1 437.061818 442.181818v362.589091a17.92 17.92 0 0 0 8.610909 15.592727l114.269091 62.138182a17.687273 17.687273 0 0 0 17.687273 0 17.221818 17.221818 0 0 0 8.378182-15.36V445.44a85.876364 85.876364 0 0 1 31.883636-67.258182l263.214546-211.549091a17.687273 17.687273 0 0 0 1.62909-18.152727 17.454545 17.454545 0 0 0-15.592727-8.843636H155.927273a17.221818 17.221818 0 0 0-13.963637 27.694545zM920.669091 512h-188.974546a34.443636 34.443636 0 0 1 0-69.818182h188.974546a34.443636 34.443636 0 0 1 0 69.818182z m0 128.930909h-188.974546a34.443636 34.443636 0 0 1 0-69.818182h188.974546a34.443636 34.443636 0 0 1 0 69.818182z m0 128h-188.974546a34.443636 34.443636 0 0 1 0-69.818182h188.974546a34.443636 34.443636 0 0 1 0 69.818182z"></path>
            </svg>
          </div>
        </th>
        <teleport to="body" v-if="popoverVisible">
          <div class="nc-table-filter-mask" @click.self="handleHidePopover">
            <!-- 鼠标点击其他地方，要隐藏弹框 -->
            <div class="nc-table-filter-box" :style="popoverStyle">
              <div class="nc-table-filter-box-content">
                <input type="text" v-model="filter" class="nc-table-filter-input">
              </div>

              <div class="nc-table-filter-box-footer">
                <div @click="handleFilter">确定</div>
                <div @click="handleReset">重置</div>
              </div>
            </div>
          </div>
        </teleport>
      </tr>
    </thead>
    <tbody class="nc-table-tbody">
      <tr v-for="(data, index) in dataSource" :key="index">
        <td v-for="column in columns" :key="column.dataIndex">{{ data[column.dataIndex] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    col: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dataSource: this.data,
      columns: this.col,
      sortDirections: ["descend", "ascend"], // 降序，升序
      popoverVisible: false,
      popoverStyle: {},
      filter: "",
      filterCol: "",
      filterData: this.data,
      sortConfig: {
        dataIndex: "",
        sort: ""
      }
    }
  },
  watch: {
    data (val) {
      this.dataSource = val
    }
  },
  methods: {
    handleSort (dataIndex, column, type) {
      if (column.sort === "ascend") {
        for (const item of this.columns) {
          item.sort = undefined
        }
        // 转为降序
        if (type) {
          column.sort = "descend"
          this.sortConfig.dataIndex = dataIndex
          this.sortConfig.sort = "descend"
        }
        this.dataSource = JSON.parse(JSON.stringify(this.filterData)).sort((a, b) => {
          if (typeof a[dataIndex] === 'number') {
            return a[dataIndex] - b[dataIndex]
          } else {
            return a[dataIndex] > b[dataIndex] ? 1 : -1
          }
        }).reverse()
      } else if (column.sort === "descend") {
        // 转为不排序
        for (const item of this.columns) {
          item.sort = undefined
        }
        if (type) {
          column.sort = ""
          this.sortConfig.dataIndex = ""
          this.sortConfig.sort = ""
        }
        this.dataSource = JSON.parse(JSON.stringify(this.filterData))
      } else {
        // 转为升序
        for (const item of this.columns) {
          item.sort = undefined
        }
        if (type) {
          column.sort = "ascend"
          this.sortConfig.dataIndex = dataIndex
          this.sortConfig.sort = "ascend"
        }
        this.dataSource = JSON.parse(JSON.stringify(this.filterData)).sort((a, b) => {
          if (typeof a[dataIndex] === 'number') {
            return a[dataIndex] - b[dataIndex]
          } else {
            return a[dataIndex] > b[dataIndex] ? 1 : -1
          }
        })
      }

    },
    handleShowPop (e, dataIndex) {
      this.filter = ""
      this.filterCol = dataIndex
      this.popoverVisible = true
      this.popoverStyle = {
        left: e.clientX + 'px',
        top: (e.clientY + 14) + 'px'
      }
    },
    handleHidePopover () {
      this.popoverVisible = false
    },
    handleFilter () {
      this.filterData = this.data.filter(item => String(item[this.filterCol]).includes(this.filter))
      if (this.sortConfig.dataIndex) {
        this.handleSort(this.sortConfig.dataIndex, this.sortConfig.sort)
      } else {
        this.dataSource = this.data.filter(item => String(item[this.filterCol]).includes(this.filter))
      }
    },
    handleReset () {
      this.filter = ""
      this.handleFilter()
      this.handleHidePopover()
    }
  }
}
</script>

<style lang="less" scoped>
.nc-table-wrapper {
  width: 100%;
  text-align: left;
}
.nc-table-thead-th {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5 !important;
  padding: 16px;
  .can-click {
    cursor: pointer;
    flex: 1;
  }
}
.nc-talbe-thead {
  &-sort {
    margin-left: 5px;
    width: 12px;
    fill: #bfbfbf;
  }
  &-sort.active {
    fill: #1890ff;
  }
}
.nc-table-thead-filter {
  width: 14px;
  fill: #9f9f9f;
  cursor: pointer;
}
.nc-table-tbody {
  tr {
    border-bottom: 1px solid #ccc;
  }
  td {
    padding: 16px;
  }
}
.nc-table-filter-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.nc-table-filter-box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
table {
  border-collapse: collapse;
}

.nc-table-filter-box {
  position: absolute;
  transform: translateX(-100%);
  width: 200px;
  // padding: 10px;
}
.nc-table-filter-box-content {
  padding: 16px 8px;
  border-bottom: 1px solid #e8e8e8;
}
.nc-table-filter-box-footer {
  border-top: 1px solid #e8e8e8;
  display: flex;
  div {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
  }
}
.nc-table-filter-input {
  border: 1px solid #ccc;
  outline: none;
  width: 180px;
  height: 24px;
  border-radius: 4px;
}
</style>
