const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const graphQLSchema = require('swagger-to-graphql');
const petstoreObj = require('./petstore.json');

graphQLSchema(petstoreObj)
  .then(schema => {
    app.use(
      '/graphql',
      graphqlHTTP(() => {
        return {
          schema,
          context: {
            GQLProxyBaseUrl: 'http://petstore.swagger.io/v2',
          },
          graphiql: true,
        };
      }),
    );

    app.listen(3009, 'localhost', () => {
      console.info(`API is here localhost:3009/graphql`);
    });
  })
  .catch(e => {
    throw e;
  });
