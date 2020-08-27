const express = require('express')
const next = require('next')
const mongoose = require('mongoose');

const {ApolloServer,gql} = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 3020
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const Portfolio = require('./graphql/models/Portfolio');
const User = require('./graphql/models/User');
const { buildAuthContext } = require('./graphql/context');

//resolvers data
const {portfoliosQueries,portfoliosMutation, userMutation} = require('./graphql/resolvers/index');
//type resolvers
const {portfolioTypes, userTypes} = require('./graphql/types/index');
//conect to db

const db = require('./database/index');
db.connect();

app.prepare().then(() => {
  const server = express()
  require('./middlewares').init(server,db);
  //Construct a schema, using graphql schema lenguage
  const  typeDefs = gql`

    ${portfolioTypes}
    ${userTypes}
    
    type Query {
      portfolio(id:ID):Portfolio
      portfolios:[Portfolio]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id:ID): ID
      
      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: String
    }
  `;
  // the root provides a resolver for each API ENDPOINTS
  const resolvers = {
    Query:{
      ...portfoliosQueries
    },
    Mutation:{
      ...portfoliosMutation,
      ...userMutation
    }
  };

  const apolloServer = new ApolloServer({
    typeDefs, 
    resolvers,
    context:()=>({
      ...buildAuthContext(),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User(mongoose.model('User')),
      }
    })
  });

  apolloServer.applyMiddleware({app:server})
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})