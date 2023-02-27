//Importing the two mongoose models
const ClientModel = require('../models/Client');
const ProjectModel = require('../models/Project')

//WHEN WE HAVE DIFFERENT RESOURCES WE USE THIS TO CREATES TYPES FOR ALL EG. PROJECTS, CLIENTS, BLOGS   
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList,
GraphQLNonNull, GraphQL } = require('graphql');

//CLIENT TYPE
const ClientType = new GraphQLObjectType({
//takes name, field (func that returns obj)
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

//PROJECT TYPE
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent, args) {
                //finding the client where id matches clientId of projects as it is the parent
                //client is child of project
                return ClientModel.findById(parent.clientId)
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
            type: new GraphQLList(ClientType),
            //no parameters as we dont need args
            resolve() {
                //only find() as we will return all the data
                return ClientModel.find()
            },
        },
        client: { 
            //specifying the type that we want
            type: ClientType,
            //to get a single client we need id, so it is going to take args
            args: { id: { type: GraphQLID} },
            //whatever we want to return or repond with,
            //takes parent and args
            resolve(parent, args) {
                //find the client by the argumentative id
                return ClientModel.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                ProjectModel.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProjectModel.findById(args.id);
            }
        }
    }
})

//TO MAKE MUTATIONS WE NEED A NEW GRAPHQLOBJECT BY THAT NAME ONLY
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              email: { type: new GraphQLNonNull(GraphQLString) },
              phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
              const client = new ClientModel({
                name: args.name,
                email: args.email,
                phone: args.phone,
              });
      
              return client.save();
            },
          },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})