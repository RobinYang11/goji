<template>
<div class="plugin-wrap">
   <!-- 膜态层  -->
   <div class="model" v-if="isShow"></div>
   <!-- 消息框 -->
  <transition name="msgbox-fade">
    <div class="message-box-plugin" v-if="isShow" @click.self="handleModel">
      <div class="message-box">
        <!-- 1. 弹框头部 -->
        <header class="message-box-header">
          <p>{{title}}</p>
          <svg-icons v-if="showClose" type="close" class="close-icon" @click="close()"></svg-icons>
        </header>
        <!-- 2. 弹框主要内容 -->
        <div class="message-box-content">
          <svg-icons :type="type" class="svg-icon"></svg-icons>
          {{message}}
        </div>
        <!-- 3. 弹框底部 -->
        <footer class="message-box-footer">
          <button class="cancel-btn" v-if="showCancelButton" @click="handleCancel">{{cancelButtonText}}</button>
          <button class="confirm-btn" v-if="showConfirmButton" @click="handleConfirm">{{confirmButtonText}}</button>
        </footer>
      </div>
    </div>
  </transition>
</div> 
</template>

<script>
import svgIcons from './svgIcons.vue'
export default {
  name: 'messageBox',
  components: {
    svgIcons
  },
  props: {
  },
  data () {
    return {
      isShow: false,
      message: '',
      title: '',
      type: '',
      showClose: true,
      showCancelButton: false,
      cancelButtonText: '取消',
      showConfirmButton: true,
      confirmButtonText: '确定',
      closeOnClickModal: true
    }
  },
  methods: {
    open () {
      this.isShow = true
    },
    handleModel () {
      if (this.closeOnClickModal) {
        this.close()
      }
    },
    handleCancel () {
      this.close()
      this.cancelCallback()
    },
    cancelCallback () {},
    handleConfirm () {
      this.close()
      this.confirmCallback()
    },
    confirmCallback () {},
    close () {
      // this.$emit('update:showMessageBox', false)
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.message-box-plugin{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3001;
}
.model{
  width: 100%;
  height: 100%;
  background: rgba(83, 88, 94, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3000;
}
.message-box{
  width: 420px;
  padding: 10px 5px 15px;
  vertical-align: middle;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #ebeef5;
  text-align: left;
  overflow: hidden;
  box-shadow: 5px 6px 10px rgba(88, 88, 88, 0.3), -5px -6px 10px rgba(255, 255, 255, 0.8) inset, 5px 6px 10px rgba(218, 221, 221, .5) inset;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3001;
}
.message-box-header{
  display: flex;
  height: 34px;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 15px;
  box-sizing: border-box;
  font-size: 18px;
}
.close-icon{
  cursor: pointer;
  transition: transform .3s;
}
.close-icon:hover{
  transform: rotate(90deg);
}
.message-box-content{
  color: #606266;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;
}
.message-box-content .svg-icon{
  vertical-align: middle;
  margin-right: 5px;
  margin-bottom: -2px;
}
.message-box-footer{
  padding: 5px 15px 0;
  text-align: right;
}
.message-box-footer button{
  border-radius: 4px;
  border: none;
  padding: 5px 12px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 16px;
}
.confirm-btn{
  background: rgb(138, 218, 250);
  color: rgb(9, 103, 146);
  box-shadow: 2px 2px 5px rgba(86, 186, 199, 0.7), -2px -2px 5px rgba(201, 233, 247, 0.8) inset, 5px 6px 2px rgba(35, 157, 173, 0.3) inset;
}
.cancel-btn{
  background: rgba(207, 227, 229, 0.1);
  color: rgb(162, 172, 182);
  box-shadow: 2px 2px 5px rgba(199, 206, 211, 0.7), -5px -6px 5px rgba(255, 255, 255, 0.8) inset, 5px 6px 5px rgba(236, 236, 236, 0.5) inset;
}

/* 动效 */
.msgbox-fade-enter-active{
  animation:msgbox-fade-in .3s
}
.msgbox-fade-leave-active{
  animation:msgbox-fade-out .3s
}
@keyframes msgbox-fade-in{
  0%{
    transform:translate3d(0,-20px,0);
    opacity:0;
  }
  100%{
    transform:translate3d(0,0,0);
    opacity:1;
    border-radius: 5px;
  }
}
@keyframes msgbox-fade-out{
  0%{
    transform:translate3d(0,0,0);
    opacity:1
  }
  100%{
    transform:translate3d(0,-20px,0);
    opacity:0
  }
}
</style>