<template>
  <div>
    <div class="table-filters" v-if="filters.length">
      <div v-for="filter in filters" :key="filter.prop" class="table-filter">
        <label class="table-filter-label">{{ filter.label }}:</label>
        <input type="text" :class="filterInputClass" :name="filter.prop" v-model.trim="filterProp[filter.prop]">
      </div>
      <button class="table-reset-button" @click="resetFilters">重置</button>
    </div>
    <table :class="tableClass">
      <thead>
      <tr>
        <th v-for="col in _columns" :key="col.prop" :class="theadClass"
            :width="cellWidth" @click="sort(col.prop, col.sortOrder)">
          {{ col.label }}
          <span v-if="sortable"
                :class="col.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in _rows">
        <td v-for="col in _columns" :key="col.prop" :class="cellClass" :width="cellWidth">
          {{ row[col.prop] }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="isPagination">
      <span class="page-count">Total {{ pageCount }} pages</span>
      <select v-model="pageSize" @change="selectPage(1)">
        <option v-for="option in props.customPageSizes" :key="option" :value="option">{{ option }} / pages</option>
      </select>
      <ul>
        <li v-for="page in pages" :key="page" :class="{ active: +page === currentPage }">
          <a @click.prevent="selectPage(page)">{{ page }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, reactive, ref, watch} from 'vue';
import {compareFn} from './util/RETool';

const props = defineProps({
  // style
  tableClass: {
    type: String,
    default: '',
  },
  theadClass: {
    type: String,
    default: '',
  },
  cellClass: {
    type: String,
    default: '',
  },
  cellWidth: {
    type: Number,
    default: 150,
  },
  filterInputClass: {
    type: String,
    default: '',
  },
  // data
  columns: {
    type: Array,
    required: true,
    validator: value => value.every(col =>
        typeof col['label'] === 'string' &&
        typeof col['prop'] === 'string'),
  },
  rows: {
    type: Array,
    required: true,
    validator: value => value.every(row => typeof row === 'object'),
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  defaultSortField: {
    type: String,
  },
  defaultSortOrder: {
    type: String,
    default: 'asc',
    validator: value => ['asc', 'desc'].includes(value),
  },
  filters: {
    type: Array,
    default: [],
    validator: value => value.every(filter =>
        typeof filter['label'] === 'string' &&
        typeof filter['prop'] === 'string'),
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
  defaultPageSize: {
    type: Number,
    default: 10,
  },
  customPageSizes: {
    type: Array,
    default: [5, 10, 20, 50],
    validator: value => value.every(pageSize => typeof pageSize === "number"),
  },
  maxDisplayCount: {
    type: Number,
    default: 8,
  }
});

// filter
const filterProp = reactive({});
const resetFilters = () => props.filters.forEach(filter => filterProp[filter.prop] = "");
const filterRows = computed(() => props.rows.filter(row => {
  for (const prop in filterProp) {
    const val = row[prop];
    const matchVal = filterProp[prop];
    if (matchVal.length === 0) continue;
    if (typeof val === 'number' && parseInt(matchVal) !== val) {
      return false;
    } else if (typeof val === 'string' && !val.includes(matchVal)) {
      return false;
    }
  }
  return true;
}));
resetFilters();

// pagination
const currentPage = ref(1);
const startIndex = ref(1);
const pageSize = ref(props.defaultPageSize);
const pageCount = computed(() => Math.ceil(filterRows.value.length / pageSize.value));
const pages = computed(() => {
  const pagesArray = ["<"];
  const endIndex = startIndex.value + props.maxDisplayCount;
  for (let i = startIndex.value; i <= pageCount.value && i < endIndex; i++) {
    pagesArray.push(i);
  }
  pagesArray.push(">")
  return pagesArray;
});
const selectPage = page => {
  if (page === 1) {
    startIndex.value = 1;
    currentPage.value = 1;
    return;
  }

  switch (page) {
    case ">":
      if (currentPage.value < pageCount.value) {
        currentPage.value++;
      }
      break;
    case "<":
      if (currentPage.value > 1) {
        currentPage.value--;
      }
      break;
    default:
      currentPage.value = +page;
  }

  if (pageCount.value > props.maxDisplayCount) {
    if (startIndex.value > currentPage.value) {
      startIndex.value = currentPage.value - props.maxDisplayCount / 2;
    } else if (startIndex.value < currentPage.value - props.maxDisplayCount / 2) {
      startIndex.value++;
    }

    if (startIndex.value < 1) {
      startIndex.value = 1;
    } else if (startIndex.value + props.maxDisplayCount > pageCount.value) {
      startIndex.value = pageCount.value - props.maxDisplayCount + 1;
    }
  }
}
watch(() => filterRows.value.length, () => selectPage(1));

// sort
const sortField = ref(props.defaultSortField);
const sortOrder = ref(props.defaultSortOrder);
const sort = (field, order) => {
  if (props.sortable) {
    sortField.value = field;
    sortOrder.value = order === "asc" ? "desc" : "asc";
    selectPage(1);
  }
};

// render data
const _columns = computed(() => [...props.columns]
    .map(({label, prop}) => {
      if (prop === sortField.value) {
        return {label, prop, sortOrder: sortOrder.value};
      } else {
        return {label, prop, sortOrder: props.defaultSortOrder};
      }
    }));
const _rows = computed(() => {
  if (sortField.value && props.columns.some(col => col.prop === sortField.value)) {
    filterRows.value.sort((a, b) => compareFn(a, b, sortField.value, sortOrder.value));
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filterRows.value.slice(start, end);
});

</script>

<style scoped>
.table-filters {
  width: 100vw;
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.table-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-filter-label {
  font-weight: bold;
  color: #444;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}

.table-filter-input:focus {
  border-color: #79bbff;
  box-shadow: 0 0 0 2px #c6e2ff;
}

.table-reset-button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.table-reset-button:hover {
  background-color: #79bbff;
}

table {
  margin: auto;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  cursor: pointer;
  position: relative;
}

.arrow-up,
.arrow-down {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  margin-left: 6px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  transition: transform 0.2s ease-in-out;
}

.arrow-up {
  border-bottom: 6px solid black;
}

.arrow-down {
  border-top: 6px solid black;
}

th:hover {
  color: #79bbff;
}

th:hover .arrow-up {
  border-bottom-color: #79bbff;
}

th:hover .arrow-down {
  border-top-color: #79bbff;
}

th:active .arrow-up,
th:active .arrow-down {
  transform: rotate(180deg);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination select {
  margin: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  background-color: #fff;
  color: #495057;
  font-size: 1rem;
  appearance: none;
  outline: none;
  transition: all 0.2s ease-in-out;
}

.pagination select:hover {
  border-color: #79bbff;
}

.pagination select:focus {
  border-color: #79bbff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.pagination ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: fit-content;
}

.pagination li {
  position: relative;
  border-collapse: collapse;
  text-align: center;
  width: 36px;
}

.pagination li a {
  display: block;
  padding: 0.5rem 0;
  border: 1px solid #ced4da;
  color: #495057;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination li.active a {
  color: #fff;
  background-color: #79bbff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}

.pagination li a:hover {
  background-color: #f2f2f2;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

</style>