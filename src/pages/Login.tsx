import * as yup from 'yup'

import { Box, Button, Flex, Heading, IconButton, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Layout } from '../layout'

import cheeseImage from '../assets/cheese.jpg'
import { Input } from '../components/Form/Input'
import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { IoMdReturnLeft } from 'react-icons/io'

type LoginFormData = {
  email: string
  password: string
}

const validationLoginFormSchema = yup.object().shape({
  email: yup.string().email().required('Informe seu e-mail'),
  password: yup.string().required('Informe sua senha')
})

export function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: yupResolver(validationLoginFormSchema)
  })

  function handleSignIn(data: LoginFormData) {
    const { email, password } = data
    signIn(email, password)
    return navigate('/dashboard')
  }

  return (
    <Layout>
      <Flex
        w="100%"
        h="100%"
        px="1rem"
      >
        <Flex
          flex={1}
          bg="blackAlpha.200"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          p="1rem"
        >
          <Box
            textAlign="center"
          >
            <Heading
              color="purple.700"
              fontSize="2.5rem"
            >
              Bem-vindo!
            </Heading>
            <Text 
              as="span"
              color="gray.500"
            >
              Entre com suas credenciais
            </Text>
          </Box>
          <Flex
            as="form"
            flexDir="column"
            mt="1.5rem"
            gap="0.5rem"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Input 
              title="email"
              label="Email"
              type="email"
              error={errors.email}
              {...register("email")}
            />

            <Input 
              title="password"
              label="Senha"
              type="password"
              error={errors.password}
              {...register("password")}
            />

            <Button
              mt="1rem"
              colorScheme="purple"
              type="submit"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>

            <IconButton 
              aria-label="Voltar"
              colorScheme="red"
              onClick={() => navigate('/')}
              icon={<IoMdReturnLeft size={22} />}
            />
          </Flex>
        </Flex>
        { isWideVersion && (
          <Image
            src={cheeseImage}
            w="50%"
            brightness={0.7}
          />
        )}
      </Flex>
    </Layout>
  )
}