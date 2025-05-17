const pokemonlist = document.getElementById('pokemonlist');
const verMais = document.getElementById('verMais');
const maxRegistro = 649;
const limit = 16;
let offset = 0;

// Carrega e exibe os Pokémons na tela
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach(pokemon => {
            const li = document.createElement('li');
            li.className = `pokemon ${pokemon.type}`;
            li.innerHTML = `
                <span class="numero">#${pokemon.number}</span>
                <span class="nome">${pokemon.name}</span>
                <div class="detalhes">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            `;

            // Evento para abrir o modal ao clicar no Pokémon
            li.addEventListener('click', () => showPokemonDetails(pokemon));
            
            pokemonlist.appendChild(li);
        });
    });
}

// Variáveis do modal
const modal = document.getElementById('pokemonModal');
const modalContent = document.querySelector('.modal-content');
const modalName = document.getElementById('modalPokemonName');
const modalNumber = document.getElementById('modalPokemonNumber');
const modalImage = document.getElementById('modalPokemonImage');
const modalTypes = document.getElementById('modalPokemonTypes');
const modalHp = document.getElementById('modalPokemonHp');
const modalWeight = document.getElementById('modalPokemonWeight');
const modalHeight = document.getElementById('modalPokemonHeight');
const closeModal = document.querySelector('.close-modal');


// Mostra modal
function showPokemonDetails(pokemon) {

  // Atualiza o conteúdo do modal
  modalName.textContent = pokemon.name;
  modalNumber.textContent = `#${pokemon.number}`;
  modalImage.src = pokemon.photo;
  modalImage.alt = pokemon.name;

 // Limpa e adiciona os tipos
  modalTypes.innerHTML = '';
  pokemon.types.forEach(type => {
    const typeSpan = document.createElement('span');
    typeSpan.className = `type ${type}`;
    typeSpan.textContent = type;
    modalTypes.appendChild(typeSpan);
  });

  modalHp.textContent = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
  modalWeight.textContent = (pokemon.weight/10).toFixed(1);
  modalHeight.textContent = (pokemon.height/10).toFixed(1);

 // Mostra o modal
  modal.style.display = 'flex';
}

// Fecha o modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});


loadPokemonItens(offset, limit);

verMais.addEventListener('click', () => {
    offset += limit;

    const quantidadeRegristro = offset + limit;
    if (quantidadeRegristro >= maxRegistro) {
        const newLimit = maxRegistro - offset;
        loadPokemonItens(offset, newLimit);
        verMais.parentElement.removeChild(verMais);
    } else {
        loadPokemonItens(offset, limit);
    }
});