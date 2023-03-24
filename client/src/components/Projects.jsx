import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_PROJECTS } from '../queries/ProjectQueries';
import ProjectRow from './ProjectRow';

export default function Projects() {

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {
        return <p>loading...</p>
    }

    if (error) {
        return <p>Something went wrong, try again later.</p>
    }

    return (
        <>
            {data.projects.length < 0 ? (<p>No projects found</p>) : (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.projects.map(project => (
                            <ProjectRow key={project.id} project={project} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
