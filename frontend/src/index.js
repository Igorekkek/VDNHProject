import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'normalize.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faClock,
  faFloppyDisk,
  faMagnifyingGlass,
  faRoad, faRoute,
  faSquarePlus,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const root = ReactDOM.createRoot(document.getElementById('root'))
library.add(faClock, faRoad, faFloppyDisk, faTrashCan, faSquarePlus, faMagnifyingGlass, faRoute)
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
