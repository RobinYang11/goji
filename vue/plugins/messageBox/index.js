import messageBox from './messageBox.vue'
// import modal from './modal.vue'
import { createApp } from 'vue'

const install = function (app, options) {
  app.config.globalProperties.$messageBox = (...args) => {
    const msgBoxApp = createApp(messageBox)
    showMsgBox(msgBoxApp, args)
  }
}

// 把msgBox展示在body上
function showMsgBox (app, args) {
  const oFrag = document.createDocumentFragment()
  const vm = app.mount(oFrag)
  document.body.appendChild(oFrag)
  
  vm.open()

  // 参数的值类型校验
  const vilidator = [
    { field: 'message', type: 'string'},
    { field: 'title', type: 'string'},
    { field: 'type', type: 'string', optional: ['success', 'info', 'warning', 'error']},
    { field: 'showClose', type: 'boolean'},
    { field: 'showCancelButton', type: 'boolean'},
    { field: 'cancelButtonText', type: 'string'},
    { field: 'showConfirmButton', type: 'boolean'},
    { field: 'confirmButtonText', type: 'string'},
    { field: 'closeOnClickModal', type: 'boolean'},
    { field: 'confirmCallback', type: 'function'},
    { field: 'cancelCallback', type: 'function'}
  ]

  let [message, title, opts] = args

  // 实参校验
  message = message ? message : '这是一个弹框'
  title = title ? title : '标题内容'
  opts = opts.constructor === Object ? opts : {}

  const options = {message, title, ...opts}
  for (const key in options) {
    let index = vilidator.findIndex(i => i.field === key)
    if (index !== -1) {
      if (typeof options[key] === vilidator[index].type) {
        if (vilidator[index].optional && !vilidator[index].optional.includes(options[key])) {
          console.error(`参数：${key} 的可选值为 ${vilidator[index].optional.join('/')}`)
          return
        }
        vm[key] = options[key]
      } else {
        console.error(`参数：${key} 的值类型为 ${vilidator[index].type}`)
      }
    } else {
      console.error(`参数：${key} 有误，请参考文档检查`)
    }
  }
}

export default { install }
