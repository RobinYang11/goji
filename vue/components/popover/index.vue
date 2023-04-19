<template>
  <span @click.stop="handleShow">
    <slot></slot>
    <teleport to="body" v-if="visible">
      <div class="nc-popover-mask" @click.self="handleHide">
        <div class="nc-popover-wrapper" :style="wrapperStyle">
          <slot name="title">
            <div class="nc-popover-title">{{title}}</div>
          </slot>
          <div class="nc-popover-content">
            <slot name="content">

            </slot>
          </div>
          <div class="nc-popover-arrow"></div>
        </div>
      </div>
    </teleport>
  </span>
</template>

<script>
export default {
  props: {
    /* visible: {
      type: Boolean,
      default: false
    }, */
    title: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      visible: false,
      wrapperStyle: {}
    }
  },
  methods: {
    handleShow (e) {
      this.visible = true
      const top = e.target.offsetTop
      const left = e.target.offsetLeft
      const width = e.target.offsetWidth
      this.wrapperStyle = {
        left: (left + width / 2) + "px",
        top: top + "px"
      }
    },
    handleHide () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.nc-popover-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.nc-popover-wrapper {
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  transform: translate(-50%, calc(-100% - 10px));
}
.nc-popover-title {
  padding: 5px 16px 4px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #e8e8e8;
  line-height: 1.5;
  font-size: 16px;
}
.nc-popover-content {
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.65);
}
.nc-popover-arrow {
  position: absolute;
  left: 50%;
  bottom: -8px;
  width: 8px;
  height: 8px;
  background-color: #fff;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
  transform: rotate(45deg) translate(-50%, -50%);
}
</style>
