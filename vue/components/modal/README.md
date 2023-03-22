## modal props


`v-model` : 绑定值, 是否展示modal弹框 [boolean]
<br>
`title` : modal弹框的标题 [string] 默认'Modal'
<br>
`closeable` : 是否展示modal弹框右上角关闭按钮 [boolean] 默认true
<br>
`maskCloseable` : 点击遮罩是否可关闭modal弹框 [boolean] 默认true
<br>
`showHeader` : 是否展示头部模块 [boolean] 默认true
<br>
`showFooter` : 是否展示底部按钮模块 [boolean] 默认true
<br>
`cancelText` : 底部按钮模块取消按钮的按钮文字描述 [string] 默认'取消'
<br>
`submitText` : 底部按钮模块确认按钮的按钮文字描述 [string] 默认'确定'
<br>
`width` : 主框体宽度 [string] 默认'60%' *必须带单位
<br>
`height` : 主框体高度 [string] 默认'40%' *必须带单位
<br>
`maxWidth` : 主框体最大宽度 [string] 默认undefined *必须带单位
<br>
`maxHeight` : 主框体最大高度 [string] 默认undefined *必须带单位
<br>
`@cancel` : 点击底部按钮模块的取消按钮时的回调方法
<br>
`@submit` : 点击底部按钮模块的确定按钮时的回调方法
<br>

## ref expose

`close` : 通过ref.xxx关闭modal弹框的方法 [function]
<br>

## slots

`v-slot:default` : 弹框的内容区域slot.
<br>
`v-slot:header` : 弹框的头部区域slot. slotScope的值为 { title } ({组件prop中的title值})
<br>
`v-slot:footer` : 弹框的脚部区域slot. slotScope的值为 {close, submit, cancelText, submitText} ({关闭弹框的方法, 点击确认按钮的方法-emit, 关闭按钮的文字描述, 确认按钮的文字描述})
<br>