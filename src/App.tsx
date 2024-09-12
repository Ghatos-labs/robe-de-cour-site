
import { Route, Routes } from 'react-router-dom'

import './style.css'

import Navbar from './components/navbar.tsx'
import Banner from './components/banner.tsx'
import Footer from './components/footer.tsx'

import Mainpage from './components/main-page.tsx'

function App() {
  return(
    <>
      <div>
        <Navbar/>
        <Banner/>
        <Mainpage/>
        <Footer/>
      </div>
      <Routes>
        <Route path="/" element={<Mainpage/>}/>
      </Routes>    
    </>
  )
}

export default App