import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../api/axios'
import { useContexto } from '../contexts/ContextProvide'
export default function ProductForm() {
  const { id } = useParams()
  const [erro, setErro] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setNotification} = useContexto();
  const [product, setProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    coust: '',
    category: '',
  })

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient
        .get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setProduct(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (product.id) {
      axiosClient
        .put(`/products/${product.id}`, product)
        .then(() => {
          setNotification('Produto atualizado com sucesso')
          navigate('/products')
        })
        .catch((err) => {
          const response = err.response
          if (response && response.status === 422) {
            setErro(response.data.errors)
          }
        })
    } else {
      axiosClient
        .post('/products', product)
        .then(() => {
          setNotification('Produto criado com sucesso')
          navigate('/products')
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
      {product.id && <h1>Editar: {product.name}</h1>}
      {product.id == null && <h1>Novo Produto</h1>}
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
              value={product.name}
              onChange={(ev) => setProduct({ ...product, name: ev.target.value })}
              placeholder="Nome"
            />
            <input
              value={product.description}
              onChange={(ev) => setProduct({ ...product, description: ev.target.value })}
              placeholder="Descrição"
            />
            <input
              type="text"
              value={product.category}
              onChange={(ev) => setProduct({ ...product, category: ev.target.value })}
              placeholder="Categoria"
            />
                        <input
              type="text"
              value={product.coust}
              onChange={(ev) =>
                setProduct({
                  ...product,
                  coust: ev.target.value,
                })
              }
              placeholder="Preço Final"
            />
            <input
              type="text"
              value={product.price}
              onChange={(ev) =>
                setProduct({
                  ...product,
                  price: ev.target.value,
                })
              }
              placeholder="Preço Final"
            />
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </div>
  )
}
