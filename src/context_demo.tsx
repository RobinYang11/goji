import React, { useContext, useState } from "react"






const Ctx = React.createContext<any>({});

function Son() {

  const { state, setState } = useContext(Ctx);
  return <div>{state?.name}
    <button onClick={() => {
      setState({ name: "robin changed!" })
    }}>change name</button>
  </div>
}


export default function ContextDeomo() {

  const [state, setState] = useState({ name: "robin" })


  return <div>
    <Ctx.Provider value={{ state, setState }}>
      <Son />
    </Ctx.Provider>
  </div>
}
