export function throttle(fn,delay) {
    let timeout
    return function() {
      let args = arguments;//注意如果要传参的话 这句不能省略
      if(!timeout){
        timeout = setTimeout(()=>{
          timeout = null;
          fn.apply(this,args)
        },delay)
      }
    }
  }