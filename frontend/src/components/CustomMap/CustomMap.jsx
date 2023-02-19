import cl from './CustomMap.module.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'

const categoryToColor = {
  'Развлечения': '#ee5041',
  'Павильон': '#000',
  'Музей': '#bbb',
  'Вход': '#22bb30'
}

const defaultMapState = { zoom: 16 }

export const CustomMap = ({ timeRestrictionField }) => {
  const [ymaps, setYmaps] = useState(null)
  const { data: points } = usePoints()
  const {
    curRoute,
    setRouteProps,
    addRefPoint,
    removeRefPoint,
    isInRefPoints,
    makeRouteEvent,
    clearRouteEvent,
    mapCenter,
    startPointCode
  } = useContext(MapContext)
  const referencePoints = curRoute.points

  const routes = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    makeRouteEvent.add(() => makeRoute(map.current))
  }, [makeRouteEvent])

  useEffect(() => {
    clearRouteEvent.add(() => clearRoute(map.current))
  })

  useEffect(() => {
    points && addRefPoint(points.find(point => point.code === startPointCode))
  }, [points])

  const onLoad = ymap => {
    setYmaps(ymap)
  }

  const makeRoute = ref => {
    if (ymaps && referencePoints?.length > 1) {
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: referencePoints.map((p) => [p.longitude, p.latitude]),
        params: {
          routingMode: 'pedestrian'
        }
      }, {
        wayPointVisible: false,
        viaPointVisible: false,
        boundsAutoApply: referencePoints.length !== 1,
        routeActivePedestrianSegmentStrokeStyle: 'solid',
        routeActivePedestrianSegmentStrokeColor: '#000',
      })
      setRouteProps({ time: null, wayLen: null })
      multiRoute.model.events.add('requestsuccess', () => {
        const activeRoute = multiRoute.getActiveRoute()
        if (Math.floor(activeRoute.properties.get('duration').value / 60) >= timeRestrictionField.current?.value)
          return alert(`Маршрут дольше ${timeRestrictionField.current?.value} минут`)
        setRouteProps({
          wayLen: activeRoute.properties.get('distance').value,
          time: activeRoute.properties.get('duration').value
        })
        routes.current && ref.geoObjects.remove(routes.current)
        routes.current = multiRoute
        ref.geoObjects.add(multiRoute)
      })
    }
  }

  const clearRoute = ref => {
    routes.current && ref.geoObjects.remove(routes.current)
  }

  return (
    <YMaps query={{ lang: 'ru_RU', apikey: process.env.REACT_APP_YMAPS_API_KEY }}>
      <Map className={cl.map}
           defaultState={defaultMapState}
           state={{ center: mapCenter, zoom: 16 }}
           modules={['multiRouter.MultiRoute']}
           onLoad={onLoad}
           instanceRef={ref => {
             if (!ref) return
             map.current = ref
             ref.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier'])
           }}
      >
        <ZoomControl options={{ position: { top: '2.75rem', left: '.3rem' } }}></ZoomControl>
        {points?.map((point) => {
          return <Placemark geometry={[point.longitude, point.latitude]}
                            options={{
                              iconColor: (isInRefPoints(point) && '#BF1363') || categoryToColor[point.category] || '#dddddd',
                              hintOpenTimeout: 300,
                              hintCloseTimeout: 100,
                              hintHoldByMouse: false,
                              hintLayout: 'islands#hint'
                            }}
                            properties={{ hintContent: point.title }}
                            onClick={() => {
                              if (point.code === startPointCode) return
                              isInRefPoints(point)
                                ? removeRefPoint(point)
                                : addRefPoint(point)
                            }}
                            modules={['geoObject.addon.hint']}
                            key={point.code}
          />
        })}
      </Map>
    </YMaps>
  )
}

export default CustomMap
