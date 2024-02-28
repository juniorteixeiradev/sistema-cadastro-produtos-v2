import axiosClient from '../api/axios'
import { useContexto } from '../contexts/ContextProvide'
import { SignUpIcon } from './Icons'
import { FormEvent, useRef, useState } from 'react'

export default function Signup() {
  const [erro, setErro] = useState()
  const nameRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const confirmPassRef = useRef<HTMLInputElement>()
  const { setUser, setToken } = useContexto()

  function onSubmit(ev: FormEvent) {
    const payload = {
      name: nameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      password_confirmation: confirmPassRef?.current?.value,
    }

    ev.preventDefault()
    console.log(payload)
    axiosClient
      .post('/signup', payload)
      .then(({ data }) => {
        setUser(data?.user)
        setToken(data?.token)
      })
      .catch((erro) => {
        const response = erro.response

        if (response && response.status === 422) {
          console.log(response.data.errors)
          setErro(response.data.errors)
        }
      })
  }

  return (
    <div className="form">
      <h1 className="title">Registre-se</h1>
      <div id="svg">
        <SignUpIcon />
      </div>

      <form onSubmit={onSubmit}>
        {erro && (
          <div className="alert">
            {Object.keys(erro).map((i) => (
              <p key={i}>{erro[i][0]}</p>
            ))}
          </div>
        )}
        <input type="text" ref={nameRef} placeholder="Seu Nome" />
        <input type="email" ref={emailRef} placeholder="Email" />
        <input type="password" ref={passwordRef} placeholder="Senha" />
        <input
          type="password"
          ref={confirmPassRef}
          placeholder="Confirme a Senha"
        />
        <button className="btn btn-block">Cadastrar!</button>
        <p style={{ padding: '0.5rem' }}>
          Possui uma conta? <a href="/login">Entrar!</a>
        </p>
      </form>
    </div>
  )
}
