import { Alert, AlertDescription, AlertIcon, Box, Button, Checkbox, Flex, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../api/auth'

const Login = ({ decodedToken, isExpired }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const [show, setShow] = useState(false)
  const showPassword = () => setShow(!show)

  const [error, setError] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isError = !emailPattern.test(email);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!isError) {
      console.log("test")
      await login(email, pass)
        .then((res) => {
          navigate("/dashboard");
          window.location.reload();
        })
        .catch((e) => {
          setError(true);
          console.log(e);
        });
    }


  };

  useEffect(() => {
    if (decodedToken != null && !isExpired) {
      navigate(-1);
    }
  }, [decodedToken, isExpired]);

  return (
    <Box height='100vh'>
      <Box w={'100%'} h={'10rem'} bg={'orange.100'} p='.5rem'>
        <Box w='20rem' h='100%' bg='blue.600' fontSize='sm' p='1rem' alignItems='center' display='flex' color='white'>
          <p>Admin login</p>
        </Box>
      </Box>


      <Box w={'100%'} height='70%' p={'5rem'} display={'flex'} justifyContent={'center'} bg={'gray.200'}>
        <Box w={'50rem'}>

          {
            error && (
              <Alert status='warning' display='flex' justifyContent='center' mb={3}>
                <AlertIcon />
                <Box >
                  <AlertDescription>
                    Bad credentials!
                  </AlertDescription>
                </Box>
              </Alert>
            )
          }


          <Box boxShadow="md" borderBottomRadius='.5rem'>
            <Box p={'.5rem'} bg={'blue.600'} color='white'>
              <p>Email</p>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box p={'1.5rem'} bg={'white'} borderBottomRadius='.5rem'>
                <FormControl isInvalid={isError}>
                  <InputGroup display={'flex'} alignItems={'center'}>
                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                      Email
                    </Box>
                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                      <Input bg={'white'} size={'sm'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                    </Box>
                  </InputGroup>

                  <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                      Password
                    </Box>
                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                      <Input bg="white" size="sm" type={show ? 'text' : 'password'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Password" />
                      <InputRightElement width="7rem" height='3rem'>
                        <Button h="1rem" size="sm" onClick={showPassword}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </Box>
                  </InputGroup>
                </FormControl>

                <Box w={'100%'} h={'10rem'} bg={'gray.200'} mt='1rem' p='1rem'>
                  <Box display='flex' justifyContent='center'>
                    <Button type='submit' colorScheme='blue' px='3rem'>Login</Button>
                  </Box>
                  <Box display='flex' justifyContent='center' mt='.5rem'>
                    <Checkbox defaultChecked>Remember me</Checkbox>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>

        </Box>
      </Box>
      <Box w={'100%'} h={'8rem'} bg={'blue.900'} position={'relative'} bottom={'0'} p='1.5rem' color='gray.400' display='flex' alignItems='center' justifyContent='space-between' fontSize='.8rem'>
        <Flex>
          <a className='border-r px-3'>aim-talk top page</a>
          <a className='border-r px-3'>Terms of Use</a>
          <a className='border-r px-3'>Privacy Policy</a>
          <a className='border-r px-3'>Contact Us</a>
          <a className='px-3'>Frequently Ask Question</a>
        </Flex >
        <a> Copyright * 2024 aim-talk. All rights reserved </a>
      </Box>
    </Box>

  )
}
export default Login;