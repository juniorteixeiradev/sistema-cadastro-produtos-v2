import { Navigate, Outlet } from 'react-router-dom'
import { useContexto } from '../contexts/ContextProvide'
import { Link } from 'react-router-dom'
import { FormEvent, useEffect } from 'react'
import axiosClient from '../api/axios.ts'

import { Badge, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

export default function DefaultLayout() {
  
  const { user, token, notification, setUser, setToken } = useContexto()

  //Verificação de token
  if (!token) {
    return <Navigate to="/login"></Navigate>
  }

  const onLogout = (ev: FormEvent) => {
    ev.preventDefault()
    axiosClient
      .post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axiosClient
      .get('/user')
      .then(({ data }) => {
        setUser(data)
      })
      .catch((erro) => console.log(erro))
  }, [])

  return (
    
    <div id="defaultLayout">
       <Sidebar aria-label="Sidebar with call to action button example" className='h-[100vh]'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/products" icon={HiShoppingBag}>
            Produtos
          </Sidebar.Item>
          <Sidebar.Item href="/users" icon={HiUser}>
            Usuários
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
{/* 
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      
    </Sidebar>
      {/* <aside>
        <div className=' flex flex-col gap-1 items-center justify-center text-white font-medium text-xl text-center'>
          Sistema de Gestão 2.0
        <img src='/images/information.png'className={` h-20`} />
        </div>
        
        <Link to="/dashboard"><DashboardIcon/> Dashboard</Link>
        <Link to="/products"><ProductsIcon />Produtos</Link>
        <Link to="/users">Usuários</Link>
      </aside> */}
      {notification && 
      <div className='notification'>
        {notification}
      </div>}
      <div className="content">
        <header>
          <div></div>
          <div>
            {user?.name}
            <a href="#" className="btn-logout" onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

    </div>
  )
}
