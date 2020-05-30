import ApolloClient from 'apollo-boost';

let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
});

export default client