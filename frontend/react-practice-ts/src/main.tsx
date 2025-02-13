// import { createRoot } from 'react-dom/client'
// // import './index.css'
// import App from './App.tsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './store.ts'

// createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//   <BrowserRouter>
   
//     <App />
  
//   </BrowserRouter>
//   </Provider>
//   ,
// )

import { createRoot } from 'react-dom/client'
// import './index.css'
import Chat from './Chat.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
   
    <Chat />
  
  </BrowserRouter>
  </Provider>
  ,
)