// import { createRoot } from 'react-dom/client'
// // import './index.css'
// //import App from './App.tsx'
// import Chat from './Chat.tsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './store.ts'
// import { StrictMode } from 'react'

// createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//   <BrowserRouter>
//   <StrictMode>
//     <Chat />
//     </StrictMode>
//   </BrowserRouter>
//   </Provider>
//   ,
// )

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, {persistor} from './store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  ,
)