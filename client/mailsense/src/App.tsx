
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
