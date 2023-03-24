<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            @click="sort(col)"
            class="tableHeader"
          >
            {{ col.title }}
            <span v-if="sortKey === col.field">
              {{ sortOrder === "asc" ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
        <tr>
          <th v-for="col in columns" :key="col.key">
            <input
              type="text"
              v-model="filterText[col.field]"
              placeholder="请输入内容进行筛选"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in computedData" :key="row.id">
          <td v-for="col in columns" :key="col.key">{{ row[col.field] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ pageCount }} 页</span>
      <button :disabled="currentPage === pageCount" @click="nextPage">
        下一页
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    dataSource: Array,
  },
  data() {
    return {
      data: [],
      sortKey: "",
      sortOrder: "asc",
      filterText: {},
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.length / this.pageSize);
    },
    computedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.data.slice(startIndex, endIndex);
    },
  },
  methods: {
    sort(col) {
      const { field } = col;
      if (this.sortKey === field) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = field;
        this.sortOrder = "asc";
      }

      this.data = this.dataSource.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (aValue < bValue) return this.sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    },
    filter(filterText) {
      this.data = this.dataSource.filter((row) =>
        Object.entries(filterText).every(([field, value]) =>
          String(row[field]).toLowerCase().includes(value.toLowerCase())
        )
      );
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
  },
  watch: {
    filterText: {
      deep: true,
      handler(newValue) {
        this.filter(newValue);
      },
    },
    dataSource: {
      deep: true,
      handler(newValue) {
        this.data = newValue;
      },
      immediate: true,
    },
  },
};
</script>
<style>
.tableHeader {
  cursor: pointer;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination button {
  margin: 0 10px;
}
</style>
