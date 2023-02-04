import React from 'react'
import cl from './PointList.module.css'
import { usePoints } from '../../hooks'

const PointList = () => {
  const { isLoading, error, data } = usePoints()

  if (isLoading) return <li className={cl.list}></li>
  if (error) return <div>Error occured</div>

  return (
    <ul className={cl.list}>
      <li className={cl.list__item}>
        {data.map(point => <div key={point.code}>{point.category}</div>)}
      </li>
    </ul>
  )
}

export default PointList
