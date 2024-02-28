import { FormEvent, useContext, useRef, useState } from 'react'
import { FingerPrintIcon } from './Icons'
import axiosClient from '../api/axios'
import { useContexto } from '../contexts/ContextProvide'
export default function Login() {
  const [erro, setErro] = useState()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const { setToken, setUser } = useContexto()


  function onSubmit(ev: FormEvent) {
    const payload = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    }
    setErro(null)
    ev.preventDefault()

    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        console.log(data);
        setUser(data?.user)
        setToken(data?.token)
      })
      .catch((erro) => {
        const response = erro.response
        console.log(response)
        if (response && response.status === 422) {
          console.log(response.data.errors)
          if (response.data.errors) {
            setErro(response.data.errors)
          } else {
            setErro({
              email: [response.data.message],
            })
          }
        }
      })
  }

  return (
    <div className="form">
      {erro && (
        <div className="alert">
          {Object.keys(erro).map((i) => (
            <p key={i}>{erro[i][0]}</p>
          ))}
        </div>
      )}
      <h1 className="title">Login</h1>
      <div id="svg">
        <FingerPrintIcon />
      </div>

      <form onSubmit={onSubmit}>
        <input type="email" ref={emailRef} placeholder="Email" />
        <input type="password" ref={passwordRef} placeholder="Senha" />
        <button className="btn btn-block">Entrar!</button>
        <p style={{ padding: '0.5rem' }}>
          Não possui uma contra? Clique <a href="/signup">aqui</a> e Crie uma!
        </p>
      </form>
    </div>
  )
}
