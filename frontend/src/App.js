import './App.css'
import CustomMap from './components/CustomMap/CustomMap'
import PointList from './components/PointList/PointList'

function App() {
  return (
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
)
}

export default App
