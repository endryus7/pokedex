const pokemonlist = document.getElementById('pokemonlist')
const verMais = document.getElementById('verMais')
const maxRegistro = 151 
const limit = 16
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
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
        `).join('')

    pokemonlist.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

verMais.addEventListener('click', () => {
    offset += limit

    const quantidadeRegristro = offset + limit
    if(quantidadeRegristro >= maxRegistro) {
        const newLimit = maxRegistro - offset
        loadPokemonItens(offset, newLimit)

        verMais.parentElement.removeChild(verMais)
    } else {
         loadPokemonItens(offset, limit)
    }
})