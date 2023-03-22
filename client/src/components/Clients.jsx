import React from 'react'
//we will import stuff from @apollo/client
//gql is used to make the actual query and useQuery is used to use the query in the component and load data, errors
import { useQuery } from '@apollo/client'
//we will import the client
import ClientRow from './ClientRow'
//we will import the required query
import { GET_CLIENTS } from '../queries/ClientQueries';


export default function Clients() {
    //to use the data that we get from the query, we will use the useQuery hook
    //we need to pass inside the useQuery is the actual query which is GET_CLIENTS
    //we will destructure it and get various things, which are loading screen, all the errors and the required data
    const { loading, error, data } = useQuery(GET_CLIENTS);
    //if its loading we will have a paragraph called loading
    if (loading) {
        return <p>Loading...</p>
    }
    //if there are any errors, we will display a paragraph that says 'something went wrong...'
    if (error) {
        return <p>Something went wrong, please try again...</p>
    }

    return (
        <>
            {/* we will only display the data when it is not loading and if there are not any errors */}
            {/* therefore we will use the logical and operator */}
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
                        {/* we will display a seperate component using map method */}
                        {/* we will have access to the client with the client props */}
                        {data.clients.map(client => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
