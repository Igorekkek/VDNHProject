import React, { useContext } from 'react'
import { useHistory } from '../../hooks'
import cl from './HistoryList.module.css'
import { MapContext } from '../../context/MapContext'
const RouteList = ({routes}) => {
  const {setCurRefPoints, makeRouteEvent} = useContext(MapContext)
  let formatter = new Intl.DateTimeFormat('ru', {minute: 'numeric', second: 'numeric'})

  if (!routes?.length) return <ul className={cl.routes}></ul>


  return (
    <ul className={cl.routes}>
      {routes.map(route => {
        const date = new Date(1970, 0, 1)
        date.setSeconds(route.time)
        const t = formatter.format(date)
        return <ol className={cl.route}
              onClick={() => {
                setCurRefPoints(route.points)
                makeRouteEvent.dispatch()
              }}
          >
          {t + ' '}
          {route.way_len + ' метров'}
            {route.points.map(point => <li className={cl.route__item}>
              <h4 className={cl.route__title}>{point.title}</h4>
            </li>)}
          </ol>

      })}
    </ul>
  )
}

export default RouteList
