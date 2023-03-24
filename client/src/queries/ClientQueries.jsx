import { gql } from '@apollo/client'

//its convention to use all caps in the variable name
//we use backticks
//we will create query and inside of the query, we will put everything exactly that we put in GraphiQL
const GET_CLIENTS = gql`
    query getClients {
        clients {
            name
            phone
            id
            email
        }
    }
`

//we will export the query
export { GET_CLIENTS }