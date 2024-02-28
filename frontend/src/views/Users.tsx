import { useEffect, useState } from 'react'
import axiosClient from '../api/axios'
import { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContexto } from '../contexts/ContextProvide'

export default function Users() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const { setNotification } = useContexto();

  const getUsers = () => {
    setLoading(true)
    axiosClient
      .get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
        // console.log(data)
      })
      .catch((erro: AxiosError) => {
        console.log(erro)
        setLoading(false)
      })
  }

  const onDeleteClick = (users) => {
    if (
      !window.confirm(`Tem certeza que deseja deletar o usuário ${users.name}?`)
    )
      return
    axiosClient.delete(`/users/${users.id}`).then(() => {
      setNotification('Usuário excluído com sucesso!');
      getUsers()
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Usuários</h1>
        <Link className="btn-add" to="/users/new">
          Novo
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  <span className="loader"></span>
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map((users) => (
                <tr key={users.id}>
                  <td>{users?.id}</td>
                  <td>{users?.name}</td>
                  <td>{users?.email}</td>
                  <td>{users?.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + users.id}>
                      Editar
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(users)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}
