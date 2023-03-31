import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_PROJECT } from '../mutations/ProjectMutations';
import { GET_PROJECTS } from '../queries/ProjectQueries';
import { GET_CLIENTS } from '../queries/ClientQueries';

export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('');

    //We will query the clients so that we can use them in the select option
    const { loading, error, data } = useQuery(GET_CLIENTS);

    // const [addClient] = useMutation(ADD_CLIENT, {
    //     variables: { name, email, phone },
    //     update(cache, { data: { addClient } }) {
    //         const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //         cache.writeQuery({
    //             query: GET_CLIENTS,
    //             data: { clients: [...clients, addClient] }
    //         });
    //     }
    // });


    const onSubmit = (e) => {
        e.preventDefault();
        //validation 
        if (name==="" || description==="" || status==="") {
            return alert('Please fill in all fields');
        }

        //we will then set it to null
        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    }

    if (loading) return <p>Loading...</p>

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                Add Project
            </button>

            <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label> 
                                    <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Client Id</label> 
                                    <input className="form-control" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                </div> */}

                                <button className="btn btn-primary" type="submit" data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
