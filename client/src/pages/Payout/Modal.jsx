import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { payout } from '../../api/api';

export default function Modal({ openModal, setOpenModal, user }) {
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const [disbursement, setDisbursement] = useState({
        referenceId: user.id,
        channelCode: '',
        channelProperties: {
            account_number: "09999999999",
            account_holder_name: `${user.firstName}${user.middleName ? ` ${user.middleName}` : ''} ${user.lastName}`
        },
        amount: null, // Change this to a default number or null
        description: "Test",
        currency: "PHP",
        receiptNotification: {
            emailTo: [
                user.email
            ]
        }
    });

    const cancelButtonRef = useRef(null)


    const handleConfirmPayment = async () => {
        setConfirmPayment(true);

        if (confirmPayment && confirmed) {
            console.log(disbursement)
            await payout(disbursement)
                .then(res => setOpenModal(false))
        }
    }

    const isChecked = () => {
        setConfirmed(!confirmed);
    }

    return (

        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Account Information
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <tr>
                                                    <td className='border-none font-bold'> Name:</td>
                                                    <td className='border-none capitalize'>  {user.lastName}, {user.firstName} {user.middleName}</td>
                                                </tr>
                                                <tr>
                                                    <td className='border-none font-bold'> Account number:</td>
                                                    <td className='border-none capitalize'>09111111111</td>
                                                </tr>
                                                <tr>
                                                    <td className='border-none font-bold'> Number of course:</td>
                                                    <td className='border-none capitalize'> 5</td>
                                                </tr>
                                                <tr>
                                                    <td className='border-none font-bold'> Total:</td>
                                                    <td className='border-none capitalize'>
                                                        {
                                                            confirmPayment ?
                                                                (<p>{disbursement.amount}</p>) : (<input
                                                                    className='border-1 border-solid rounded'
                                                                    type="text"
                                                                    placeholder="Total amount"
                                                                    value={disbursement.amount}
                                                                    onChange={((e) => {
                                                                        const decimalCount = (e.target.value.replace(/[^\d.]/g, '').match(/\./g) || []).length;
                                                                        if (decimalCount > 1) {
                                                                            return;
                                                                        }

                                                                        setDisbursement(prev => ({
                                                                            ...prev,
                                                                            amount: e.target.value.replace(/[^\d.]/g, '')
                                                                        }))
                                                                    })}
                                                                />
                                                                )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='border-none font-bold'> Payment mode: </td>
                                                    <td className='border-none'>
                                                        {confirmPayment ? (<p> {disbursement.channelCode == "PH_GCASH" ? "GCASH" : "BPI"} </p>) : (
                                                            <select name="" id="" className='w-full border-1 border-solid rounded' onChange={
                                                                (e) => {
                                                                    setDisbursement(prev => ({
                                                                        ...prev,
                                                                        channelCode: e.target.value
                                                                    }))
                                                                }}>
                                                                <option value="">Select payment</option>
                                                                <option value="PH_GCASH">Gcash</option>
                                                                <option value="BA_BPI">BPI</option>
                                                            </select>
                                                        )}
                                                    </td>
                                                </tr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    confirmPayment && (
                                        <div className='px-6 text-sm'>
                                            <p className='text-center'>
                                                Confirm transactions will not be refunded. Please make sure that the account number and amount are correct
                                            </p>
                                            <div className='flex mt-2 justify-center items-center gap-2 italic'>
                                                <input
                                                    type="checkbox"
                                                    checked={confirmed}
                                                    onChange={(e) => setConfirmed(!confirmed)}
                                                    className='border-2 border-solid'
                                                />
                                                <p>I confirm that the details are correct.</p>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        disabled={!isChecked}
                                        type="button"
                                        className={"inline-flex w-full justify-center rounded-md " + (confirmed ? "bg-blue-600" : "bg-blue-500") + " px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"}
                                        onClick={handleConfirmPayment}
                                    >
                                        Payout
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpenModal(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}