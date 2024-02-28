import { ReactNode, createContext, useContext, useState } from 'react'

interface userInterface {
  name?: string,
  id?: number, 
  email?: string,

}



const Contexto = createContext({
  user: null,
  setUser: (arg: Object) => {},

  product: null,
  setProduct: (arg: Object) => {},

  token: null,
  setToken: (arg: String | any) => {},

  notification: null,
  setNotification: () => {}
})

export default function ContextoProvider({
  children,
}: {
  children: ReactNode
}) {
  const[notification, _setNotification] = useState('');
  const [user, setUser] = useState<userInterface>({})
  const [product, setProduct] = useState({})
  const [token, _setToken] = useState(
    localStorage.getItem('ACESS_TOKEN'),
  )
  const setNotification = (msg:string) =>{
    _setNotification(msg)

    setTimeout(() => {
      _setNotification('')
    }, 3000);
    
  }
  const setToken = (token: string) => {
    _setToken(token)

    if (token) {
      localStorage.setItem('ACESS_TOKEN', token)
    } else {
      localStorage.removeItem('ACESS_TOKEN')
    }
  }

  return (
    <Contexto.Provider value={{ user, setUser, token, setToken, notification, setNotification, product, setProduct }}>
      {children}
    </Contexto.Provider>
  )
}

export const useContexto = () => useContext(Contexto)
