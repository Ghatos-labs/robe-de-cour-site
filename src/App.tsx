
import './style.css'
import Navbar from './components/navbar.tsx'
import Banner from './components/banner.tsx'
import Footer from './components/footer.tsx'

import Mainpage from './components/main-page.tsx'

function App() {
  return(
    <div>
      <Navbar/>
      <Banner/>
      <div className="content-container">
        <Mainpage/>
      </div>
    </div>
  )
}

export default App