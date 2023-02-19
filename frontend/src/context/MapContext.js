import { createContext, useState } from 'react'
import { getClosestRoute } from '../utils'

class SimpleEvent {
  #listeners

  constructor() {
    this.#listeners = []
  }

  dispatch() {
    this.#listeners.forEach(listener => listener())
  }

  add(listener) {
    this.#listeners.push(listener)
  }

  remove(listener) {
    this.#listeners = this.#listeners.filter(l => l !== listener)
  }
}

export const MapContext = createContext()

export const MapProvider = (props) => {
  const [curRoute, setCurRoute] = useState({ points: [], time: null, wayLen: null })
  const [mapCenter, setMapCenter] = useState([55.828693, 37.633724])

  const startPointCode = props.startPointCode;
  const makeRouteEvent = new SimpleEvent()
  const clearRouteEvent = new SimpleEvent()

  const setPoints = points => {
    if (points.length <= 1) {
      setCurRoute(prevState => ({ ...prevState, points }))
      return
    }
    setCurRoute(prevState => ({ ...prevState, points: getClosestRoute(points[0], points.slice(1)) }))
  }
  const setRouteProps = props => setCurRoute(prevState => ({  ...props, points: prevState.points }))

  const addRefPoint = point => {
    if (curRoute.points.some((p) => point.code === p.code)) return
    setPoints([...curRoute.points, point])
  }
  const removeRefPoint = (point) => {
    setPoints(curRoute.points.filter(p => point.code !== p.code))
  }

  const isInRefPoints = point => curRoute.points.some(p => p.code === point.code)

  return <MapContext.Provider
    value={{
      curRoute,
      setRouteProps,
      setCurRefPoints: setPoints,
      addRefPoint,
      removeRefPoint,
      isInRefPoints,
      makeRouteEvent,
      clearRouteEvent,
      mapCenter,
      setMapCenter,
      startPointCode
    }}>{props.children}</MapContext.Provider>
}

