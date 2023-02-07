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
    <div className={cl.pointList__outer}>
      <label htmlFor="search-form" hidden>
        Search for points here
      </label>
      <input type="search"
             name="search-form"
             id="search-form"
             placeholder="Найти"
             value={searchValue}
             className={cl.searchForm__search}
             onChange={event => setSearchValue(event.target.value)}
      />
      <ul className={cl.list}>
        {points.filter(point => point.title.toLowerCase().includes(searchValue.toLowerCase().trim())).map(point => <li
          key={point.code}
        >
          <button className={cn(cl.item, { [cl.item_chosen]: isInRefPoints(point) })} onClick={() => {
            isInRefPoints(point)
              ? removeRefPoint(point)
              : addRefPoint(point)
          }}
          >
            <h4 className={cl.item__title}>{point.title}</h4>
          </button>
        </li>)}
      </ul>
    </div>)
}
