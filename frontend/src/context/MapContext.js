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

  localStorage.setItem('userMapApiKey', localStorage.getItem('userMapApiKey') ?? 'sdifysbkjbiu2343dfsf')
  const userKey = localStorage.getItem('userMapApiKey')

  return <MapContext.Provider
    value={{
      curRefPoints,
      setCurRefPoints,
      addRefPoint,
      removeRefPoint,
      isInRefPoints,
      userKey
    }}>{props.children}</MapContext.Provider>
}
