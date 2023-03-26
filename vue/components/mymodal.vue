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
  /* 
  mymodal组件：
		属性：title,cancelText,confirmText,contentText,mask,bgColor,color,width
		事件：cancel,confirm
		title属性，值为一个字符串，用来填充弹出框的标题，默认值为‘提示’
		cancelText属性，值为一个字符串，用来设置取消按钮的文本内容，默认值为‘取消’
		confirmText属性，值为一个字符串，用来设置确定按钮的文本内容,默认值为‘确定’
		contentText属性，值为一个字符串，用来设置弹出框的正文内容,默认值为‘确定删除吗？’
		mask属性，值为布尔类型，用来设置是否显示遮罩层，true:显示遮罩层，false:不显示遮罩层，默认值为false
    bgColor属性，值为一个字符串，用来设置弹出框的背景颜色
    color属性，值为一个字符串，用来设置弹出框的文本颜色
    width属性，值为一个字符串，用来设置弹出框的宽度
		
		cancel事件，点击取消按钮时触发的事件
		confirm事件，点击确定按钮时触发的事件
  */
  name: "mymodal",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    contentText: {
      type: String,
      default: "确定删除吗？",
    },
    mask: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "30%",
    },
    color: {
      type: String,
      default: "black",
    },
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

    function clickCancel() {
      emit("cancel", false);
    }
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
