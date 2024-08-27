import MainLayout from "./layouts/MainLayout.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom"

// Auth
import LoginPage from "./pages/LoginPage.jsx"

// User
import HomePage from "./pages/HomePage.jsx"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage /> } />
      </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App