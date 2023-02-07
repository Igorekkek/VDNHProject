import cl from './PointList.module.css'
import cn from 'classnames'
import React, { useContext, useState } from 'react'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'

export const PointList = () => {
  const { isLoading, error, data: points } = usePoints()
  const { addRefPoint, removeRefPoint, isInRefPoints } = useContext(MapContext)
  const [searchValue, setSearchValue] = useState('')

  if (isLoading) return <ul className={cl.list}></ul>
  if (error) return <div>Error occurred</div>

  return (
    <div>
      <label htmlFor="search-form">
        <input type="search"
               name="search-form"
               id="search-form"
               placeholder="Name"
               value={searchValue}
               onChange={event => setSearchValue(event.target.value)}
        />
        <span>Search for points here</span>
      </label>
      <ul className={cl.list}>
        {points.filter(point => point.title.toLowerCase().includes(searchValue.toLowerCase())).map(point => <li
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
    </div>)
}
