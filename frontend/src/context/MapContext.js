import { createContext, useState } from 'react'

export const MapContext = createContext()

export const MapProvider = (props) => {
  const [curRefPoints, setCurRefPoints] = useState([])
  const addRefPoint = ([longitude, latitude]) => {
    if (curRefPoints.some(([l1, l2]) => l1 === longitude && l2 === latitude)) return
    setCurRefPoints([...curRefPoints, [longitude, latitude]])
  }
  const removeRefPoint = ([longitude, latitude]) => {
    setCurRefPoints(curRefPoints.filter(([l1, l2]) => l1 !== longitude || l2 !== latitude))
  }
  const isInRefPoints = ([longitude, latitude]) => curRefPoints.find(([l1, l2]) => l1 === longitude && l2 === latitude) !== undefined

  return <MapContext.Provider
    value={{ curRefPoints, setCurRefPoints, addRefPoint, removeRefPoint, isInRefPoints }}>{props.children}</MapContext.Provider>
}
