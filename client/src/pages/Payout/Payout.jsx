import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllUsers, getBalance } from '../../api/api';
import BasicTable from '../../components/ui/BasicTable';
import WindowContainer from '../../components/ui/WindowContainer';
import Modal from './Modal';

const Payout = () => {
    const [users, setUsers] = useState([]);
    const [balance, setBalance] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const headers = [
        // { label: "Id", key: "id" },
        { label: "Full name", key: "fullName" },
        { label: "Skype ID", key: "skypeId" },
        { label: "Email", key: "email" },
        { label: "Address", key: "address" },
        { label: "Date Of Birth", key: "birthDate" },
        { label: "Gender", key: "gender" },
        { label: "Picture", key: "picture" },
        { label: "Areas for Improvement", key: "areasForImprovement" },
        { label: "Action", key: "action" },
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

    useEffect(() => {
        // Fetch users and balance
        fetchAllUsers()
            .then(res => {

                const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];


                const updatedData = res.map(user => {
                    let fullName =
                        user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
                    if (user.middleName) {
                        fullName += " " + user.middleName.charAt(0).toUpperCase() + user.middleName.slice(1);
                        fullName += " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
                    }

                    let dateOfBirth;

                    if (user.dateOfBirth !== null) {
                        dateOfBirth = new Date(
                            user.dateOfBirth[0],
                            user.dateOfBirth[1] - 1,
                            user.dateOfBirth[2]
                        );
                    }

                    return {
                        id: user.id,
                        fullName,
                        birthDate: dateOfBirth ? `${months[dateOfBirth.getMonth()]
                            } ${dateOfBirth.getDate()}, ${dateOfBirth.getFullYear()}` : "",
                        ...user,
                    };
                })

                setUsers(updatedData)
            })
            .catch(error => console.error('Error fetching users:', error));

        getBalance()
            .then(res => setBalance(res))
            .catch(error => console.error('Error fetching balance:', error));
    }, []);

    const handleClick = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    }

    return (<>
        <div className='w-full'>
            <WindowContainer headerTitle="Payment">
                <div className='p-3 w-full overflow-x-scroll'>
                    <div className='mb-3 flex justify-between'>
                        <h1 className='text-lg'><span className='font-bold'>Total Balance:</span> {balance ? formattedCurrency(balance) : "Loading..."}</h1>
                        <p className='text-blue-600 underline'><Link to={"/payout/history"}>Transaction History</Link></p>
                    </div>

                    {users.length > 0 ? (
                        <BasicTable data={users} columns={columns} openModal={openModal} setOpenModal={setOpenModal} setSelectedUser={setSelectedUser} />
                    ) : (
                        <p>Loading users...</p>
                    )}
                </div>

                {openModal && (
                    <Modal openModal={openModal} setOpenModal={setOpenModal} user={selectedUser} />
                )}
            </WindowContainer >
        </div>
    </>
    )
}

export default Payout;
