import Header from './components/Header';
import Clients from './components/Clients';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
})

//we will create the client
const client = new ApolloClient({
    //we will put uri to the graphql project
    uri: 'http://localhost:5000/graphql',
    //we will also add for cache 
    cache
})

function App() {
    return (
        <>
            {/* we will have to wrap the ApolloProvider around our components*/}
            <ApolloProvider client={client}>
                <Header />
                <Clients />
            </ApolloProvider>
        </>
    )
}
  
  export default App;