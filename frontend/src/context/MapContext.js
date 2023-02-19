import { createContext, useState } from 'react'

const getClosestRoute = (start, points) => {
  const route = [start]
  points = new Set(points)

  while (points.size) {
    const prevPoint = route[route.length - 1]
    let newPoint = { longitude: Infinity, latitude: Infinity }
    for (const point of points) {
      if (Math.hypot(prevPoint.longitude - point.longitude, prevPoint.latitude - point.latitude) < Math.hypot(prevPoint.longitude - newPoint.longitude, prevPoint.latitude - newPoint.latitude))
        newPoint = point
    }
    route.push(newPoint)
    points.delete(newPoint)
  }
  return route
}

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

