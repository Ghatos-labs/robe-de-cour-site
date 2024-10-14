import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from './components/store.tsx'

import './style.css'

import Navbar from './components/navbar.tsx'
import Banner from './components/banner.tsx'
import Footer from './components/footer.tsx'

import Home from './components/home.tsx'
import Confections from './components/confections.tsx'
import Contact from './components/contact.tsx'
import Panier from './components/panier.tsx'
import Article from './components/article.tsx'

function App() {
  return(
    <>
      <Provider store={Store}>
        <Navbar/>
        <Banner/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/confections" element={<Confections/>}/>
          <Route path="/confections/:articleID" element={<Article/>}/>
          <Route path="/contacter" element={<Contact/>}/>
          <Route path="/panier" element={<Panier/>}/>
        </Routes>
        <Footer/>
      </Provider>
    </>
  )
}

export default App