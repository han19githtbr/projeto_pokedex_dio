const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
       
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type 
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

// retorna os detalhes de um pokemon no formato json
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url) // ir buscar a lista de pokemons no servidor
        .then((response) => response.json()) // converter essa lista para json
        .then((jsonBody) => jsonBody.results) //results retorna a nossa lista de pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // transformamos essa lista em uma nova lista que é a lista de promessas do detalhe do pokemon
        .then((detailRequests) => Promise.all(detailRequests)) // esperar todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)
}





















