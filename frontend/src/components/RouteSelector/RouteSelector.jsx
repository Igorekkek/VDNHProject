import React from 'react'
import cl from './RouteSelector.module.css'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PointList } from '../PointList/PointList'
import HistoryList from '../HistoryList/HistoryList'

const RouteSelector = () =>
  (
    <Tabs className={cl.tabs}>
      <TabList className={cl.tabList}>
        <Tab className={cl.tabList__tab}>Маршрут</Tab>
        <Tab className={cl.tabList__tab}>История</Tab>
      </TabList>
      <TabPanel>
        <PointList/>
      </TabPanel>
      <TabPanel>
        <HistoryList/>
      </TabPanel>
    </Tabs>
  )

export default RouteSelector
