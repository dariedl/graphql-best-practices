import { ApolloServer } from "apollo-server";
import { typeDefs } from "./src/typeDefs.js";
import { loadConfig, resolvers } from "./src/loader";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ dataloaders: loadConfig() }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
