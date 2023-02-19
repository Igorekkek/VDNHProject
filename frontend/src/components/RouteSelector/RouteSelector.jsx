import React from 'react'
import cl from './RouteSelector.module.css'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PointList } from '../PointList/PointList'
import RouteList from '../RouteList/RouteList'
import { useHistory, useStaticRoutes, useWindowDimensions } from '../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RouteSelector = () => {
  const { data: historyRoutes } = useHistory()
  const { data: staticRoutes } = useStaticRoutes()
  const [width] = useWindowDimensions()

  if (width <= 900) return  <button className={cl.button}><FontAwesomeIcon icon='fa-route' className={cl.button__icon}/></button>

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
        <RouteList routes={historyRoutes?.post}/>
      </TabPanel>
      <TabPanel>
        <RouteList routes={staticRoutes?.post}/>
      </TabPanel>
    </Tabs>
  )
}

export default RouteSelector
