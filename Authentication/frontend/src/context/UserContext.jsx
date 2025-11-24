import React, { createContext } from 'react'

export const dataContext = createContext()
const UserContext = ({children}) => {
    const sereverURL = "http://localhost:9000"
    const value = {
        sereverURL
    }
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default UserContext