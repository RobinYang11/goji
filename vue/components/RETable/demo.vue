<template>
  <div>
    <RETable
        :columns="columns"
        :rows="rows"
        :defaultSortField="'age'"
        :filters="filters"
        sortable
        is-pagination
    />
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import RETable from './index.vue';

const columns = reactive([
  {label: "id", prop: "id"},
  {label: "name", prop: "name"},
  {label: "age", prop: "age"}
]);
const rows = reactive([]);
const filters = reactive([
  {label: "id", prop: "id"},
  {label: "name", prop: "name"},
  {label: "age", prop: "age"}]);

for (let i = 0; i < 300; i++) {
  rows.push({id: i, name: `A${i}`, age: 20 + i})
}

</script>
