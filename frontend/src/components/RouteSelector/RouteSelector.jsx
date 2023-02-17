import React from 'react'
import cl from './RouteSelector.module.css'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PointList } from '../PointList/PointList'
import RouteList from '../RouteList/RouteList'
import { useHistory } from '../../hooks'
import { useContext } from 'react'
import { MapContext } from '../../context/MapContext'

const RouteSelector = () =>
  {
    const { isLoading, error, data } = useHistory()
    const { setCurRefPoints, makeRouteEvent } = useContext(MapContext)


    return (
      <Tabs className={cl.tabs}>
        <TabList className={cl.tabList}>
          <Tab className={cl.tabList__tab}>Маршрут</Tab>
          <Tab className={cl.tabList__tab}>История</Tab>
          <Tab className={cl.tabList__tab}>Готовые маршруты</Tab>
        </TabList>
        <TabPanel>
          <PointList />
        </TabPanel>
        <TabPanel>
          {data?.post.length !== 0 && <RouteList routes={data.post}/>}
        </TabPanel>
        <TabPanel>
          {/* TODO: Static routes */}
        </TabPanel>
      </Tabs>
    )
  }

export default RouteSelector
