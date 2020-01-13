import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";

let server = new ApolloServer({ typeDefs, resolvers, tracing: true });

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
