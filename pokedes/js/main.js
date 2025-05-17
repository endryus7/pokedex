const pokemonlist = document.getElementById('pokemonlist')
const verMais = document.getElementById('verMais')
const maxRegistro = 151 
const limit = 16
let offset = 0

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonlist.innerHTML = pokemons.map(pokemon => `
      <li class="pokemon ${pokemon.type}">
        <span class="numero">#${pokemon.number}</span>
        <span class="nome">${pokemon.name}</span>
        <div class="detalhes">
          <ol class="types">
            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
    `).join('');
    
    // Adiciona o modal
    document.querySelectorAll('.pokemon').forEach((element, index) => {
      element.addEventListener('click', () => {
        showPokemonDetails(pokemons[index]);
      });
    });
  });
}

// Modal elements
const modal = document.getElementById('pokemonModal');
const modalName = document.getElementById('modalPokemonName');
const modalImage = document.getElementById('modalPokemonImage');
const modalHp = document.getElementById('modalPokemonHp');
const modalWeight = document.getElementById('modalPokemonWeight');
const modalHeight = document.getElementById('modalPokemonHeight');
const closeModal = document.querySelector('.close-modal');

// Mostrar modal
function showPokemonDetails(pokemon) {
  modalName.textContent = pokemon.name;
  modalImage.src = pokemon.photo;
  modalHp.textContent = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
  modalWeight.textContent = (pokemon.weight/10).toFixed(1);
  modalHeight.textContent = (pokemon.height/10).toFixed(1);
  
  modal.style.display = 'block';
}

// Fechar modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

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