import React, { useContext } from 'react'
import { MapContext } from '../../context/MapContext'

const MapButton = ({onClick, text}) => {
  const mapContext = useContext(MapContext)

  return (
    <button onClick={() => onClick(mapContext)}>
      {text}
    </button>
  )
}

export default MapButton
