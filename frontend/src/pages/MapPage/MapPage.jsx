import React, { useContext } from 'react'
import cl from './MapPage.module.css'
import CustomMap from '../../components/CustomMap/CustomMap'
import RouteSelector from '../../components/RouteSelector/RouteSelector'
import { RouteView } from '../../components/RouteView/RouteView'
import { MapContext } from '../../context/MapContext'
import cn from 'classnames'
import { useQuery } from 'react-query'

const saveRoute = async route => {
  let newUser = localStorage.getItem('userMapApiCode')
  if (!newUser) {
    newUser = (await fetch('http://localhost:8000/api/createUser').then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    }).catch(console.error)).user_code
    localStorage.setItem('userMapApiCode', newUser)
  }

  return fetch('http://localhost:8000/api/addHistory/', {
    method: 'POST',
    body: JSON.stringify({
      data: route.points,
      time: route.time,
      way_len: route.wayLen,
      user_code: newUser
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res)
      return res.json()
    }).catch(async () => {
      localStorage.removeItem('userMapApiCode')
      await saveRoute()
    })
}

const MapPage = () => {
  const {
    curRoute,
    setCurRefPoints,
    setRouteProps,
    makeRouteEvent,
    clearRouteEvent,
  } = useContext(MapContext)
  const { refetch, data } = useQuery('historyData', async () => {
    return { post: [...data?.post, {way_len: curRoute.wayLen, points: curRoute.points, time: curRoute.time}] }
  }, { enabled: false })
  const points = curRoute.points

  return (
    <div className={cl.map}>
      <div className={cl.map__content}>
        <CustomMap />
      </div>
      <div className={cl.map__pointList}>
        <RouteSelector />
      </div>
      <div className={cl.routeView}>
        <RouteView />
      </div>
      <div className={cl.map__buttons}>
        {/*TODO: Make validation + call useQuery of 'getHistory' and give it mocked data instead of fetch to update it immediately in history window ?*/}
        <button
          className={cn(cl.map__button, { [cl.map__button_disabled]: points?.length <= 1 || !curRoute.time })}
          onClick={async () => {
            saveRoute(curRoute)
            await refetch()
          }}>
          Сохранить маршрут
        </button>

        <button
          className={cn(cl.map__button, { [cl.map__button_disabled]: points?.length <= 1 })}
          onClick={() => {
            setCurRefPoints([])
            setRouteProps({ time: null, wayLen: null })
            clearRouteEvent.dispatch()
          }}>
          Сбросить маршрут
        </button>
        <button
          className={cn(cl.map__button, { [cl.map__button_disabled]: points?.length <= 1 })}
          onClick={() => {
            makeRouteEvent.dispatch()
          }}
        >
          Построить маршрут
        </button>
      </div>
    </div>
  )
}

export default MapPage
