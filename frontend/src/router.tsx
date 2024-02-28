import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './views/Login'
import Signup from './views/Signup'
import Users from './views/Users'
import NotFound from './views/NotFound'
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'
import Dashboard from './views/Dashboard'
import UserForm from './views/UserForm'
import Products from './views/Products'
import ProductForm from './views/ProductForm'
const router = createBrowserRouter([
  //Utilizaremos o Outlet do router para renderizar os filhos contendo um layout do pai
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        //Obrigo renderização pra rota users
        path: '/',
        element: <Navigate to="/users" />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />,
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/create',
        element: <ProductForm key="productCreate" />,
      },
      {
        path: '/products/:id',
        element: <ProductForm key="productUpdate" />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login', // quando o usuário acessar caminho da rota
        element: <Login />, //chama a página
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
