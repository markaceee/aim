import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { transactionHistory } from "../../api/api";
import ExportCsv from "../../components/export-csv/ExportCsv";
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

    const handleClearSearch = () => {
        setStartDate();
        setEndDate();
        setTransactionData([])
    };


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
                <div className="sub-header flex px-9 py-6">
                    <ExportCsv
                        data={transactionData}
                        headers={headers}
                        filename={"test"}
                        exportName={"Export"}
                        textColor="text-white"
                        bgColor="bg-[#1A6EB5]"
                    />
                </div>
                <div className="px-9 pb-6">
                    <div className="mb-6">
                        <WindowContainer headerTitle="Search transaction by date">
                            <div className='p-3 w-full overflow-x-scroll'>
                                <div className="w-full flex justify-center gap-6">
                                    <div className="flex gap-2 items-center mb-2">
                                        <label htmlFor="">Start Date: </label>
                                        <DatePicker
                                            className="outline outline-0 rounded-sm"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <label htmlFor="">End Date: </label>
                                        <DatePicker
                                            className="outline outline-0 rounded-sm"
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                        />
                                    </div>
                                </div>

                                <div className="mx-auto my-2 flex justify-center gap-x-2 p-3 w-10/12 bg-[#f1f1f1]">
                                    <button
                                        onClick={handleClearSearch}
                                        className="bg-[#1A6EB5] text-white px-2 py-1 rounded-sm w-1/4"
                                    >
                                        Clear Search
                                    </button>
                                    <button
                                        onClick={handleClick}
                                        type="submit"
                                        className="bg-[#1A6EB5] text-white px-2 py-1 rounded-sm w-1/4"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </WindowContainer>
                    </div>

                    <WindowContainer headerTitle="Search result">
                        <BasicTable data={transactionData} columns={columns} />
                    </WindowContainer>
                </div>
            </WindowContainer>
        </div>
    )
}
