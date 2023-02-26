const express = require('express');
const app = express();
require('dotenv').config();
 
const port = process.env.PORT || 5000;

const { graphqlHTTP } = require('express-graphql'); 

const schemaFile = require('./schema/schema');

//SINGLE ENDPOINT
app.use('/graphql', graphqlHTTP({
//WE REQUIRE SCHEMA HERE
    schema: schemaFile,
//TOOL TO USE IN DEVELOPMENT
    graphiql: process.env.NODE_ENV === 'development' ? true : false
}));

app.listen(port, console.log(`SERVER IS RUNNING ON PORT ${port}`));