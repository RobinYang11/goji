
<template>
	<div class="demo">
		<div class="introduce">
			<h3 class="title">💡 目标：第二题 [easy] 实现弹框组件</h3>
			<div class="desc-wrap">
				<function-description :describe="describe"></function-description>
			</div>
			<button class="open-btn primary" @click="openMsgBox">打开弹框</button>
		</div>
	</div>	
</template>

<script>
import functionDescription from './functionDescription.vue'
export default {
	components: {
		functionDescription
	},
	data() {
		return {
			showMessageBox: false,
			describe: [
        { id: '1', title: '可自定义页眉', children: [
          { id: '1.1', option: 'title', desc: '弹框标题', type: 'string'},
          { id: '1.2', option: 'showClose', desc: '弹框是否显示右上角关闭按钮', type: 'boolean'}
        ]},
        { id: '2', title: '可自定义页脚', children: [
          { id: '2.1', option: 'showCancelButton', desc: '是否显示取消按钮', type: 'boolean'},
          { id: '2.2', option: 'showConfirmButton', desc: '是否显示确定按钮', type: 'boolean'},
          { id: '2.3', option: 'cancelButtonText', desc: '取消按钮的文本内容', type: 'string'},
          { id: '2.4', option: 'confirmButtonText', desc: '确定按钮的文本内容', type: 'string'},
          { id: '2.5', option: 'cancelCallback', desc: '取消按钮 按下后的回调函数', type: 'function'},
          { id: '2.6', option: 'confirmCallback', desc: '确定按钮 按下后的回调函数', type: 'function'},
        ]},
				{ id: '3', title: '自定义内容', children: [
          { id: '3.1', option: 'message', desc: '消息正文内容', type: 'String'},
          { id: '3.2', option: 'type', desc: '消息类型，用于显示图标', type: 'success / info / warning / error'},
        ]},
				{ id: '4', title: '模态层功能', children: [
          { id: '4.1', option: 'closeOnClickModal', desc: '是否可通过点击遮罩关闭 MessageBox', type: 'boolean'}
        ]}
      ]
		}
	},
	methods: {
		openMsgBox () {
			// 使用自定义插件，在vue_main.js中引入并使用
			this.$messageBox('这是一个自定义的弹框组件', '消息', {
				type: 'success',
				showCancelButton: true,
				confirmButtonText: 'ok',
				// closeOnClickModal: false,
				confirmCallback: () => {
					console.log('确认按钮 => 回调函数')
				},
				cancelCallback: () => {
					console.log('取消按钮 => 回调函数')
				}
			})
		}
	}
}
</script>

<style scoped>
.introduce{
	width: 80%;
	height: 90%;
	box-shadow: 0 5px 5px rgba(0,0,0,.1);
	padding:20px 20px 100px 20px;
	box-sizing: border-box;
	border-radius: 10px;
	background: rgb(246, 248, 250);
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.title{
	color: #555;
	padding: 10px 0px;
	border-bottom: 1px solid rgba(54, 146, 221, .5);
}
.desc-wrap{
	height: calc(100% - 100px);
	overflow-x: hidden;
	overflow-y: auto;
	padding-right: 10px;
	box-sizing: border-box;
}
.open-btn{
  outline: none;
  padding: 9px 20px;
  min-width: 80px;
  font-size: 16px;
  border: none;
  border-radius: 100px;
  font-weight: 600;
  position: absolute;
  cursor: pointer;
  transition: all .3s;
	left: 50%;
	transform: translateX(-50%);
	bottom: 20px;
}
.open-btn::before{
	content: '';
	width: 6px;
	height: 8px;
	background: #fff;
	border-radius: 50%;
	position: absolute;
	right: 10px;
	top: 10px;
	opacity: .4;
}
.open-btn:hover{
	border-radius: 46% 32% 27% 30% / 40% 50% 30% 40%;
	transform: translateX(-48%) scale(1.03);
}
.open-btn.primary{
  background: rgb(138, 218, 250);
  color: rgb(9, 103, 146);
  box-shadow: 2px 2px 5px rgba(86, 186, 199, 0.7), -5px -6px 5px rgba(201, 233, 247, 0.8) inset, 5px 6px 5px rgba(35, 157, 173, 0.4) inset;
}
/* 适配谷歌的滚动条样式 */
::-webkit-scrollbar{
  width: 8px;
  height: 8px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb{
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #d5e5eb;
}
</style>
