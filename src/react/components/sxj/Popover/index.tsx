import { ReactNode, FC, useRef, useState, useEffect, forwardRef, useImperativeHandle, ReactElement, ReactHTML } from 'react'
import { createPortal } from 'react-dom'
import './index.less'

export interface PopoverProps {
    tips?: string | ReactNode | (() => ReactNode)
    children: ReactNode;
    trigger?: 'click' | 'mouse',
    placement?: 'tc' | 'tl' | 'tr' | 'lt' | 'lb' | 'lc' | 'bl' | 'bc' | 'br' | 'rt' | 'rc' | 'rb'
}

export interface TipsProps {
    children: ReactNode;
    open: boolean;
    fatherRef: HTMLDivElement | null;
    style: Record<string, any>;
}
export interface TipsReturnProps {
}

export interface RefProps<T> {
    current: T;
}

export const Tips = forwardRef<TipsReturnProps, TipsProps>((props, currentRef) => {
    const { open, children, fatherRef, style } = props
    if (!open) {
        return createPortal((
            <div className='sxj-tips-warp-init' style={{ opacity: 0 }} ref={currentRef} >
                {children}
            </div>
        ), document.body)
    }
    return createPortal((
        <div className='sxj-tips-warp' style={{ ...style, opacity: 1 }}>
            {children}
        </div>
    ), fatherRef || document.body)
})

export const Popover: FC<PopoverProps> = ({ children, placement = 'tc', tips, trigger = 'click' }) => {
    const [flag, setFlag] = useState<boolean>(false)
    const mainDom = useRef<HTMLDivElement | null>(null)
    const childDom = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (trigger === 'click') {
            window.addEventListener('click', (e) => {
                setFlag(false)
            })
        }

        // mainDom.current?.onscroll
        // window.addEventListener("sr")
    }, [])

    const styleChange = () => {

        const mainHeight = mainDom.current?.offsetHeight || 0;
        const mainWidth = mainDom.current?.offsetWidth || 0;
        const childHeight = childDom.current?.offsetHeight || 0;
        const childWidth = childDom.current?.offsetWidth || 0;

        if (placement === 'tl') {
            return {
                left: 0,
                bottom: mainHeight + 12
            }
        }
        if (placement === 'tc') {
            return {
                left: -(childWidth - mainWidth) / 2,
                bottom: mainHeight + 12
            }
        }
        if (placement === 'tr') {
            return {
                right: 0,
                bottom: mainHeight + 12
            }
        }
        if (placement === 'lt') {
            return {
                left: -(childWidth + 12),
                top: 0
            }
        }
        if (placement === 'lc') {
            return {
                left: -(childWidth + 12),
                top: -(childHeight - mainHeight) / 2
            }
        }
        if (placement === 'lb') {
            return {
                left: -(childWidth + 12),
                bottom: 0
            }
        }
        if (placement === 'rt') {
            return {
                right: -(childWidth + 12),
                top: 0
            }
        }
        if (placement === 'rc') {
            return {
                right: -(childWidth + 12),
                top: -(childHeight - mainHeight) / 2
            }
        }
        if (placement === 'rb') {
            return {
                right: -(childWidth + 12),
                bottom: 0
            }
        }
        if (placement === 'bl') {
            return {
                left: 0,
                top: mainHeight + 12
            }
        }
        if (placement === 'bc') {
            return {
                left: -(childWidth - mainWidth) / 2,
                top: mainHeight + 12
            }
        }

        return {}
    }


    return (
        <div
            className='sxj-popover-warp'
            onClick={(e) => {
                if (trigger === 'click') {
                    e.stopPropagation()
                    setFlag(true)
                }
            }}>
            <div className='sxj-popover-warp-main' ref={mainDom}
                onMouseEnter={() => {
                    if (trigger === "mouse") {
                        setFlag(true)
                    }
                }}
                onMouseLeave={() => {
                    if (trigger === "mouse") {
                        setFlag(false)
                    }
                }}>

                {children}
                <Tips style={styleChange()} fatherRef={mainDom.current} ref={childDom} open={flag} >
                    {typeof tips === 'function' ? tips() : tips}
                </Tips>
            </div>
        </div>
    )
}