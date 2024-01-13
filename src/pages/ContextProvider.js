import React, { createContext, useState } from 'react'

export const adddata = createContext("");

const ContextProvider = ({children}) => {

  const [userdata,setUdata] = useState("");

  return (
    <adddata.Provider value={{userdata,setUdata}}>
        {{children}}
    </adddata.Provider>
  )
}

export default ContextProvider