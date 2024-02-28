import { Outlet, Navigate } from 'react-router-dom'
import { useContexto } from '../contexts/ContextProvide'
export default function GuestLayout() {
  const { token } = useContexto()

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        <Outlet />
      </div>
      <footer style={{ textAlign: 'center' }}>
        Developed by: Junior Teixeira
      </footer>
    </>
  )
}
