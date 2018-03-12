import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

const isProduction = process.env.NODE_ENV === 'production';

const wsLink = new WebSocketLink({
  uri: isProduction
    ? 'ws://now:80/subscriptions'
    : 'ws://localhost:8080/subscriptions',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: isProduction ? 'http://now:80/graphql' : 'http://localhost:8080/graphql',
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

export default function createApolloClient() {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
