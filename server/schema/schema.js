//Importing the two mongoose models
const ClientModel = require('../models/Client');
const ProjectModel = require('../models/Project')

//WHEN WE HAVE DIFFERENT RESOURCES WE USE THIS TO CREATES TYPES FOR ALL EG. PROJECTS, CLIENTS, BLOGS   
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList,
GraphQLNonNull, GraphQLEnumType } = require('graphql');

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
                return ProjectModel.find()
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
        //PROJECT MUTATIONS
        addClient: {
            type: ClientType,
            args: {
                //This property is used to prevent the user from entering empty values
                //it is wrapped around the type
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                //we create a new client using mongoose model 
                //we are passing in the values
                //these are ultimately going to come from the frontend form
                const client = new ClientModel({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                //we will take the client we creted and save it to the database
                return client.save();
            },
        },
        deleteClient: {
            type: ClientType,
            //take the id of the client to delete
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            //find the client by id and remove it
            resolve(parent, args) {
                return ClientModel.findByIdAndRemove(args.id);
            }
        },

        //PROJECT MUTATION

        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Just Started' },
                            'progress': { value: 'In Progress' },
                            'complete': { value: 'Completed'}
                        }
                    }),
                    defaultValue: 'Just Started'
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const project = new ProjectModel({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })

                return project.save()
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return ProjectModel.findByIdAndRemove(args.id)
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Just Started' },
                            'progress': { value: 'In Progress' },
                            'complete': { value: 'Completed'}
                        }
                    }),
                },
            },
            resolve(parent, args) {
                return ProjectModel.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status
                    }
                },
                {new: true}
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})