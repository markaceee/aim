import React, { useState } from 'react';
import { applicationForm } from '../../api/api';

const InstructorRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.email !== '' && formData.password !== '' && formData.confirmPassword !== '')
            formData.password === formData.confirmPassword
                ? applicationForm(formData)
                : console.log("Password not matched")
    }





    return (
        <div className="w-full h-screen">
            <div className="bg-blue-400 h-32 text-center flex items-center justify-center">
                <h1 className="text-lg">INSTRUCTOR</h1>
            </div>

            <div className="login h-3/4 flex justify-center lg:items-center w-full p-6">
                <div className="lg:w-3/4 sm:w-full">
                    <div className="login">
                        <div className="p-3 bg-blue-500 text-white">
                            <h1>Please enter matters of relevant below.</h1>
                        </div>
                        <div className="bg-white p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="flex mb-1">
                                    <label
                                        htmlFor="email"
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Email
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-1">
                                    <label
                                        htmlFor="email"
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Password
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-10">
                                    <label
                                        htmlFor="email"
                                        className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                                    >
                                        Password confirmation
                                    </label>
                                    <div className="bg-gray-400 p-3 w-full">
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full p-3"
                                            onChange={e => setFormData(prevState => ({ ...prevState, confirmPassword: e.target.value }))}
                                        />
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
                        <div>
                            <a href="" className='w-full inline-block'>* Sign in</a>
                            <a href="" className='w-full inline-block'>* Forgot your password?</a>
                            <a href="" className='w-full inline-block'>* Didn't receive confirmation instructions?</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header bg-blue-950 w-full h-20 text-center flex items-center justify-center absolute bottom-0">
                <h1 className="text-lg text-white">FOOTER</h1>
            </div>
        </div>
    )
}

export default InstructorRegister
