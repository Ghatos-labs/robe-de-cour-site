import { Route, Routes } from 'react-router-dom'

import './style.css'

import Navbar from './components/navbar.tsx'
import Banner from './components/banner.tsx'
import Footer from './components/footer.tsx'

import Home from './components/home.tsx'
import Confections from './components/confections.tsx'
import Contact from './components/contact.tsx'
import Panier from './components/panier.tsx'
import Article from './components/article.tsx'
//import Cgv from './components/cgv.tsx'

function App() {
  return(
    <>
      <Navbar/>
      <Banner/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/confections" element={<Confections/>}/>
          <Route path="/confections/:articleID" element={<Article/>}/>
          <Route path="/contacter" element={<Contact/>}/>
          <Route path="/panier" element={<Panier/>}/>

          {/* <Route path="/cgv" element={<Cgv/>}/> */}
        </Routes>      
      <Footer/>
    </>
  )
}

export default App