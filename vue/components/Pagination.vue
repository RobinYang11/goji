<template>
  <div v-if="totle !== 0" class="pagination">
    <span class="page-btn" @click="handlePre">《</span>
    <span
      class="page-btn"
      :class="item == props.page ? 'page-btn-acitve' : ''"
      :key="index"
      @click="handleTarget(item)"
      v-for="(item, index) of Math.round(props.totle / props.size) + 1"
      >{{ item }}</span
    >
    <span class="page-btn" @click="handleNext">》</span>
  </div>
</template>

<script setup>
import { compile, defineProps } from "vue";
let props = defineProps({
  page: {
    type: Number || String,
    defalut: 0,
  },
  size: {
    type: Number || String,
    defalut: 0,
  },
  totle: {
    type: Number || String,
    defalut: 0,
  },
});
const emit = defineEmits();
// const emit = defineEmits(["pageChange"]);
const handleTarget = (item) => {
  emit("update:page", item);
  emit("pageChange");
};

const handlePre = () => {
  if (props.page > 1) {
    emit("update:page", props.page - 1);
    emit("pageChange");
  } else {
    alert("不能往前翻页了");
  }
};
const handleNext = () => {
  if (props.page !== Math.round(props.totle / props.size) + 1) {
    emit("update:page", props.page + 1);
    emit("pageChange");

  } else {
    alert("已经是最后一页了");
  }
};
console.log("props", props);
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.page-btn-acitve {
  background-color: aqua;
}
.page-btn {
  border: #ccc solid 1px;
  min-width: 120px;
  padding: 2px 4px;
  margin: 2px 4px;
}
</style>>
