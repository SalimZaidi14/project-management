import React from 'react'
import { gql, useQuery } from '@apollo/client'

import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../queries/ClientQueries';


export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Something went wrong, please try again...</p>
    }

    return (
        <>
            {!loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map(client => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
