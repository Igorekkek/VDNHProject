import React, { useState } from 'react'
import cl from './RouteSelector.module.css'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PointList } from '../PointList/PointList'
import RouteList from '../RouteList/RouteList'
import { useHistory, useStaticRoutes, useWindowDimensions } from '../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

const RouteSelector = () => {
  const { data: historyRoutes } = useHistory()
  const { data: staticRoutes } = useStaticRoutes()
  const [width] = useWindowDimensions()
  const [hiddenFullscreen, setHiddenFullscreen] = useState(width <= 900)

  if (width <= 900) return (
    <>
      <Tabs className={cn(cl.tabs, cl.tabs_mobile, {[cl.tabs_hidden]: hiddenFullscreen})}>
        <TabList className={cl.tabList}>
          <Tab className={cl.tabList__tab}>Маршрут</Tab>
          <Tab className={cl.tabList__tab}>История</Tab>
          <Tab className={cl.tabList__tab}>Готовые маршруты</Tab>
        </TabList>
        <TabPanel>
          <PointList/>
        </TabPanel>
        <TabPanel>
          <RouteList routes={historyRoutes}/>
        </TabPanel>
        <TabPanel>
          <RouteList routes={staticRoutes}/>
        </TabPanel>
      </Tabs>
      <button className={cl.button} onClick={() => setHiddenFullscreen(prevState => !prevState)}>
        <FontAwesomeIcon icon="fa-route" className={cl.button__icon}/>
      </button>
    </>)

  return (
    <Tabs className={cl.tabs}>
      <TabList className={cl.tabList}>
        <Tab className={cl.tabList__tab}>Маршрут</Tab>
        <Tab className={cl.tabList__tab}>История</Tab>
        <Tab className={cl.tabList__tab}>Готовые маршруты</Tab>
      </TabList>
      <TabPanel>
        <PointList/>
      </TabPanel>
      <TabPanel>
        <RouteList routes={historyRoutes}/>
      </TabPanel>
      <TabPanel>
        <RouteList routes={staticRoutes}/>
      </TabPanel>
    </Tabs>
  )
}

export default RouteSelector
