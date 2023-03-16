import React from "react"

interface props {
	locale: string
}

interface D8Confg {
	locale: string
}


class Bd<Config>{
	locale: string = "zh"
	static getInstance() {
		if ((!window as any).__$$8d__) {
			return new Bd();
		}
	}
}


export default function _8d(config: props) {

	const Ctx = React.createContext<any>(null);

	return function (props: any) {
		const { children } = props;
		return <Ctx.Provider value={config}>
			{children}
		</Ctx.Provider>
	}
}