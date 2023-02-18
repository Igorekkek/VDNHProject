import React, { useContext } from 'react'
import cl from './RouteList.module.css'
import { MapContext } from '../../context/MapContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RouteList = ({ routes }) => {
  const { setCurRefPoints, makeRouteEvent } = useContext(MapContext)

  if (!routes?.length) return <ul className={cl.routes}></ul>

  return (
    <ul className={cl.routes}>
      {routes.map(route => {
        return (
          <li className={cl.route__outer}>
            <ol className={cl.route}
                onClick={() => {
                  setCurRefPoints(route.points)
                  makeRouteEvent.dispatch()
                }}
            >
              {route.points.map(point => <li className={cl.route__item}>
                <h4 className={cl.route__title}>{point.title}</h4>
              </li>)}
            </ol>
            <div className={cl.route__props}>
              <p className={cl.route__prop}><FontAwesomeIcon icon="fa-solid fa-clock"/>{Math.floor(route.time / 60) + ' минут(ы)'}</p>
              <p className={cl.route__prop}><FontAwesomeIcon icon="fa-solid fa-road"/>{route.way_len + ' метров'}</p>
            </div>
          </li>)

      })}
    </ul>
  )
}

export default RouteList
