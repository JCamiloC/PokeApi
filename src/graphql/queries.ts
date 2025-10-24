import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!, $type: String) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites(limit: 1) { sprites }
      pokemon_v2_pokemonspecy { generation_id }
    }
    # Tipos para poblar filtros
    pokemon_v2_type(order_by: { name: asc }) {
      id
      name
    }
  }
`

// Variante con filtro por tipo (si se provee)
export const GET_POKEMONS_BY_TYPE = gql`
  query GetPokemonsByType($limit: Int!, $offset: Int!, $type: String!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
      where: {
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: $type } }
        }
      }
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites(limit: 1) { sprites }
      pokemon_v2_pokemonspecy { generation_id }
    }
  }
`

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }, limit: 1) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes { pokemon_v2_type { name } }
      pokemon_v2_pokemonsprites(limit: 1) { sprites }
      pokemon_v2_pokemonspecy {
        generation_id
        pokemon_v2_pokemonspeciesflavortexts(where: { language_id: { _eq: 9 } }, limit: 1) {
          flavor_text
        }
      }
      pokemon_v2_pokemonstats(order_by: { pokemon_v2_stat: { name: asc } }) {
        base_stat
        pokemon_v2_stat { name }
      }
      pokemon_v2_pokemonabilities(limit: 2) {
        pokemon_v2_ability { name }
      }
    }
  }
`

export const GET_TYPES = gql`
  query GetTypes {
    pokemon_v2_type(order_by: { name: asc }) {
      id
      name
    }
  }
`
