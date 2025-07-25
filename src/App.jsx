import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { Register } from './pages/Register.jsx'
export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className='min-h-screen bg-white'>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      </BrowserRouter>
    </Provider>
  )
}
