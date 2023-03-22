/**
 * 获取屏幕高度，排除滚动条
 * @returns
 */
export function getWindowSize() {
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.top = '0px';
  el.style.bottom = '0px';
  el.style.left = '0px';
  el.style.right = '0px';
  el.style.pointerEvents = 'none';
  el.style.opacity = '0';
  document.body.appendChild(el);
  const rect = el.getBoundingClientRect();
  document.body.removeChild(el);
  return {
    width: rect.width,
    height: rect.height
  };
}
