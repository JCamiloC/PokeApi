import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

// GraphQL mini-clase:
// - GraphQL es un lenguaje de consulta para APIs. En lugar de múltiples endpoints REST,
//   haces una sola consulta indicando exactamente los campos que necesitas.
// - Apollo Client es una librería que maneja consultas GraphQL en el frontend y cachea resultados.
// - Aquí configuramos el "cliente" que se usará con un Hook (useQuery) para traer datos.

const httpLink = createHttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
