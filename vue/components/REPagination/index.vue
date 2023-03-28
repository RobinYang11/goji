<template>
  <div class="pagination">
    <span class="page-count">Total {{ pageCount }} pages</span>
    <select v-model="pageSize" @change="selectPage(1)">
      <option v-for="option in props.customPageSizes" :key="option" :value="option">
        {{ option }} / page
      </option>
    </select>
    <ul>
      <li><a @click.prevent="prePage()">&lt;</a></li>
      <li v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
        <a @click.prevent="selectPage(page)">{{ page }}</a>
      </li>
      <li><a @click.prevent="nextPage()">&gt;</a></li>
    </ul>
  </div>
</template>

<script setup>
import {computed, defineProps, ref, watch} from 'vue';

const props = defineProps({
  totalNum: {
    type: Number,
    required: true,
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

const emits = defineEmits(['pageChange']);

const currentPage = ref(1);
const startIndex = ref(1);
const pageSize = ref(props.defaultPageSize);

const pageCount = computed(() => Math.ceil(props.totalNum / pageSize.value));
const pages = computed(() => {
  const pagesArray = [];
  const endIndex = startIndex.value + props.maxDisplayCount;
  for (let i = startIndex.value; i <= pageCount.value && i < endIndex; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const prePage = () => {
  if (currentPage.value > 1) {
    selectPage(currentPage.value - 1);
  }
}
const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    selectPage(currentPage.value + 1);
  }
}

const selectPage = page => {
  currentPage.value = page;

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

  // 计算数据切分开始索引和结束索引
  emits('pageChange', (currentPage.value - 1) * pageSize.value, pageSize.value);
}

watch(() => props.totalNum, () => selectPage(1));

emits('pageChange', (currentPage.value - 1) * pageSize.value, pageSize.value);
</script>

<style scoped>
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