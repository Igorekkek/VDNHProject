import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapProvider } from './context/MapContext'
import MapPage from './pages/MapPage/MapPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="App">
        <MapProvider>
          <MapPage/>
        </MapProvider>
      </main>
    </QueryClientProvider>
  )
}

export default App
