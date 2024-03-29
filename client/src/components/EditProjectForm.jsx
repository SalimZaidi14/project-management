import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { GET_PROJECT } from '../queries/ProjectQueries'
import { UPDATE_PROJECT } from '../mutations/ProjectMutations';

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('new');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables:{id: project.id, name, description, status},
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id }}]
    })

    const onSubmit = (e) => {
        if (!name || !description || !status) {
            alert('Please fill out the name and description and status');
        }

        updateProject();
    }

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
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
                    <label className="form-label">Client</label>
                    <select className="form-select" id="client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div> */}

                <button className="btn btn-primary" type="submit" data-bs-dismiss="modal">Submit</button>
            </form>
        </div>
    )
}
