import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import NavBar from './components/NavBar/NavBar'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
