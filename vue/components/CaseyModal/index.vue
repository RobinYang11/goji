<template>
  <div class="dialog-mask" v-if="visible">
    <div class="dialog">
      <div class="dialog-header">
        <div class="title">{{ title }}</div>
        <i class="iconfont icon-close" @click="handleClose"></i>
      </div>
      <div class="dialog-content">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

.dialog-header .title {
  font-size: 16px;
  font-weight: bold;
}

.dialog-header .icon-close {
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.dialog-content {
  padding: 20px;
}

.dialog-footer {
  padding: 12px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
}
</style>