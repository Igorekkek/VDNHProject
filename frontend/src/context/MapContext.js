import { createContext, useState } from 'react'

export const MapContext = createContext();

export const MapProvider = (props) => {
  const [curRefPoints, setCurRefPoints] = useState([])

  return <MapContext.Provider value={{curRefPoints, setCurRefPoints}}>{props.children}</MapContext.Provider>
}
