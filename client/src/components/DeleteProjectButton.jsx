import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_PROJECT } from '../mutations/ProjectMutations'
import { GET_PROJECTS } from '../queries/ProjectQueries'
import { useMutation } from '@apollo/client'

export default function DeleteProjectButton({ project }) {

    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: project.id },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }]
    })

    return (
        <div className="mb-3">
            <button className="btn btn-danger m-2" onClick={deleteProject}>Delete</button>
        </div>
    )
}
