import React, { useContext } from 'react'
import { useHistory } from '../../hooks'
import cl from './HistoryList.module.css'
import { MapContext } from '../../context/MapContext'

const secondsToReadable = seconds => {
  const numberEnding = number => {
    if ('056789'.includes(number.toString().at(-1))) return ''
    if ('234'.includes(number.toString().at(-1))) return 'ы'
    return 'a'
  }

  let temp = Math.floor(seconds)
  let hours = Math.floor((temp %= 86400) / 3600)
  if (hours) {
    return hours + ' часов' + numberEnding(hours)
  }
  let minutes = Math.floor((temp %= 3600) / 60)
  if (minutes) {
    return minutes + ' минут' + numberEnding(minutes)
  }
  let seconds_ = temp % 60
  if (seconds_) {
    return seconds_ + ' секунд' + numberEnding(seconds_)
  }
  return 'меньше секунды'
}

const HistoryList = () => {
  const { isLoading, error, data } = useHistory()
  const { setCurRefPoints, makeRouteEvent } = useContext(MapContext)

  if (isLoading) return <ul className={cl.routes}></ul>
  if (error) return <div>Error occurred</div>
  if (!data?.post?.length) return null

  return (
    <ul className={cl.routes}>
      {data.post.map(route => {
        return <ol className={cl.route}
              onClick={() => {
                setCurRefPoints(route.points)
                makeRouteEvent.dispatch()
              }}
          >
            {route.points.map(point => <li className={cl.route__item}>
              <h4 className={cl.route__title}>{point.title}</h4>
            </li>)}
          </ol>

      })}
    </ul>
  )
}

export default HistoryList
