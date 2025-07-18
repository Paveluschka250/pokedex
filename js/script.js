const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ground: "#E0C068",
  rock: "#B8A038",
  psychic: "#F85888",
  ghost: "#705898",
  normal: "#A8A878",
  fighting: "#C03028",
  poison: "#A040A0",
  bug: "#A8B820",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  flying: "#A890F0",
};

async function loadFirst20Pokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=3";
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
  console.log(data);
  pokemonData(data);
}

function pokemonData(data) {
  const mainType = data.types[0].type.name;
  const pokemon = {
    name: data.name,
    number: data.id,
    pic: data.sprites.other.dream_world.front_default,
    weight: data.weight,
    height: data.height,
    type: data.types[0].type.name,
    color: typeColors[mainType] || "#AAA",
    base_experience: data.base_experience,
    ability: data.abilities[0].ability.name,
  };

  document.getElementById("pokemonList").innerHTML += renderPokecard(pokemon);
}

function renderPokecard(pokemon) {
  const dataString = encodeURIComponent(JSON.stringify(pokemon));
  return /*html*/`
    <div class="pokemon-card" onclick="renderPokemonOverlay('${dataString}')">
      <div class="pokemon-card-inner">
        <div class="card-front" style="background: linear-gradient(to bottom, #f0f0f0 50%, ${pokemon.color} 100%)">
          <p>#${pokemon.number}</p>
          <h2>${capitalize(pokemon.name)}</h2>
          <img src="${pokemon.pic}" alt="Bild von ${pokemon.name}">
        </div>
        <div class="card-back" style="background: linear-gradient(to bottom, ${pokemon.color}, #222)">
          <h3>${capitalize(pokemon.name)}</h3>
          <p><strong>Type:</strong> ${capitalize(pokemon.type)}</p>
          <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
          <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
          <p><strong>XP:</strong> ${pokemon.base_experience}</p>
          <p><strong>Ability:</strong> ${capitalize(pokemon.ability)}</p>
        </div>
      </div>
    </div>
  `;
}

function renderPokemonOverlay(encodedData) {
  const decoded = decodeURIComponent(encodedData);
  const pokemon = JSON.parse(decoded);
  openOverlay();
  console.log(pokemon.name);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function openOverlay() {
  document.getElementById("overlay").classList.remove("d-none");
}

function closeOverlay() {
  console.log("schliessen");
  
  document.getElementById("overlay").classList.add("d-none");
}

loadFirst20Pokemon();
