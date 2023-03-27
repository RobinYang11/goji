<template>
  <div>
    <table border>
      <tr>
        <th :key="index" v-for="(col, index) in props.col">
          {{ col.name }}
          <select
            :value="filter.key == col.index ? filter.include : '筛选'"
            v-if="col.filters && col.filters.length > 0"
            @change="(e) => handleFilter(col.index, e)"
          >
            <option>筛选</option>
            <option
              :value="option"
              :key="optionIndex"
              v-for="(option, optionIndex) in col.filters"
            >
              {{ option }}
            </option>
          </select>
          <span v-if="col.sortable" @click="handleSort(col.index)">{{
            sort.key !== col.index ? "排序" : sort.status
          }}</span>
        </th>
      </tr>
      <tr :key="rowIndex" v-for="(row, rowIndex) in localData">
        <th :key="index" v-for="(col, index) in props.col">
          {{ row[col.index] }}
        </th>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps, watch, ref, reactive } from "vue";
const props = defineProps({
  data: {
    type: Array,
    defalut: () => [],
  },
  col: {
    type: Array,
    defalut: () => [],
  },
});

const sort = reactive({
  key: "",
  status: "", //asce升序||降序desc
});
const filter = reactive({
  key: "",
  include: "",
});

let localData = ref(props.data);

watch(props.data, (data, prevData) => {
  localData.value = data;
});

const handleFilter = (index, e) => {
  sort.status = "";
  sort.key = "";
  if (e.target.value == "筛选") {
    filter.key = "";
    filter.include = "";
    localData.value = props.data;
  } else {
    filter.key = index;
    filter.include = e.target.value;
    localData.value = props.data.filter(
      (item) => item[filter.key] == filter.include
    );
  }
};
const handleSort = (index) => {
  filter.key = "";
  filter.include = "";
  if (sort.status == "dsce") {
    sort.status = "";
    sort.key = "";
    localData.value = props.data;
  } else {
    sort.key = index;
    sort.status =
      sort.status == "" ? "asce" : sort.status == "asce" ? "dsce" : "asce";
    console.log('sort.status == "asce"', sort.status == "asce");
    if (sort.status == "asce") {
      localData.value = []
        .concat(props.data)
        .sort((a, b) => (a[index] > b[index] ? 1 : -1));
    } else {
      localData.value = []
        .concat(props.data)
        .sort((a, b) => (a[index] < b[index] ? 1 : -1));
    }
  }
  console.log(sort.key, sort.status, localData.value);
};
</script>
<style scoped>
</style>