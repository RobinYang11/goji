## popover props


`title` : 弹框的标题 [string] 默认'title'
<br>
`showTitle` : modal弹框的标题 [boolean] 默认true
<br>
`trigger` : 触发方式 [string] 默认'hover'; *注: 共有2个有效值: 'hover': 表示鼠标移入时触发弹框, 'click': 表示鼠标点击时触发弹框
<br>
`@popShow` : 弹框显示时的回调方法
<br>
`@popClose` : 弹框关闭时的回调方法
<br>

## ref expose

`close` : 通过ref.xxx关闭popover弹框的方法 [function]
<br>

## slots

`v-slot:default` : 触发气泡框标题元素slot.
<br>
`v-slot:title` : 弹框的title区域slot.
<br>
`v-slot:content` : 弹框的内容区域slot.
<br>