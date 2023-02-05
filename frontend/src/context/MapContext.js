import { createContext, useState } from 'react'

export const MapContext = createContext()

export const MapProvider = (props) => {
  const [curRefPoints, setCurRefPoints] = useState([])
  const addRefPoint = (point) => {
    if (curRefPoints.some((p) => point.code === p.code)) return
    setCurRefPoints([...curRefPoints, point])
  }
  const removeRefPoint = (point) => {
    setCurRefPoints(curRefPoints.filter(p => point.code !== p.code))
  }
  const isInRefPoints = (point)  => curRefPoints.some(p => p.code === point.code)

  return <MapContext.Provider
    value={{
      curRefPoints,
      setCurRefPoints,
      addRefPoint,
      removeRefPoint,
      isInRefPoints,
    }}>{props.children}</MapContext.Provider>
}
