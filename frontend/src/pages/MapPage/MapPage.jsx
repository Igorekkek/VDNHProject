import React, { useContext } from 'react'
import cl from './MapPage.module.css'
import CustomMap from '../../components/CustomMap/CustomMap'
import RouteSelector from '../../components/RouteSelector/RouteSelector'
import { RouteView } from '../../components/RouteView/RouteView'
import { MapContext } from '../../context/MapContext'

const saveRoute = route => {
  return fetch('http://localhost:8000/api/addHistory/', {
    method: 'POST', body: JSON.stringify({ data: route, user_code: localStorage.getItem('userMapApiCode') }), headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    }).catch(console.error)
}

const MapPage = () => {
  const { curRefPoints, setCurRefPoints } = useContext(MapContext)

  return (
    <div className={cl.map}>
      <div className={cl.map__content}>
        <CustomMap/>
      </div>
      <div className={cl.map__pointList}>
        <RouteSelector/>
      </div>
      <div className={cl.routeView}>
        <RouteView/>
      </div>
      <div className={cl.map__buttons}>
        {/*TODO: Make validation + call useQuery of 'getHistory' and give it mocked data instead of fetch to update it immediately in history window ?*/}
        <button className={cl.map__button}
          onClick={async () => {
            if (!curRefPoints?.length) return
            await saveRoute(curRefPoints)
          }}>
          Сохранить маршрут
        </button>

        <button className={cl.map__button}
          onClick={() => {
            setCurRefPoints([])
          }}>
          Сбросить маршрут
        </button>
      </div>
    </div>
  )
}

export default MapPage
