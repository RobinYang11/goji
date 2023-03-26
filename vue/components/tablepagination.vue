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
  /* 
   tablepagination组件：
		属性：data,col,sortable,sortBy,filterable,filterBy,width,height,tAlign,vAlign,bgColor,color,border，
          pageSize，pageBtn，currentPage
    事件：changeCurrentPage，prevPage，nextPage
			data值为要展示为表格的数据，是个数组，元素是对象
			col值为表头，是个数组，元素是字符串，字符串顺序与上述对象的属性应该一一对应
			sortable是否排序，默认为false
			sortBy值是一个字符串，字符串中间用逗号分开，逗号前面的为排序依据，逗号后面的为排序方式，可选值有-1和1，-1表示降序，1表示升序
			filterable是否筛选，默认为false
			filterBy值为字符串，表示筛选条件
      width属性，值为字符串，用于设置单元格的宽度
      height属性，值为字符串，用于设置单元格的高度
      tAlign属性，值是字符串，用于设置单元格的水平文本对齐方式
      vAlign属性，值是字符串，用于设置单元格的垂直方向的文本对齐方式
      bgColor属性，值是字符串，用于设置每单元格的背景颜色
      color属性，值是字符串，用于设置单元格内的文本颜色
      border属性，值是字符串，用于设置单元格边框
      borderCollapse属性，值是字符串，用于设置单元格之间的边框是否合并
      pageSize属性，值是Number，用于设置每页表格展示数据的数量
      pageBtn属性，值是Number，用于设置每页表格连续页码的数量
      currentPage属性，值是Number，用于设置当前页
      事件：
      changeCurrentPage改变当前页时触发
      prevPage点击上一页时触发
      nextPage点击下一页时触发
  */
  name: "tablepagination",
  props: {
    data: {
      type: Array,
    },
    col: {
      type: Array,
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    sortBy: {
      type: String,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    filterBy: {
      type: String,
    },
    width: {
      type: String,
      default: "30px",
    },
    height: {
      type: String,
      default: "30px",
    },
    color: {
      type: String,
      default: "black",
    },
    bgColor: {
      type: String,
      default: "white",
    },
    tAlign: {
      type: String,
      default: "center",
    },
    vAlign: {
      type: String,
      default: "middle",
    },
    border: {
      type: String,
      default: "1px solid yellow",
    },
    borderCollapse: {
      type: String,
      default: "collapse",
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    pageBtn: {
      type: Number,
      default: 5,
    },
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
      let keyword = props.sortBy.trim().split(",")[0].trim();
      let order = props.sortBy.trim().split(",")[1].trim() || 1;
      // console.log(keyword,order);
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
    //筛选
    if (props.filterable) {
      let key = props.filterBy.trim().split(/\b/g)[0].trim();
      let relation = props.filterBy.trim().split(/\b/g)[1].trim();
      let value = props.filterBy.trim().split(/\b/g)[2].trim();
      // console.log(key,relation,value);
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

    //计算数据总条数
    let total = ref(arr.length);
    //获取dom元素
    const tds = ref([]);
    const table = ref(null);
    //设置表格样式
    watchEffect(() => {
      if (table.value && tds.value) {
        table.value.style.borderCollapse = props.borderCollapse;
        // console.log(tds.value)
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
    //点击上一页的回调函数
    function handlePrev() {
      if (props.currentPage > 1) {
        emit("prevPage");
      }
    }
    //点击下一页的回调函数
    function handleNext() {
      if (props.currentPage < pages.value) {
        emit("nextPage");
      }
    }
    //点击页码的回调函数
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
      startAndEnd,
    };
  },
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
