const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ground: '#E0C068',
  rock: '#B8A038',
  psychic: '#F85888',
  ghost: '#705898',
  normal: '#A8A878',
  fighting: '#C03028',
  poison: '#A040A0',
  bug: '#A8B820',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  flying: '#A890F0',
};

async function loadFirst20Pokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const response = await fetch(url);
  const data = await response.json();

  const allPokemon = data.results;

  for (let pokemon of allPokemon) {
    await loadPokemonData(pokemon.url);
  }
}

async function loadPokemonData(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const data = await response.json();

  const mainType = data.types[0].type.name;
  const cardColor = typeColors[mainType] || '#AAA';

  const pokemon = {
    name: data.name,
    number: data.id,
    pic: data.sprites.other.dream_world.front_default,
    weight: data.weight,
    type: mainType,
    color: cardColor,
  };

  document.getElementById("pokemonList").innerHTML += renderPokecard(pokemon);
}

function renderPokecard(pokemon) {
  return /*html*/`

    <div class="pokemon-card" style="background-color: ${pokemon.color};">
      <h2>${pokemon.name} #${pokemon.number}</h2>
      <p>Typ: ${pokemon.type}</p>
      <p>Gewicht: ${pokemon.weight}</p>
      <img src="${pokemon.pic}" alt="Bild von ${pokemon.name}">
    </div>;

  `   
}

loadFirst20Pokemon();
