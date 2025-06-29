import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter basename={import.meta.env.DEV ? '/' : '/robe-de-cour-site/'}>
        <App />
      </BrowserRouter> */}
      <HashRouter>
        <App />
      </HashRouter>  
    </Provider>
  </React.StrictMode>,
)