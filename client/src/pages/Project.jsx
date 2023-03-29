import React from 'react'
import { useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
//useParams is used to work with the id of the project in the url

import { GET_PROJECT } from '../queries/ProjectQueries'

export default function Project() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_PROJECT, { 
        variables: { id }
    });

    if (loading) {
        return <p>loading...</p>
    }

    if (error) {
        return <p>Something went wrong, try again later.</p>
    }

    return (
        { !loading && !error && (
            <div className="mx-auto w-75 card p-5"></div>
        )}
    )
}
