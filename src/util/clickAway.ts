import { useEffect } from 'react';
export const useClickAway = (cb:()=>void, refdom:any) => {
    useEffect(()=>{
        const clickFn = (e:MouseEvent) => {
            if(Array.isArray(refdom)){
                if(!!refdom.find((ref)=>ref.current?.contains(e.target as HTMLElement))){
                    return;
                }
                cb && cb()
            } else {
                if(!refdom.current ||  refdom.current.contains(e.target as HTMLElement)) {
                    return;
                } 
                cb && cb()
            }
        }
        document.addEventListener('click',clickFn)

        return ()=>document.removeEventListener('click',clickFn)
    },[])
}