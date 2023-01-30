import React from 'react'
import { FullscreenControl, Map, YMaps, ZoomControl } from '@pbe/react-yandex-maps'
import cl from './CustomMap.module.css'

const CustomMap = () => {
  return (
    <div className={cl.outer_map}>
      <YMaps>
        <Map defaultState={{ center: [37.928659, 58.39945], zoom: 16, controls: [] }}
             className={cl.map}>
          <FullscreenControl/>
          <ZoomControl options={{ float: 'right', position: { right: 10, top: 60 } }}/>
        </Map>
      </YMaps>
    </div>
  )
}

export default CustomMap
