import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login-page'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './pages/register-page'
import ChatPage from './pages/chat-page'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <LoginPage />
    },
    {
      path:"/register",
      element: <RegisterPage />
    },
    {
      path:"/chat-page",
      element: <ChatPage />
    },
  ])
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
