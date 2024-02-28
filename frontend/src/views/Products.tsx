import { useEffect, useState } from 'react'
import axiosClient from '../api/axios'
import { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContexto } from '../contexts/ContextProvide'

export default function Products() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { setNotification } = useContexto();

  const getProducts = () => {
    setLoading(true)
    axiosClient
      .get('/products')
      .then(({ data }) => {
        setLoading(false)
        setProducts(data)
      })
      .catch((erro: AxiosError) => {
        console.log(erro)
        setLoading(false)
      })
  }

  const onDeleteClick = (products) => {
    if (
      !window.confirm(`Tem certeza que deseja deletar o Produto ${products.name}?`)
    )
      return
    axiosClient.delete(`/products/${products.id}`).then(() => {
      setNotification('Produto excluído com sucesso!');
      getProducts()
    })
  }

  useEffect(() => {
    getProducts()
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
        <h1>Produtos</h1>
        <Link className="btn-add" to="/products/create">
          Novo
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Custo</th>
              <th>Preço</th>
              <th>Lucro em R$</th>
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
              {products.map((products) => (
                <tr key={products.id}>
                  <td>{products?.id}</td>
                  <td>{products?.name}</td>
                  <td>{products?.category}</td>
                  <td>{products?.description}</td>
                  <td>{products?.coust}</td>
                  <td>{products?.price}</td>
                  <td>{(products?.price - products?.coust).toFixed(2) + " R$"}</td>
                  <td>
                    <Link className="btn-edit" to={'/products/' + products.id}>
                      Editar
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(products)}
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
