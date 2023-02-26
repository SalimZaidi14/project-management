const { projects, clients } = require('../SampleData');

//WHEN WE HAVE DIFFERENT RESOURCES WE USE THIS TO CREATES TYPES FOR ALL EG. PROJECTS, CLIENTS, BLOGS   
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//CLIENT TYPE
const Client = new GraphQLObjectType({
//takes name, field (func that returns obj)
    name: 'ClientType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

//PROJECT TYPE
const Project = new GraphQLObjectType({
    name: 'ProjectType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: Client,
            resolve(parent, args) {
                //finding the client where id matches clientId of projects
                //client is child of project
                return clients.find((client) => client.id === parent.clientId);
            }
        }
    })

})

//TO MAKE A QUERY, WE NEED TO DEFINE THE ROOT QUERY
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            //this type will be implemented as the whole client array is a list
            type: new GraphQLList(Client),
            //no parameters as we dont need args
            resolve() {
                //no condition so we will just deliver all the data
                return clients;
            },
        },
        client: { 
            //specifying the type that we want
            type: Client,
            //to get a single client we need id, so it is going to take args
            args: { id: { type: GraphQLID} },
            //whatever we want to return or repond with,
            //takes parent and args
            resolve(parent, args) {
                //loops through clients array anf finds that client.id === args.id
                return clients.find(client => client.id === args.id)
            }
        },
        projects: {
            type: new GraphQLList(Project),
            resolve() {
                return projects
            }
        },
        project: {
            type: Project,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})