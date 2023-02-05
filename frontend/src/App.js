import './App.css'
import CustomMap from './components/CustomMap/CustomMap'
import PointList from './components/PointList/PointList'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapContext, MapProvider } from './context/MapContext'

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
      </MapProvider>
    </main>
  </QueryClientProvider>
)
}

export default App
