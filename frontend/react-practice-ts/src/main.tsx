import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.ts'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
    <StrictMode>
    <App />
    </StrictMode>
  </BrowserRouter>
  </Provider>
  ,
)
