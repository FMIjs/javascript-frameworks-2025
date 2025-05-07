import { Provider } from 'react-redux'

import './App.css'
import { store } from './+store'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { NavBar } from './components/NavBar/NavBar'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
