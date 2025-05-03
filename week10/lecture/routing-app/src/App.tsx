import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;
