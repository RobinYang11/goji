<template>
  <div class="out-wrap">
    <div class="wrap">
      <div class="container" ref="container">
        <img
          class="image"
          v-for="(img, index) in imageUrls"
          :key="index"
          :src="img"
          ref="imgs"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect, ref, reactive } from "vue";
export default {
  name: "loadimage",
  props: {
    //要展示的图片的路径
    imgUrls: {
      type: Array,
      default() {
        return [
          "https://grocery-cdn.huaban.com/file/356317d0-d5bb-11ec-bc30-f5d45cb676cf.png",
          "https://grocery-cdn.huaban.com/file/0c393880-d5bb-11ec-9bcf-c7151a5f6a45.png",
          "https://grocery-cdn.huaban.com/file/7525e0a0-d5bb-11ec-9bcf-c7151a5f6a45.png",
          "https://cdn.huaban.com/home/202201210156-1e92.png",
          "https://grocery-cdn.huaban.com/file/f41da6a0-d5ba-11ec-bc30-f5d45cb676cf.png",
          "https://grocery-cdn.huaban.com/file/a7273280-d5ba-11ec-bc30-f5d45cb676cf.png"
        ];
      },
    },
    //图片宽度
    imgWidth: {
      type: String,
      default: "200px",
    },
    //图片高度
    imgHeight: {
      type: String,
      default: "292px",
    },
    //图片的过渡时间
    duration: {
      type: Number,
      default: 300,
    },
    //图片的显示时间，值不能低于2倍的duration
    timer: {
      type: Number,
      default: 3000,
    },
    //图片的过渡函数
    timingFunction: {
      type: String,
      default: "linear",
    },
  },
  setup(props) {
    const container = ref(null);
    const imgs = ref([]);
    let imageUrls=JSON.parse(JSON.stringify(props.imgUrls))
    imageUrls.push(props.imgUrls[0])
    watchEffect(() => {
      if (container.value && imgs.value) {
        imgs.value.forEach((ele) => {
          ele.style.width = props.imgWidth;
          ele.style.height = props.imgHeight;
          ele.style.transition =
            "all " + props.duration / 1000 + "s " + props.timingFunction;
        });
        let i = 0;//定义变量，主要用于计算图片容器的位移量
        setInterval(() => {
          //判断图片是否到了最后一张
          if (-i === imgs.value.length - 1) {
            i = 0;
          }
          //将当前图片退出
          for (let j = 0; j < imgs.value.length; j++) {
            if (-i == j) {
              imgs.value[j].style.opacity = "0";
            } else {
              imgs.value[j].style.opacity = "1";
            }
          }
           //显示下一张图片
          i--;
          setTimeout(() => {
            container.value.style.transition =
              "all " + props.duration / 1000 + "s " + props.timingFunction;
            container.value.style.transform =
              "translateY(" + i * parseInt(props.imgHeight) + "px)";
          }, props.duration); 
           //判断当前图片是否到了最后一张，如果是最后一张，需要将过渡去掉，将图片改为第一张
          if (i === -(imgs.value.length - 1)) {
            setTimeout(() => {
              //将图片改为第一张
              container.value.style.transition = "none";
              container.value.style.transform = "translateY(0)";
            }, 2 * props.duration);
          }
        }, props.timer); //可以在此设置定时器的执行间隔，执行间隔最小不能低于2倍的过渡时间
      }
    });
    return {
      container,
      imgs,
      imageUrls
    };
  },
};
</script>

<style scoped lang="less">
.out-wrap {
  box-sizing: border-box;
  padding-top: 200px;
  height: 400px;
  width: 200px;
  overflow: hidden;
  transform: scale(1);
  transition: 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
}
.wrap {
  border-radius: 12px;
  overflow: hidden;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(0);
    // transition: all 0.3s linear;
    .image {
      width: 200px;
      height: 292px;
      opacity: 1;
      //   transition: all 0.3s;
    }
  }
}
</style>
