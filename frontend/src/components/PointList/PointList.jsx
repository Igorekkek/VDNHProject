import cl from './PointList.module.css'
import cn from 'classnames'
import React, { useContext } from 'react'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'

export const PointList = () => {
  const { isLoading, error, data: points } = usePoints()
  const { addRefPoint, removeRefPoint, isInRefPoints } = useContext(MapContext)

  if (isLoading) return <ul className={cl.list}></ul>
  if (error) return <div>Error occurred</div>

  return <ul className={cl.list}>
    {points.map(point => <li
      className={cn(cl.item, { [cl.item_chosen]: isInRefPoints(point) })}
      key={point.code}
      onClick={() => {
        isInRefPoints(point)
          ? removeRefPoint(point)
          : addRefPoint(point)
      }}>
      <h4 className={cl.item__title}>{point.title}</h4>
    </li>)}
  </ul>
}
