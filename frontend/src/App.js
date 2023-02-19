import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapProvider } from './context/MapContext'
import MapPage from './pages/MapPage/MapPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="App">
        <MapProvider startPointCode={9}>
          <MapPage/>
        </MapProvider>
      </main>
    </QueryClientProvider>
  )
}

export default App
