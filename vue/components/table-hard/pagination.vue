<template>
  <div class="nc-pagination-box">
    <div class="nc-pagination-item nc-pagination-left" :class="{ disabled: !pageTotal }">
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
      </svg>
    </div>
    <div class="nc-pagination-item disabled" v-if="!pageTotal">0</div>
    <div class="nc-pagination-item" v-for="item of pageTotal" :key="item" @click="this.handleClickPage(item)" :class="{active:current == item}">{{item}}</div>
    <div class="nc-pagination-item nc-pagination-right" :class="{ disabled: !pageTotal }">
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pageTotal () {
      return Math.ceil(this.total / 10)
    }
  },
  methods: {
    handleClickPage (current) {
      this.$emit("change", current)
    }
  }
}
</script>

<style lang="less" scoped>
.nc-pagination-box {
  display: inline-block;
  max-width: 430px;
  // display: flex;
  .nc-pagination-item {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-color: #fff;
    text-align: center;
    line-height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 14px;
    // flex: 1 1 32px;
    cursor: pointer;
    &:hover {
      color: #40a9ff;
      border-color: #40a9ff;
    }
  }
  .nc-pagination-item.active {
    border-color: #40a9ff;
  }
  .nc-pagination-item.disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    border-color: #d9d9d9;
    &:hover {
      color: initial;
    }
  }
}
</style>
