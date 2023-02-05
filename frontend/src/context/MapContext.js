import { createContext, useState } from 'react'

export const MapContext = createContext()

export const MapProvider = (props) => {
  const [curRefPoints, setCurRefPoints] = useState([])
  const addRefPoint = (point) => {
    if (curRefPoints.some((p) => point === p)) return
    setCurRefPoints([...curRefPoints, point])
  }
  const removeRefPoint = (point) => {
    setCurRefPoints(curRefPoints.filter(p => point !== p))
  }
  const isInRefPoints = (point) => curRefPoints.includes(point)

  return <MapContext.Provider
    value={{ curRefPoints, setCurRefPoints, addRefPoint, removeRefPoint, isInRefPoints }}>{props.children}</MapContext.Provider>
}
