import MainLayout from "./layouts/MainLayout.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// Auth
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
// User
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

const App = () => {
  const { user } = useAuthContext()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={user ? <HomePage /> : <LoginPage />}/>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path="/profile/:id" element={user ? <ProfilePage /> : <LoginPage />} />
        {/* Auth */}
        <Route index path="/login" element={!user ?  <LoginPage /> : <Navigate to='/home' />} />
        <Route path="/signup" element={!user ?  <SignupPage /> : <Navigate to='/home' />} />
      </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App