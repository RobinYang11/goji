<template>
  <div class="after">
    <div class="element" v-show="show" ref="element"></div>
    <slot></slot>
    <div class="content-wrap" v-show="show" ref="contentWrap">
      <h5 class="title">{{ title }}</h5>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  /* 
  mypop组件：
		属性：show,title,content,width,color,align，placement
    show属性，值为布尔类型，用来控制气泡框的显示与隐藏
		title属性，值为一个字符串，用来填充气泡框的标题，默认值为‘气泡框标题’
		content属性，值为一个字符串，用来填充气泡框的内容，默认值为‘我是气泡框内容区我是气泡框内容区我是气泡框内容区’
		width属性，值为一个字符串，用来设置气泡框的宽度,默认值为‘150px’
		color属性，值为一个字符串，用来设置气泡框中文字的颜色,默认值为‘black’
		align属性，值为一个字符串，用来设置气泡框中文字的对齐方式，默认值为‘left’
    placement属性，值为一个字符串，用来设置气泡框的位置，可选值有 "left","right","top","bottom",默认值为bottom
  */
  name: "mypop",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "气泡框标题",
    },
    content: {
      type: String,
      default: "我是气泡框内容区我是气泡框内容区我是气泡框内容区",
    },
    width: {
      type: String,
      default: "150px",
    },
    align: {
      type: String,
      default: "left",
    },
    color: {
      type: String,
      default: "black",
    },
    placement: {
      type: String,
      default: "bottom",
    },
  },
  setup(props) {
    const contentWrap = ref(null);
    const element = ref(null);
    watchEffect(() => {
      if (element.value && contentWrap.value) {
        contentWrap.value.style.width = props.width;
        contentWrap.value.style.textAlign = props.align;
        contentWrap.value.style.color = props.color;
        switch (props.placement) {
          case "left":
            contentWrap.value.classList.add("left", "cLeft");
            element.value.classList.add("left", "eLeft");
            break;
          case "right":
            contentWrap.value.classList.add("right", "cRight");
            element.value.classList.add("right", "eRight");
            break;
          case "top":
            contentWrap.value.classList.add("top", "cTop");
            element.value.classList.add("top", "eTop");
            break;
          case "bottom":
            contentWrap.value.classList.add("bottom", "cBottom");
            element.value.classList.add("bottom", "eBottom");
            break;
        }
      }
    });

    return {
      contentWrap,
      element,
    };
  },
};
</script>

<style scoped lang="less">
.after {
  position: relative;
  display: inline-block;
  .content-wrap {
    position: absolute;
    box-shadow: 0 0 15px rgba(63, 61, 61, 0.4);
    background-color: white;
    padding: 20px;
    .title {
      margin: 0;
      padding-bottom: 15px;
    }
  }
}
.element {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  position: absolute;
  z-index: 2;
}
.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.cLeft {
  margin-right: 16px;
}
.cRight {
  margin-left: 16px;
}
.cTop {
  margin-bottom: 16px;
}
.cBottom {
  margin-top: 16px;
}
.eLeft {
  border-left: 8px solid white;
}
.eRight {
  border-right: 8px solid white;
}
.eTop {
  border-top: 8px solid white;
}
.eBottom {
  border-bottom: 8px solid white;
}
</style>
