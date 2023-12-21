import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paypal from "../../utils/paypal";
const Paypal = () => {
    const [total, setTotal] = useState("");
    const [currency, setCurrency] = useState("")
    const [method, setPaymentMethod] = useState("")
    const [intent, setIntent] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            price: total,
            currency: currency,
            method: method,
            intent: intent,
            description: description
        }
    
        await paypal
            .post("", obj)
            .then(response => {
                response.data !== "failed" ? window.location.replace(response.data) : navigate("/paypal");
            })
            .catch(e => console.log(e))

    }


    return (
        <div>

            <form onSubmit={handleSubmit} className='w-full p-20'>
                <h1 className='text-lg mb-4 text-center uppercase '>Payment</h1>
                <div className='flex items-center gap-2 p-4'>
                    <label htmlFor="" className='w-full'>Total
                        <input type="text" onChange={e => setTotal(e.target.value)} className='bg-slate-100 w-full' />
                    </label>
                </div>
                <div className='flex items-center gap-2 p-4'>
                    <label htmlFor="" className='w-full'>Currency
                        <input type="text" onChange={e => setCurrency(e.target.value)} className='bg-slate-100 w-full' />
                    </label>
                </div>
                <div className='flex items-center gap-2 p-4'>
                    <label htmlFor="" className='w-full'>Payment Method
                        <input type="text" onChange={e => setPaymentMethod(e.target.value)} className='bg-slate-100 w-full' />
                    </label>
                </div>
                <div className='flex items-center gap-2 p-4'>
                    <label htmlFor="" className='w-full'>Intent
                        <input type="text" onChange={e => setIntent(e.target.value)} className='bg-slate-100 w-full' />
                    </label>
                </div>
                <div className='flex items-center gap-2 p-4 '>
                    <label htmlFor="" className='w-full '>Payment Description
                        <input type="text" onChange={e => setDescription(e.target.value)} className='bg-slate-100 w-full' />
                    </label>
                </div>
                <button type='submit' className='bg-slate-700 text-white w-full py-4 rounded-md mt-3'> Checkout</button>
            </form>
        </div>
    )
}

export default Paypal
