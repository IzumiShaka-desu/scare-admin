import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../api/apiClient';
import DefaultLoading from '../components/DefaultLoading';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import Swal from 'sweetalert2';

// create datatable to show list of user with id_user,email,name,phone,level,profile-photo(if exist) and action button to edit and delete
// create button to add new teacher

export default function Users() {
    const [users, setUsers] = useState([]);
    const isMounted = useRef(false);

    const toggleRefresh = () => {
        setRefresh(!refresh);
    }
    const confirmDelete = async (id) => {
        console.log('id', id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiClient.delete(`/auth/delete/${id}`);
                    if (response.status === 204) {
                        Swal.fire(
                            'Deleted!',
                            "User has been deleted.",
                            'success'
                        )
                        toggleRefresh();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                } catch (error) {
                    console.error('Error', error);
                    console.log(error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }

        });

    }
    const columns = [
        {
            name: 'ID',
            selector: 'id_user',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Phone',
            selector: 'phone',
            sortable: true,
        },
        {
            name: 'Level',
            selector: 'level',
            sortable: true,
        },
        // {
        //     name: 'Address',
        //     selector: 'address',
        //     sortable: true,
        // },
        {
            name: 'Profile Photo',
            selector: 'profile_photo',
            sortable: true,
            // if null "-"
            cell: row => <div>
                {row.profile_photo ? <img src={row.profile_photo} alt="profile_photo" width="100px" /> : "  -"}
            </div>,
        },
        {
            name: 'Action',
            cell: row => <div>
                {/* show edit button if level admin */}


                {/* {row.level == "admin" && <a href={`users/${row.id_user}/edit`} className="btn btn-primary">Edit</a>} */}
                &nbsp;
                <button onClick={() => confirmDelete(row.id_user)} className="btn btn-danger">Delete</button>
            </div>,
        },
    ];


    // const handleDelete = async (id) => {
    //     try {
    //         await apiClient.delete(`/users/${id}`);
    //         setRefresh(!refresh);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const [refresh, setRefresh] = useState(false);
    const fetchUsers = async () => {
        try {
            const response = await apiClient.get('auth/');
            if (isMounted.current) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        isMounted.current = true;

        fetchUsers();
        return () => {
            isMounted.current = false;
        };
    }, [refresh]);

    return (
        <div className="container">
            <Row>
                <Col >
                    <div className="">
                        <h1>Users</h1>
                        <DataTable
                            columns={columns}
                            data={users}
                            pagination
                            actions={

                                <><a href="users/add" className="btn btn-primary">Add Admin</a><button onClick={() => toggleRefresh()} className="btn btn-primary">Refresh</button></>
                            }
                            highlightOnHover
                            striped
                            responsive
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );








}