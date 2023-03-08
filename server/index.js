const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql'); 
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 5000;
const schemaFile = require('./schema/schema');
const connectDB = require('./config/db');

//CONNECT TO DATABASE
connectDB();

//CORS
app.use(cors());

//SINGLE ENDPOINT
app.use('/graphql', graphqlHTTP({
//WE REQUIRE SCHEMA HERE
    schema: schemaFile,
//TOOL TO USE IN DEVELOPMENT
    graphiql: process.env.NODE_ENV === 'development' ? true : false
}));

app.listen(port, console.log(`SERVER IS RUNNING ON PORT ${port}`));