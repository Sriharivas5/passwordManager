import { Outlet, Navigate } from "react-router"

const ProtectedRoutes = () => {
  let data = sessionStorage.getItem("isUserLoddedIn")
  const user = data
  console.log(user)
  return user ? <Outlet /> : <Navigate to="/login"></Navigate>
}

export default ProtectedRoutes
