import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:10008/graphql",
  }),
  cache: new InMemoryCache(),
});
