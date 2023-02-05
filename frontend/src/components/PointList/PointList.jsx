import React, { useContext } from 'react'
import cl from './PointList.module.css'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'

const PointList = () => {
  const { isLoading, error, data } = usePoints()
  const { curRefPoints: referencePoints, setCurRefPoints } = useContext(MapContext)

  if (isLoading) return <li className={cl.list}></li>
  if (error) return <div>Error occured</div>

  return (
    <ul className={cl.list}>
      {data.map(point => <li className={cl.list__item} key={point.code}
                             onClick={() => {setCurRefPoints([...referencePoints, [point.longitude, point.latitude]])}}>
        {point.title}
      </li>)}
    </ul>
  )
}

export default PointList
