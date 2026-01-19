import './App.css'
// import Sports from './Components/Sports'  //commenting for now
// import StarSport1 from './Components/starSport1'
import Home from './Screen/Home'
import Player from './Screen/Player'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:type/:id" element={<Player />} />
        {/* <Route path="/sports/Star_Spot_1" element ={<Sports/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
