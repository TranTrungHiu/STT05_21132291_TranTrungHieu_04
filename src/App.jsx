import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/Login/LoginScreen'
import RegisterScreen from './screens/Register/RegisterScreen'
import HomeScreen from './screens/Home/HomeScreen'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  )
}

export default App
