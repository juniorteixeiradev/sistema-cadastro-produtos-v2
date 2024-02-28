import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../api/axios'
import { useContexto } from '../contexts/ContextProvide'
export default function UserForm() {
  const { id } = useParams()
  const [erro, setErro] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setNotification} = useContexto();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUser(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('Usuário atualizado com sucesso')
          navigate('/users')
        })
        .catch((err) => {
          const response = err.response
          if (response && response.status === 422) {
            setErro(response.data.errors)
          }
        })
    } else {
      axiosClient
        .post('/users', user)
        .then(() => {
          setNotification('Usuário criado com sucesso')
          navigate('/users')
        })
        .catch((err) => {
          const response = err.response
          if (response && response.status === 422) {
            setErro(response.data.errors)
          }
        })
    }
  }

  return (
    <div>
      {user.id && <h1>Editar: {user.name}</h1>}
      {user.id == null && <h1>Novo Usuário</h1>}
      <div className="card animated fadeInDown">
        {loading && <span className="loader"></span>}
        {erro && (
          <div className="alert">
            {Object.keys(erro).map((key) => (
              <p key={key}>{erro[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              placeholder="Nome"
            />
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
              placeholder="Senha"
            />
            <input
              type="password"
              onChange={(ev) =>
                setUser({
                  ...user,
                  password_confirmation: ev.target.value,
                })
              }
              placeholder="Confirmação de Senha"
            />
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </div>
  )
}
