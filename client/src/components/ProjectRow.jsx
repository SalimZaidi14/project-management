import React from 'react'

export default function ProjectRow({ project }) {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.status}</td>
            <td>{project.description}</td>
        </tr>
    )
}
