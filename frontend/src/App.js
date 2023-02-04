import './App.css'
import CustomMap from './components/CustomMap/CustomMap'
import PointList from './components/PointList/PointList'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <main className="App">
      <div className="map">
        <div className="map__content">
          <CustomMap/>
        </div>
        <div className="map__point-list">
          <PointList/>
        </div>
      </div>
    </main>
  </QueryClientProvider>
)
}

export default App
