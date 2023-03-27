<template>
  <div>
    <table class="table" ref="table">
      <thead>
        <tr>
          <td v-for="(head, index) in col" :key="index" ref="tds">
            {{ head }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataArr" :key="index">
          <td v-for="(value, attr) in item" :key="attr" ref="tds">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage == 1" @click="handlePrev" :class="{disabled:currentPage == 1}">
        &lt;&lt;上一页
      </button>
      <button v-show="startAndEnd.start > 1" @click="handleCurrentPage(1)">
        1
      </button>
      <button v-show="startAndEnd.start > 2">•••</button>

      <button
        @click="handleCurrentPage(index + startAndEnd.start)"
        v-for="(page, index) in startAndEnd.end - startAndEnd.start + 1"
        :key="index"
        :class="{ active: currentPage == index + startAndEnd.start }"
      >
        {{ index + startAndEnd.start }}
      </button>

      <button v-show="startAndEnd.end < pages - 1">•••</button>
      <button
        v-show="startAndEnd.end < pages"
        @click="handleCurrentPage(pages)"
      >
        {{ pages }}
      </button>
      <button :disabled="currentPage == pages" @click="handleNext" :class="{disabled:currentPage == pages}">
        下一页&gt;&gt;
      </button>

      <button>共 {{ pages }} 页</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
export default {
  name: "tablepagination",
  props: {
    //要展示为表格的数据
    data: {
      type: Array,
    },
    //表头
    col: {
      type: Array,
    },
    //是否排序
    sortable: {
      type: Boolean,
      default: false,
    },
    //排序方式：字符串中间用逗号分开，逗号前面的为排序依据，逗号后面的为排序方式，可选值有-1和1，-1表示降序，1表示升序
    sortBy: {
      type: String,
    },
    //是否筛选
    filterable: {
      type: Boolean,
      default: false,
    },
    //筛选条件
    filterBy: {
      type: String,
    },
    //单元格的宽度
    width: {
      type: String,
      default: "30px",
    },
    //单元格的高度
    height: {
      type: String,
      default: "30px",
    },
    //单元格内的文本颜色
    color: {
      type: String,
      default: "black",
    },
    //单元格的背景颜色
    bgColor: {
      type: String,
      default: "white",
    },
    //单元格内文本的水平对齐方式
    tAlign: {
      type: String,
      default: "center",
    },
    //单元格内文本的垂直对齐方式
    vAlign: {
      type: String,
      default: "middle",
    },
    //单元格边框
    border: {
      type: String,
      default: "1px solid yellow",
    },
    //单元格之间的边框是否合并
    borderCollapse: {
      type: String,
      default: "collapse",
    },
    //单页表格展示的数据数量
    pageSize: {
      type: Number,
      default: 5,
    },
    //每页表格连续页码的数量
    pageBtn: {
      type: Number,
      default: 5,
    },
    //当前页
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    //对接收到的父组件传来的数据进行深拷贝，筛选出符合标准的数据并排序
    let arr=JSON.parse(JSON.stringify(props.data))
    //排序
    if (props.sortable) {
      sortData(props.sortBy,arr)
    }
     //筛选
    if (props.filterable) {
      filterData(props.filterBy,arr)
    }

    //计算数据总条数
    let total = ref(arr.length);
    //获取dom元素
    const tds = ref([]);
    const table = ref(null);
    //设置表格样式
    watchEffect(() => {
      if (table.value && tds.value) {
        table.value.style.borderCollapse = props.borderCollapse;
        tds.value.forEach((ele) => {
          ele.style.width = props.width;
          ele.style.height = props.height;
          ele.style.color = props.color;
          ele.style.backgroundColor = props.bgColor;
          ele.style.textAlign = props.tAlign;
          ele.style.verticalAlign = props.vAlign;
          ele.style.border = props.border;
        });
      }
    });

    //计算表格单页展示的数据
    const dataArr = computed(() => {
      let startIndex = (props.currentPage - 1) * props.pageSize;
      let endIndex =
        startIndex + props.pageSize > arr.length
          ? arr.length
          : startIndex + props.pageSize;
      return arr.slice(startIndex, endIndex);
    });
    //计算总页数
    const pages = computed(() => {
      return Math.ceil(total.value / props.pageSize);
    });
    //计算连续页码的开始页码和结束页码
    const startAndEnd = computed(() => {
      let start = 0,
        end = 0;
      if (props.pageBtn >= Math.ceil(total.value / props.pageSize)) {
        start = 1;
        end = Math.ceil(total.value / props.pageSize);
      } else {
        start = props.currentPage - parseInt(props.pageBtn / 2);
        end = props.currentPage + parseInt(props.pageBtn / 2);
        if (start < 1) {
          start = 1;
          end = props.pageBtn;
        }
        if (end > Math.ceil(total.value / props.pageSize)) {
          end = Math.ceil(total.value / props.pageSize);
          start = Math.ceil(total.value / props.pageSize) - props.pageBtn + 1;
        }
      }
      return { start, end };
    });
    
    
    /*
    @ description: 对数据进行排序
    @ param: sortBy String 排序规则
    @ param: arr Array 要排序的初始数据
    @ return: void
    */
     function sortData(sortBy,arr){
      let keyword = sortBy.trim().split(",")[0].trim();
      let order = sortBy.trim().split(",")[1].trim() || 1;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (order == 1) {
            if (arr[j][keyword] > arr[j + 1][keyword]) {
              let temp = arr[j + 1];
              arr[j + 1] = arr[j];
              arr[j] = temp;
            }
          } else {
            if (arr[j][keyword] < arr[j + 1][keyword]) {
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
            }
          }
        }
      }
    }

    /*
    @ description: 对数据进行筛选
    @ param: sortBy String 筛选条件
    @ param: arr Array 要筛选的初始数据
    @ return: void
    */
    function filterData(filterBy,arr){
      let key = filterBy.trim().split(/\b/g)[0].trim();
      let relation = filterBy.trim().split(/\b/g)[1].trim();
      let value = filterBy.trim().split(/\b/g)[2].trim();
      for (let i = 0; i < arr.length; i++) {
        switch (relation) {
          case ">":
            if (arr[i][key] <= value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case ">=":
            if (arr[i][key] < value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case "<":
            if (arr[i][key] >= value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case "<=":
            if (arr[i][key] > value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case "==":
            if (arr[i][key] != value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case "!=":
            if (arr[i][key] == value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case "===":
            if (arr[i][key] !== value) {
              arr.splice(i, 1);
              i--;
            }
            break;
          case "!==":
            if (arr[i][key] === value) {
              arr.splice(i, 1);
              i--;
            }
            break;
        }
      }
    }
    
    /*
    @ description: 点击上一页的回调函数
    @ return: void
    */
    function handlePrev() {
      if (props.currentPage > 1) {
        emit("prevPage");
      }
    }
    /*
    @ description: 点击下一页的回调函数
    @ return: void
    */
    function handleNext() {
      if (props.currentPage < pages.value) {
        emit("nextPage");
      }
    }
    /*
    @ description: 点击页码的回调函数
    @ param: p Number 点击的页码
    @ return: void
    */
    function handleCurrentPage(p) {
      emit("changeCurrentPage", p);
    }

    return {
      dataArr,
      tds,
      table,
      total,
      pages,
      handlePrev,
      handleNext,
      handleCurrentPage,
      startAndEnd
    };
  }
};
</script>

<style scoped lang="less">
.pagination {
  // text-align: center;
  margin-top: 20px;
  button {
    box-sizing: border-box;
    color: #606266;
    height: 28px;
    // line-height: 28px;
    font-size: 13px;
    text-align: center;
    vertical-align: middle;
    margin: 0 5px;
    padding: 0 4px;
    border-radius: 2px;
    background-color: #f4f4f5;
    outline: none;
    border: 0;
    min-width: 35.5px;
  }
  .active {
    background-color: #409eff;
    color: #fff;
  }
  .disabled{
    cursor: not-allowed;
  }
}
</style>
