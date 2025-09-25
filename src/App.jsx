import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Service from './components/Service'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Booking from './components/Booking'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <div id="home">
              <Home />
            </div>
            <Banner />
            <div id="service">
              <Service />
            </div>
          </>
        } />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  )
}

export default App