import React from 'react'

export default function ProjectRow({ project }) {

    // const [deleteProject] = useMutation(DELETE_PROJECT, {
    //     variables: { id: project.id },
    //     update(cache, { data: { deleteProject } }) {
    //         const { projects } = cache.readQuery({ query: GET_PROJECTS })
    //         cache.writeQuery({
    //             query: GET_PROJECTS,
    //             data: { projects: projects.filter((project) => project.id !== deleteProject.id)}
    //         })
    //     }
    // })

    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.status}</td>
            <td>{project.description}</td>
            <td>
                <a class="btn btn-white" href={`/project/${project.id}`}>View</a>
            </td>
        </tr>
    )
}
