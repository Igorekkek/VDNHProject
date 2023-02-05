import './App.css'
import CustomMap from './components/CustomMap/CustomMap'
import PointList from './components/PointList/PointList'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapProvider } from './context/MapContext'
import { RouteView } from './components/RouteView/RouteView'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <main className="App">
      <MapProvider>
        <div className="map">
          <div className="map__content">
            <CustomMap/>
          </div>
          <div className="map__point-list">
            <PointList/>
          </div>
        </div>
        <div className="route-view">
          <RouteView/>
        </div>
      </MapProvider>
    </main>
  </QueryClientProvider>
)
}

export default App
