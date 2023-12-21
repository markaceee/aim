import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { transactionHistory } from "../../api/api";
import BasicTable from "../../components/ui/BasicTable";
import WindowContainer from "../../components/ui/WindowContainer";

export const TransactionHistory = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [transactionData, setTransactionData] = useState([]);

    const headers = [
        // { label: "Id", key: "id" },
        { label: "Full name", key: "fullName" },
        { label: "Email", key: "email" },
        { label: "Address", key: "address" },
        { label: "Payment mode", key: "channelCode" },
        { label: "Amount", key: "amount" },
        { label: "Status", key: "status" },
    ];
    const columns = [];
    headers.map((item) => {
        columns.push({
            header: item.label,
            accessorKey: item.key,
            footer: item.label,
        });
    });


    const formattedCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    }

    const handleClick = () => {

        try {
            transactionHistory(startDate.toISOString(), endDate.toISOString())
                .then(res => {

                    console.log(res)

                    const updatedData = res.map(prev => ({
                        ...prev,
                        fullName: 'Test',
                        email: 'test@gmail.com',
                        address: 'test address',
                        amount: formattedCurrency(prev.amount)
                    }))

                    setTransactionData(updatedData)
                });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full'>
            <WindowContainer headerTitle="Transaction History">

                <div className='p-3 w-full overflow-x-scroll'>

                    <div className="flex gap-2 items-center ">
                        <div className="flex gap-2 items-center mb-2">
                            <label htmlFor="">Start Date: </label>
                            <DatePicker
                                className="border-2 border-solid"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <label htmlFor="">End Date: </label>
                            <DatePicker
                                className="border-2 border-solid"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>
                        <button className="px-5 py-2 rounded-lg bg-blue-500 text-white ml-5" onClick={handleClick}>Search</button>
                    </div>

                    {
                        <BasicTable data={transactionData} columns={columns} />
                    }
                </div>

            </WindowContainer>
        </div>
    )
}
