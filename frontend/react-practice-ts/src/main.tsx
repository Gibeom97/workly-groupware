import { createRoot } from 'react-dom/client'
import './index.css'
import Chat from './Chat.tsx'

import { BrowserRouter } from 'react-router-dom'
// import store from './type/store.ts'

createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
    <BrowserRouter>
    <Chat/>
    </BrowserRouter>
  // </Provider>
)
