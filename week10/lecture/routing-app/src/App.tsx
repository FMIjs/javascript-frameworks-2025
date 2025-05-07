import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import NavBar from './components/NavBar/NavBar'
import { ThemeProvider } from './context/ThemeContext'
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <NavBar />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App;
