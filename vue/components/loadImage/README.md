## loadImage props


`width` : 组件宽度 [string] 默认'600px' *注: 必须带单位
<br>
`height` :  组件高度 [string] 默认'500px' *注: 必须带单位
<br>
`border` : 是否有边框 [boolean] 默认true
<br>
`cols` : 组件的列数 [number] 默认3
<br>
`data` : 组件的主要数据 [array] 默认[]
<br>
`isOver` : 这个属性表示所有图片是否已经加载完毕; 如果这个属性的值是true, 那么组件末尾将出现'------ 所有图片加载完毕 ------', 且不再触发@lazyLoad [boolean] 默认false
<br>
`@lazyLoad` : 滚动条滚动时, 当滚动条滑动到最短列即将离开组件底部时, 将触发lazyLoad方法, 可在lazyLoad中实现图片加载
<br>

## ref expose

`initState` : 通过ref.xxx重置组件内部的ready状态 [function] *注: 当组件触发lazyLoad时, 会将组件内部状态ready设置为false, 在ready为false的情况下将不会再触发lazyLoad(其实就是防抖), 当组件的data属性发生变化时将重置ready状态为true.
<br>
