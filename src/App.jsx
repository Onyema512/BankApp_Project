import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Page/LoginPage'
import LandingPage from './Page/LandingPage'

function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
