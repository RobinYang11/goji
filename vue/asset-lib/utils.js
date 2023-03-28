const re_scroll = /scroll|auto/
export const _body = document.documentElement || document.body

/**
 * 获取目标元素有滚动条的父元素(body元素会直接用window对象代替)
 * @param {*} el 目标元素
 * @returns Element[]
 */
export const _getScrollParents = el => {
  const result = []
  let needContinue = true
  let parent = el.parentNode
  while (needContinue) {
    if (parent.tagName.toLowerCase() === 'body') {
      result.push(window)
      needContinue = false
    } else {
      const overflow = window.getComputedStyle(parent).overflow
      if (re_scroll.test(overflow)) result.push(parent)
      parent = parent.parentNode
    }
  }
  return result
}

/**
 * 获取目标元素的所有父元素的综合滚动条偏移
 * @param {*} el 目标元素
 * @returns Object {x, y}
 */
export const _getScrollDistance = el => {
  const result = { x: 0, y: 0 }
  let parent = el.parentNode
  while (parent.tagName.toLowerCase() !== 'body') {
    const overflow = window.getComputedStyle(parent).overflow
    if (re_scroll.test(overflow)) {
      result.x += parent.scrollLeft
      result.y += parent.scrollTop
    }
    parent = parent.parentNode
  }
  result.x += _body.scrollLeft
  result.y += _body.scrollTop
  return result
}

/**
 * 获取元素到页面顶端的offset距离
 * @param {*} el 目标元素
 * @returns Object {x, y}
 */
export const _getOffset = el => {
  let offset = { x: 0, y: 0, }
  let target = el
  let parent = null
  while (parent = target.offsetParent) {
    offset.x += target.offsetLeft
    offset.y += target.offsetTop
    target = parent
    if (parent.tagName.toLowerCase() === 'body') break
  }
  return offset
}

/**
 * 给一个dom元素绑定事件 
 * 
 * @param {Element} dom 要绑定事件的dom元素
 * @param {String} eventName 事件名
 * @param {Function} fn 处理函数
 * @param {(Object|Boolean)} [option = false] 配置项
 * 
 * @example _BD(dom, eventName, fn, option) 
 */
export const _BD = (dom, eventName, fn, option = false) => {
  if(dom.addEventListener){
    dom.addEventListener(eventName, fn, option)
  }else if (dom.attachEvent){
    dom.attachEvent('on' + eventName, fn)
  }else {
    dom['on' + eventName] = fn
  }
}

/**
 * 解除一个dom元素的绑定事件 
 * 
 * @param {Element} dom 要解除绑定事件的dom元素 
 * @param {String} eventName 事件名
 * @param {Function} functionName 处理函数(必须是一个函数变量名)
 * 
 * @example _unBD(dom, eventName, functionName)
 */
 export const _unBD = (dom, eventName, functionName) => {
  if (dom.attachEvent) {
    dom.detachEvent('on' + eventName, functionName)
  } else {
    dom.removeEventListener(eventName, functionName, false)
  }
}