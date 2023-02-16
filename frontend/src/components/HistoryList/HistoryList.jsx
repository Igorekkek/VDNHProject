import React, { useContext } from 'react'
import { useHistory } from '../../hooks'
import cl from './HistoryList.module.css'
import { MapContext } from '../../context/MapContext'
const HistoryList = () => {
  const { isLoading, error, data } = useHistory()
  const { setCurRefPoints, makeRouteEvent } = useContext(MapContext)
  let formatter = new Intl.DateTimeFormat('ru', {minute: 'numeric', second: 'numeric'})


  if (isLoading) return <ul className={cl.routes}></ul>
  if (error) return <div>Error occurred</div>
  if (!data?.post?.length) return null

  return (
    <ul className={cl.routes}>
      {data.post.map(route => {
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

export default HistoryList
