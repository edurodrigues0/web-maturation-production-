import * as yup from 'yup'

import { Layout } from '../layout'

import cheeseImage from '../assets/cheese.jpg'
import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { IoMdReturnLeft } from 'react-icons/io'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/ui/button'

type LoginFormData = {
  email: string
  password: string
}

const validationLoginFormSchema = yup.object().shape({
  email: yup.string().email().required('Informe seu e-mail'),
  password: yup.string().required('Informe sua senha'),
})

export function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationLoginFormSchema),
  })

  function handleSignIn(data: LoginFormData) {
    const { email, password } = data
    signIn(email, password)
    return navigate('/dashboard')
  }

  return (
    <Layout>
      <div className="h-full w-full grid grid-cols-2 gap-4">
        <div className="flex flex-1 items-center justify-center flex-col">
          <div className="text-center">
            <h1 className="text-4xl">Bem-Vindo!</h1>
            <span className="text-gray-400">Entre com suas credenciais</span>
          </div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col mt-6 gap-5"
          >
            <Input
              title="email"
              label="Email"
              type="email"
              error={errors.email}
              {...register('email')}
            />

            <Input
              title="password"
              label="Senha"
              type="password"
              error={errors.password}
              {...register('password')}
            />

            <Button type="submit" className="mt-4" disabled={isSubmitting}>
              Entrar
            </Button>

            <Button onClick={() => navigate('/')} variant="destructive">
              <IoMdReturnLeft size={22} />
            </Button>
          </form>
        </div>

        <div className="m-10 flex flex-1 rounded-md overflow-hidden">
          <img
            src={cheeseImage}
            alt="imagem do queijo parmesão"
            className="flex flex-1"
          />
        </div>
      </div>
    </Layout>
  )
}
