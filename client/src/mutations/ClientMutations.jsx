import { gql } from '@apollo/client'

//we will give the mutation a name
//whatever we need to pass in, will go here e.g. $id: ID! it will be an id and type of ID
//we want to call this deleteClient and pass that id in.
//whatever we want returned will go in here
const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`

const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            name
            phone
            email
            id
        }
    }
`

//we will export the mutation
export { DELETE_CLIENT, ADD_CLIENT }