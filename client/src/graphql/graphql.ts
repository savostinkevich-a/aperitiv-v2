import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://aperitiv.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
})


export default client