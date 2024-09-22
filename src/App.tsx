
import { Route, Routes } from 'react-router-dom'

import './style.css'

import Navbar from './components/navbar.tsx'
import Banner from './components/banner.tsx'
import Footer from './components/footer.tsx'

import Mainpage from './components/main.tsx'
import Confections from './components/confections.tsx'
import Contact from './components/contact.tsx'
import Panier from './components/panier.tsx'
import Article from './components/article.tsx'

function App() {
  return(
    <>
      <div>
        <Navbar/>
        <Banner/>
        <Routes>
          <Route path="/" element={<Mainpage/>}/>
          <Route path="/confections" element={<Confections/>}/>
          <Route path="/confections/*" element={<Article/>}/>
          <Route path="/contacter" element={<Contact/>}/>
          <Route path="/panier" element={<Panier/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App