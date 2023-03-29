import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
                <Router>
                <Header />
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/project/:id' element={<Project />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </ApolloProvider>
        </>
    )
}
  
  export default App;