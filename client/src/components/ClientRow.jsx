import React from 'react'
import { useMutation } from '@apollo/client'

import { DELETE_CLIENT } from '../mutations/ClientMutations'
import { GET_CLIENTS } from '../queries/ClientQueries';

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        update(cache, { date: { deleteClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery
        }
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.phone}</td>
            <td>{client.email}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={deleteClient}>Delete Client</button>
            </td>
        </tr>
    )
}
