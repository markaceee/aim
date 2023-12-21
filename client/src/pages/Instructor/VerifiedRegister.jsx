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

    useEffect(() => {
        verifiedApplicationForm(token)
            .then(res => {
                setFormData(prevData => ({
                    ...prevData,
                    email: res.email,
                    password: res.password
                }))
            })
            .catch(e => navigate("/404"));
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
        try {
            const registrationResponse = await register(formData);
            console.log("Registered");
            console.log(registrationResponse)
            if (registrationResponse) {
                await deleteToken(token);
                console.log("Token deleted");
                navigate("/");
            }
        } catch (error) {
            console.log("Error during registration or token deletion:", error);
        }
    }

    return (
        <div className="w-full">
            <div className="bg-blue-400 h-32 text-center flex items-center justify-center">
                <h1 className="text-lg">Verified</h1>
            </div>

            <div className="login flex justify-center lg:items-center w-full p-6">
                <div className="lg:w-3/4 sm:w-full">
                    <div className="login">
                        <div className="p-3 bg-blue-500 text-white">
                            <h1>Please enter matters of relevant below.</h1>
                        </div>
                        <div className="bg-white p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        First name
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="text"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, firstName: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Last name
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="text"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, lastName: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Nickname
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="text"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, nickName: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Skype ID
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="text"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, skypeId: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Sex
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <select onChange={e => setFormData(prevState => ({ ...prevState, gender: e.target.value }))} value={formData.gender}>
                                            <option >Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Date of Birth
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full flex gap-3">
                                        <select name="month">
                                            <option >Select</option>
                                            <option value="january">January</option>
                                        </select>
                                        <select name="day" >
                                            <option >Select</option>
                                            <option value="25">25</option>
                                        </select>
                                        <select name="years">
                                            <option >Select</option>
                                            <option value="2052">2052</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Internet connection
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <select onChange={e => setFormData(prevState => ({ ...prevState, internetConnection: e.target.value }))} value={formData.internetConnection}>
                                            <option >Select</option>
                                            <option value="fiber" >Fiber</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex mb-10">
                                    <label
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        How did you arrive at this website?
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <select onChange={e => setFormData(prevState => ({ ...prevState, arriveAtWebsite: e.target.value }))} value={formData.arriveAtWebsite}>
                                            <option >Select</option>
                                            <option value="others" >others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-gray-400 flex justify-center items-center p-6">
                                    <div className="xl:w-1/4 sm:w-1/2">
                                        <button type='submit' className="text-center py-3 rounded bg-blue-700 text-white w-full">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header bg-blue-950 w-full h-20 text-center flex items-center justify-center">
                <h1 className="text-lg text-white">FOOTER</h1>
            </div>
        </div>
    )
}

export default VerifiedRegister
