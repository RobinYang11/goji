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
  /* 
  mytable组件：
		属性：data,col,sortable,sortBy,filterable,filterBy,tAlign,vAlign,bgColor,color,border
			data值为要展示为表格的数据，是个数组，元素是对象
			col值为表头，是个数组，元素是字符串，字符串顺序与上述对象的属性应该一一对应
			sortable是否排序，默认为false
			sortBy值是一个字符串，字符串中间用逗号分开，逗号前面的为排序依据，逗号后面的为排序方式，可选值有-1和1，-1表示降序，1表示升序
			filterable是否筛选，默认为false
			filterBy值为字符串，表示筛选条件
      tAlign属性，值是字符串，用于设置每个表格的水平文本对齐方式
      vAlign属性，值是字符串，用于设置每个表格的垂直方向的文本对齐方式
      bgColor属性，值是字符串，用于设置每个表格的背景颜色
      color属性，值是字符串，用于设置每个表格内的文本颜色
      border属性，值是字符串，用于设置每个表格边框
  */
  name: "mytable",
  props: {
    data: {
      type: Array,
      // required: true,
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
    color: {
      type: String,
      default: "black",
    },
    bgColor: {
      type: String,
      default: "white",
    },
  },
  setup(props) {
    let arr = JSON.parse(JSON.stringify(props.data));
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

    let dataArr = reactive([]);
    dataArr.push(...arr);

    const tds = ref([]);
    const table = ref(null);

    watchEffect(() => {
      if (table.value && tds.value) {
        // console.log(tds.value)
        tds.value.forEach((ele) => {
          ele.style.backgroundColor = props.bgColor;
          ele.style.color = props.color;
          ele.style.textAlign = props.tAlign;
          ele.style.verticalAlign = props.vAlign;
          ele.style.border = props.border;
        });
      }
    });

    return {
      dataArr,
      tds,
      table,
    };
  },
};
</script>

<style scoped lang="less"></style>
