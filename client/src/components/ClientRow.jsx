import React from 'react'
//we will bring in useMutation hook just like there is a useQuery hook
import { useMutation } from '@apollo/client'
//we will also import the actual mutation of deleteClient
import { DELETE_CLIENT } from '../mutations/ClientMutations'
//we will import the query GET_CLIENTS
import { GET_CLIENTS } from '../queries/ClientQueries';

//we will create a component here and then the props will get passed in the client
//we will destructure them and get client
export default function ClientRow({ client }) {
    //we are gonna do const and in brackets say deleteClient and set that to use mutation and then pass in the required deleteClient mutation
    //to know which client we have to delete, we will pass the values and so the second parameter of an object
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        //we pass in the variables object and set whatever we want to pass in which in this case is an id which is client we are talking about
        variables: { id: client.id },
        //there are two ways to update the ui 
        //FIRST WAY
        /*
        we will set refetchQueries to an array because you can call more than one query
        refetchQueries: [{ query: GET_CLIENTS }]
        if we keep refetching the queries we will bog down our application
        */
        //SECOND WAY
        /*
        there is a function called update and in it, we can pass in cache and here we are setting the data to response of client
        we will get the clients from the cache
        it will not make a whole new request
        then we will write to the cache  
        */

        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                //we are setting clients in our data to filter out the client that matches the id of delete
                data: {
                    clients: clients.filter((client) => client.id !== deleteClient.id),
                },
            });
        },
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.phone}</td>
            <td>{client.email}</td>
            <td>
                {/* we will pass an onclick in the button and pass in the deleteClient */}
                <button className='btn btn-danger btn-sm' onClick={deleteClient}>Delete Client</button>
            </td>
        </tr>
    )
}
