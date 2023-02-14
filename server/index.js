const express = require('express');
require('dotenv').config();
const app = express();
const { graphqlHTTP } = require('express-graphql');

const port = process.env.PORT || 5000;
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`));