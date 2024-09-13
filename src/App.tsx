
import { Route, Routes } from 'react-router-dom'

import './style.css'

import Navbar from './components/navbar.tsx'
import Banner from './components/banner.tsx'
import Footer from './components/footer.tsx'

import Mainpage from './components/main.tsx'
import Contact from './components/contact.tsx'

function App() {
  return(
    <>
      <div>
        <Navbar/>
        <Banner/>
        <Routes>
          <Route path="/" element={<Mainpage/>}/>
          <Route path="/contacter" element={<Contact/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App