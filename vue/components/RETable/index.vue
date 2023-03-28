<template>
  <div>
    <div class="table-filters" v-if="filters.length">
      <div v-for="filter in filters" :key="filter.prop" class="table-filter">
        <label class="table-filter-label">{{ filter.label }}:</label>
        <input type="text" :class="filterInputClass" :name="filter.prop"
               v-model.trim="filterProp[filter.prop]">
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
    <REPagination v-if="isPagination"
                  :total-num="filterRows.length"
                  @page-change="(start, end) => onPageChange(start, end)"/>
  </div>
</template>

<script setup>
import {computed, defineProps, reactive, ref} from 'vue';
import {compareFn} from './util/RETool';
import REPagination from '../REPagination/index.vue'

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

// sort
const sortField = ref(props.defaultSortField);
const sortOrder = ref(props.defaultSortOrder);
const sort = (field, order) => {
  if (field) {
    sortField.value = field;
    sortOrder.value = order === "asc" ? "desc" : "asc";
  }
};

// pagination
const startIndex = ref(0);
const pageSize = ref(filterRows.value.length);
const onPageChange = (start, size) => {
  startIndex.value = start;
  pageSize.value = size;
}

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
  if (props.sortable && sortField.value) {
    filterRows.value.sort((a, b) => compareFn(a, b, sortField.value, sortOrder.value));
  }

  if (props.isPagination) {
    return filterRows.value.slice(startIndex.value, startIndex.value + pageSize.value);
  }
  return filterRows.value;
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

input:focus {
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

</style>