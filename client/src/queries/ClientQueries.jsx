import { gql } from '@apollo/client'

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

export { GET_CLIENTS }