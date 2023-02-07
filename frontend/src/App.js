import './App.css'
import CustomMap from './components/CustomMap/CustomMap'
import RouteSelector from './components/RouteSelector/RouteSelector'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapProvider } from './context/MapContext'
import { RouteView } from './components/RouteView/RouteView'
import MapButton from './components/MapButton/MapButton'

const queryClient = new QueryClient()
const saveRoute = route => {
  return fetch('http://localhost:8000/api/addHistory/', {
    method: 'POST', body: JSON.stringify({ data: route, user_code: localStorage.getItem('userMapApiCode') }), headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    }).catch(console.error)
}

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
              <RouteSelector/>
            </div>
          </div>
          <div className="route-view">
            <RouteView/>
          </div>
          <div className="map__buttons">
            {/*TODO: Make validation + call useQuery of 'getHistory' and give it mocked data instead of fetch to update it immediately in history window ?*/}
            <MapButton text={'Сохранить маршрут'}
                       onClick={async mapContext => {
                         await saveRoute(mapContext.curRefPoints)
                       }}
            />

            <MapButton text={'Сбросить маршрут'}
                       onClick={mapContext => {
                         mapContext.setCurRefPoints([])
                       }}
            />
          </div>
        </MapProvider>
      </main>
    </QueryClientProvider>
  )
}

export default App
