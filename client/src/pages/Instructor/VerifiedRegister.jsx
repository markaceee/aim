import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, FormControl, Input, InputGroup, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteToken, register, verifiedApplicationForm } from '../../api/api';

const VerifiedRegister = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        nickName: '',
        skypeId: '',
        gender: '',
        internetConnection: '',
        arriveAtWebsite: '',
        role: "INSTRUCTOR"
    });
    const [error, setError] = useState(false);
    const isError = formData.firstName === '';

    useEffect(() => {
        if (token !== null) {
            verifiedApplicationForm(token)
                .then(res => {
                    setFormData(prevData => ({
                        ...prevData,
                        email: res.email,
                        password: res.password
                    }))
                })
                .catch(e => navigate("/404"));
        }else{
            navigate("/404")
        }
    }, [])

    const handleDateOfBirthChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            dateOfBirth: {
                ...prevData.dateOfBirth,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        if (!isError) {
            try {
                // console.log(formData)
                const registrationResponse = await register(formData);
                console.log("Registered");
                console.log(registrationResponse)
                if (registrationResponse) {
                    await deleteToken(token);
                    console.log("Token deleted");
                    navigate("/instructor");
                }
            } catch (error) {
                console.log("Error during registration or token deletion:", error);
            }
        } else {
            setError(true)
        }

    }

    return (
        <Box height='100%'>
            <Box w={'100%'} h={'12rem'} bg={'#3371BC'} p='.5rem' position='relative' display='flex' alignItems='end'>
                <Box p='1.5rem' fontSize='3rem' fontWeight='bold' color='bg.900'>
                    <p>Resend Confirmation Instructions</p>
                </Box>
            </Box>


            <Box w={'100%'} display={'flex'} justifyContent={'center'} bg='gray.200' h='70%' p='3rem'>
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
                                        First Name
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg={'white'} size={'sm'} type='text' placeholder='Enter First name' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                    </Box>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Last Name
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg={'white'} size={'sm'} type='text' placeholder='Enter Last name' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                    </Box>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Nickname
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg={'white'} size={'sm'} type='text' placeholder='Enter Nickname' value={formData.nickName} onChange={(e) => setFormData({ ...formData, nickName: e.target.value })} />
                                    </Box>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Skype
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Input bg={'white'} size={'sm'} type='text' placeholder='Enter Sype ID' value={formData.skypeId} onChange={(e) => setFormData({ ...formData, skypeId: e.target.value })} />
                                    </Box>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Sex
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Select placeholder='Select Option' size='sm' bg='white' value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                            <option value='MALE'>Male</option>
                                            <option value='FEMALE'>Female</option>
                                        </Select>
                                    </Box>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Date of Birth
                                    </Box>
                                    <Flex w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'} gap='1rem'>
                                        <Select placeholder='Year' size='sm' bg='white' >
                                            <option value='1990'>1990</option>
                                        </Select>
                                        <Select placeholder='Month' size='sm' bg='white' >
                                            <option value='January'>January</option>
                                        </Select>
                                        <Select placeholder='Date' size='sm' bg='white' >
                                            <option value='1'>1</option>
                                        </Select>
                                    </Flex>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'}>
                                        Internet Connection
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Select placeholder='Select option' size='sm' bg='white' value={formData.internetConnection} onChange={(e) => setFormData({ ...formData, internetConnection: e.target.value })}>
                                            <option value='FIBER'>Fiber</option>
                                        </Select>
                                    </Box>
                                </InputGroup>
                                <InputGroup display={'flex'} alignItems={'center'} mt='.2rem'>
                                    <Box p={'1rem'} w={'15rem'} h={'3rem'} bg={'blue.100'} display={'flex'} alignItems={'center'} lineHeight='1rem'>
                                        How did you arrive at this website?
                                    </Box>
                                    <Box w={'100%'} px='.8rem' py='.5rem' bg={'gray.200'}>
                                        <Select placeholder='Select option' size='sm' bg='white' value={formData.arriveAtWebsite} onChange={(e) => setFormData({ ...formData, arriveAtWebsite: e.target.value })}>
                                            <option value='Others'>Others</option>
                                        </Select>
                                    </Box>
                                </InputGroup>
                            </FormControl>

                            <Box w={'100%'} bg={'gray.200'} mt='1rem' p='1rem'>
                                <Box display='flex' justifyContent='center'>
                                    <Button type='submit' colorScheme='blue' px='3rem'>Sign up</Button>
                                </Box>
                            </Box>

                            <Flex w='100%' flexDirection='column' mt='1rem' color='blue.300'>
                                {/* <Link>* Sign in</Link>
                                <Link>* Forgot your password?</Link>
                                <Link>* Didn't receive confirmation insturctions?</Link> */}
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

export default VerifiedRegister
