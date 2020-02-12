const { ApolloServer } = require("apollo-server");
const { resolvers, typeDefs } = require("./src/demo");

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
