import React, { useContext } from 'react'
import { useHistory } from '../../hooks'
import cl from './HistoryList.module.css'
import { MapContext } from '../../context/MapContext'

const HistoryList = () => {
  const { isLoading, error, data } = useHistory()
  const { setCurRefPoints } = useContext(MapContext)

  if (isLoading) return <ul className={cl.routes}></ul>
  if (error) return <div>Error occurred</div>
  if (!data?.post?.length) return null

  return (
    <ul className={cl.routes}>
      {data.post.map(route => {
        return <ol className={cl.route}
                   style={{ backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` }}
                   onClick={() => {
                     setCurRefPoints(route)
                   }}
      >
          {route.map((point) => <li className={cl.route__item}>
            <h4 className={cl.route__title}>{point.title}</h4>
          </li>)}
        </ol>
      })}
    </ul>
  )
}

export default HistoryList
