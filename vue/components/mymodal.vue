<template>
  <div class="wrap">
    <div class="mask" v-show="mask"></div>
    <div class="modal" ref="modal">
      <div class="title">{{ title }}</div>
      <div class="content">{{ contentText }}</div>
      <div class="foot">
        <button id="cancel" @click="clickCancel">{{ cancelText }}</button>
        <button id="confirm" @click="clickConfirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  name: "mymodal",
  props: {
    //弹出框的标题
    title: {
      type: String,
      default: "提示",
    },
    //取消按钮的文本内容
    cancelText: {
      type: String,
      default: "取消",
    },
    //确定按钮的文本内容
    confirmText: {
      type: String,
      default: "确定",
    },
    //弹出框的正文内容
    contentText: {
      type: String,
      default: "确定删除吗？",
    },
    //是否显示遮罩层
    mask: {
      type: Boolean,
      default: false,
    },
    //弹出框的宽度
    width: {
      type: String,
      default: "30%",
    },
    //弹出框的文本颜色
    color: {
      type: String,
      default: "black",
    },
    //弹出框的背景颜色
    bgColor: {
      type: String,
      default: "white",
    },
  },
  setup(props, { emit }) {
    const modal = ref(null);
    watchEffect(() => {
      if (modal.value) {
        modal.value.style.width = props.width;
        modal.value.style.color = props.color;
        modal.value.style.backgroundColor = props.bgColor;
      }
    });
    
   // @ description: 点击取消按钮的回调函数
    function clickCancel() {
      emit("cancel", false);
    }
    // @ description: 点击确定按钮的回调函数
    function clickConfirm() {
      emit("confirm", false);
    }

    return {
      modal,
      clickCancel,
      clickConfirm,
    };
  },
};
</script>

<style scoped lang="less">
.wrap {
  .mask {
    background-color: rgba(8, 7, 7, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99999;
  }
  .modal {
    padding: 20px 30px;
    position: absolute;
    z-index: 100000;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0 0 10px rgb(199, 192, 192);
    .title {
      font-size: 14px;
    }
    .content {
      padding: 20px 0;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        border: 1px solid rgb(180, 175, 175);
        font-size: 14px;
        padding: 5px 8px;
      }
      #cancel {
        background-color: white;
      }
      #confirm {
        background-color: rgb(15, 99, 224);
        color: white;
        border: 1px solid transparent;
      }
    }
  }
}
</style>
