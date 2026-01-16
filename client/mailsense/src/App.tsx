import { Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Analyze from './pages/Analyze';

function App() {


  return (
    <> 
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </div>
    </>
  )
}

export default App
