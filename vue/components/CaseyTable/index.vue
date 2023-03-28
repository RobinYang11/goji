<!--
实现一个 Vue 的 Table 组件需要考虑到以下几个方面：
1.接收传入的 data 和 col 参数。其中 data 表示要渲染的数据，col 表示列信息，包括列名、列的 key 值，列的宽度等。
2.渲染表格的头部。表格的头部需要根据传入的列信息来动态生成。这里可以使用 v-for 指令来循环渲染不同的列。
3.渲染表格的数据行。这里也可以使用 v-for 指令来循环渲染不同的行和列。需要注意的是，数据行中每个单元格需要根据列的 key 值来取出对应的数据。
4.实现排序功能。可以使用 Array.prototype.sort() 方法对渲染的数据进行排序，排序完成后重新渲染表格即可。
5.实现筛选功能。可以根据用户输入的关键字使用 Array.prototype.filter() 方法来过滤数据，然后重新渲染表格即可。
-->
<template>
  <div>
    <input type="text" v-model="filterKeywords" placeholder="请输入筛选关键字">
    <table>
      <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index" :style="{ width: col.width }" @click="sort(col.key)">
          {{ col.title }}
          <span v-if="sortKey === col.key" :class="{ 'caret-up': isAsc, 'caret-down': !isAsc }"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in displayedRows" :key="index">
        <td v-for="(col, index) in columns" :key="index">
          {{ item[col.key] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filterKeywords: '',
      sortKey: '',
      isAsc: true
    }
  },
  computed: {
    // 渲染表格的数据行。它会先根据用户输入的关键字过滤出符合条件的数据，再根据排序规则排序，最后返回渲染的数据
    displayedRows() {
      const rows = this.data.filter(row => {
        return Object.values(row).some(val => {
          return String(val).toLowerCase().indexOf(this.filterKeywords.toLowerCase()) > -1
        })
      })
      // isAsc 属性表示当前排序是否为升序，sortKey 属性表示当前排序的列。
      if (this.sortKey) {
        rows.sort((a, b) => {
          const valA = a[this.sortKey]
          const valB = b[this.sortKey]
          if (valA < valB) {
            return this.isAsc ? -1 : 1
          } else if (valA > valB) {
            return this.isAsc ? 1 : -1
          } else {
            return 0
          }
        })
      }
      return rows
    }
  },
  methods: {
    // 排序
    sort(key) {
      if (this.sortKey === key) {
        this.isAsc = !this.isAsc
      } else {
        this.sortKey = key
        this.isAsc = true
      }
    }
  }
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  cursor: pointer;
}
</style>