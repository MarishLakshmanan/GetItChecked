"use client"

import React, { createContext, useContext, useState } from 'react'

const FileContext = createContext()

const useFile = () => useContext(FileContext)

const FileContextProvider = ({children}) => {

    const [name,setName] = useState(null)
    const [file,setFile] = useState(null)

    const setPDF = (i_name,i_file)=>{
        setName(i_name)
        setFile(i_file)
    } 

    
    
  return (
    <FileContext.Provider value={[name,file,setPDF]}>
        {children}
    </FileContext.Provider>
  )
}

export {FileContextProvider,useFile}