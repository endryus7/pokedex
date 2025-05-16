const pokemonlist = document.getElementById('pokemonlist')



function convertPokemonToHtml(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                <span class="numero">${pokemon.number}</span>
                <span class="nome">${pokemon.name}</span>
                <div class="detalhes">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('') }
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

//arrow functions (funtion() igual a () =>)
pokeApi.getPokemons().then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToHtml).join('')
    pokemonlist.innerHTML = newHtml
})




