<template>
  <table ref="table">
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
</template>

<script>
import { reactive, ref, watchEffect } from "vue";
export default {
  name: "mytable",
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
    //排序规则，字符串中间用逗号分开，逗号前面的为排序依据，逗号后面的为排序方式，可选值有-1和1，-1表示降序，1表示升序
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
  },
  setup(props) {
    let arr = JSON.parse(JSON.stringify(props.data));
    //排序
    if (props.sortable) {
      sortData(props.sortBy,arr)
    }
    //筛选
    if (props.filterable) {
      filterData(props.filterBy,arr)
      }
    

    let dataArr = reactive([]);
    dataArr.push(...arr);

    const tds = ref([]);
    const table = ref(null);

    watchEffect(() => {
      if (table.value && tds.value) {
        tds.value.forEach((ele) => {
          ele.style.backgroundColor = props.bgColor;
          ele.style.color = props.color;
          ele.style.textAlign = props.tAlign;
          ele.style.verticalAlign = props.vAlign;
          ele.style.border = props.border;
        });
      }
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

    return {
      dataArr,
      tds,
      table,
    };
  },
};
</script>

<style scoped lang="less"></style>
