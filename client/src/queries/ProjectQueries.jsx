import { gql } from "@apollo/client"

const GET_PROJECTS = gql`
    query getProjects {
        projects {
            name
            id
            status
            description
        }
    }
`

const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            name
            id
            description,
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

export { GET_PROJECTS, GET_PROJECT };