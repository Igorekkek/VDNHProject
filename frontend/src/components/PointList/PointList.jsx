import React, { useEffect, useState } from 'react'
import cl from './PointList.module.css'

const PointList = () => {
  const [points, setPoints] = useState([])
  useEffect(() => {
    (async () => {
      if (!points.length) {
        const response = await fetch('http://localhost:8000/api/getPOI/')
        console.log(response)
        const data = await response.json()
        setPoints(data)
      }})();
  }, [])

  return (
      <ul className={cl.list}>
          <li>
            {points.map(point => <div key={point.code}>{point.category}</div>)}
          </li>
      </ul>
  )
}

export default PointList
