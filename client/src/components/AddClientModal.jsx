import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import  { ADD_CLIENT } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/ClientQueries';

export default function AddClientModal() {
    //we will initialize the state for the name, email and phone number of the client
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            });
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        //validation 
        if (name==="" || email==="" || phone==="") {
            return alert('Please fill in all fields');
        }

        addClient(name, email, phone)
        //we will then set it to null
        setName('')
        setEmail('')
        setPhone('')
    }

    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                Add Client 
            </button>

            <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label> 
                                    <input className="form-control" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                </div>

                                <button className="btn btn-secondary" type="submit" data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}