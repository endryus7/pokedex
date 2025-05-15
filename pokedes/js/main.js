
function convertPokemonTypesToLi(pokemonsTypes) {
    return pokemonsTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`) 
}

function convertPokemonToHtml(pokemon) {
    return `
            <li class="pokemon">
                <span class="numero">${pokemon.order}</span>
                <span class="nome">${pokemon.name}</span>
                <div class="detalhes">
                    <ol class="types">
                        ${convertPokemonTypesToLi(pokemon.types).join('')}
                    </ol>
                    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </div>
            </li>
    
    
    `
}

const pokemonlist = document.getElementById('pokemonlist')

//arrow functions (funtion() igual a () =>)
pokeApi.getPokemons().then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToHtml).join('')
    pokemonlist.innerHTML = newHtml
})



