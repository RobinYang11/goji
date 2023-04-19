<template>
  <teleport to="body" v-if="visible">
    <div class="nc-modal-mask" @click.self="handleHideModal">
      <div class="nc-modal-wrapper">
        <div class="nc-modal-title">
          <span v-if="title">{{title}}</span>
          <slot v-else name="title"> </slot>
          <span class="nc-modal-closeicon" @click="handleHideModal">X</span>
        </div>
        <div class="nc-modal-content">
          <slot></slot>
        </div>
        <div v-if="footer" class="nc-modal-footer">
          <slot name="footer">
            <button @click="handleHideModal">取消</button>
            <button @click="handleHideModal">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
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
      default: ""
    },
    footer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    handleHideModal () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.nc-modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  overflow: hidden;
}
.nc-modal-wrapper {
  border-radius: 8px;
  width: 520px;
  margin: 200px auto;
  background-color: #fff;
}
.nc-modal-title {
  padding: 16px 24px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #e8e8e8;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nc-modal-closeicon {
  font-size: 18px;
  cursor: pointer;
}
.nc-modal-content {
  padding: 24px;
}
.nc-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e8e8e8;
  text-align: right;
  button {
    padding: 0 15px;
    line-height: 1.5;
    margin-left: 5px;
  }
}
</style>
