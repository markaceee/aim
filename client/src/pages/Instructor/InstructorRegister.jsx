import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicationForm } from '../../api/api';

const InstructorRegister = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isError = !emailPattern.test(formData.email);
    const [show, setShow] = useState(false)
    const showPassword = () => setShow(!show)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isError && formData.email !== '' && formData.password !== '' && formData.confirmPassword !== '' && formData.password === formData.confirmPassword)
            applicationForm(formData)
                .then(response => {
                    navigate("/instructor")
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
        else
            setError(true);
    }





    return (
        <Box height='100vh'>
            <Box w={'100%'} h={'12rem'} bg={'#3371BC'} p='.5rem' position='relative' display='flex' alignItems='end'>
                <Box p='1.5rem' fontSize='3rem' fontWeight='bold' color='bg.900'>
                    <p>Application Form</p>
                </Box>
            </Box>


            <Box w={'100%'} p={'2rem'} display={'flex'} justifyContent={'center'} bg='gray.200' h='70%' alignItems='center'>
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

                    <Box p={'.5rem'} bg={'#3371BC'} color='white'>
                        <p>Please enter matters of relevant below.</p>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box p={'1.5rem'} bg={'white'}>
                            <FormControl isInvalid={isError}>
                                <InputGroup display={'flex'} alignItems={'center'}>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Email
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg={'white'} size={'sm'} type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Enter Email' />
                                    </Box>
                                </InputGroup>

                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Password
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg="white" size="sm" type={show ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Enter Password" />
                                        <InputRightElement width="7rem" height='3rem'>
                                            <Button h="1rem" size="sm" onClick={showPassword}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </Box>
                                </InputGroup>

                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Confirm Password
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg="white" size="sm" type={show ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Enter Confirm Password" />
                                    </Box>
                                </InputGroup>
                            </FormControl>

                            <Box w={'100%'} bg={'gray.200'} mt='1rem' p='1rem'>
                                <Box display='flex' justifyContent='center'>
                                    <Button type='submit' colorScheme='blue' px='3rem'>Sign up</Button>
                                </Box>
                            </Box>

                            <Flex w='100%' flexDirection='column' mt='2rem' color='blue.300'>
                                <Link>* Sign in</Link>
                                <Link>* Forgot your password?</Link>
                                <Link>* Didn't receive confirmation insturctions?</Link>
                            </Flex>
                        </Box>
                    </form>

                </Box>
            </Box>
            <Box
                w={"100%"}
                h={"8rem"}
                bg={"blue.900"}
                position={"relative"}
                bottom={"0"}
                p="1.5rem"
                color="gray.400"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                fontSize=".8rem"
            >
                <Flex>
                    <a className="border-r px-3">View the site</a>
                    <a className="border-r px-3">Terms and Conditions</a>
                    <a className="border-r px-3">Contact us for help</a>
                    <a className="px-3">Frequently Ask Question</a>
                </Flex>
                <a> Copyright * 2024 aim-talk. All rights reserved </a>
            </Box>
        </Box>
    )
}

export default InstructorRegister
