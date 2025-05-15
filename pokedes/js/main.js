
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToHtml(pokemon) {
    return `
            <li class="pokemon">
                <span class="numero">#001</span>
                <span class="nome">${pokemon.name}</span>
                <div class="detalhes">
                    <ol class="movimentos">
                        <li class="movimento">grass</li>
                        <li class="movimento">poison</li>
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
                </div>
            </li>
    
    
    `
}

const pokemonlist = document.getElementById('pokemonlist')

//arrow functions (funtion() igual a () =>)
pokeApi.getPokemons().then((pokemons = []) => {

    const newList = pokemons.map(convertPokemonToHtml).join('')

    const newHtml = newList.join('')
    pokemonlist.innerHTML += newHtml
})
    
    
  

