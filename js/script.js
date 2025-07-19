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
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    special_attack: data.stats[3].base_stat,
    special_defense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
  };

  document.getElementById("pokemonList").innerHTML += creatPokecard(pokemon);
}

function creatPokecard(pokemon) {
  const dataString = encodeURIComponent(JSON.stringify(pokemon));
  return /*html*/ `
    <div class="pokemon-card" onclick="renderPokemonOverlay('${dataString}')">
      <div class="pokemon-card-inner">
        <div class="card-front" style="background: linear-gradient(to bottom, #f0f0f0 50%, ${
          pokemon.color
        } 100%)">
          <p>#${pokemon.number}</p>
          <h2>${capitalize(pokemon.name)}</h2>
          <img src="${pokemon.pic}" alt="Bild von ${pokemon.name}">
        </div>
        <div class="card-back" style="background: linear-gradient(to bottom, ${
          pokemon.color
        }, #222)">
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
  const pokemon = JSON.parse(decodeURIComponent(encodedData));
  openOverlay();
  document.getElementById("overlay-content").innerHTML =
    createPokeOverlay(pokemon);
}

function createPokeOverlay(pokemon) {
  return /*html*/ `
      <div class="poke-overlay-header" style="--type-color: ${pokemon.color}">
        <button class="overlay-close" onclick="closeOverlay()">←</button>
        <h2>${capitalize(pokemon.name)} <span>#${String(
    pokemon.number
  ).padStart(3, "0")}</span></h2>
      </div>
      <div class="poke-overlay-img">
        <img src="${pokemon.pic}" alt="${pokemon.name}">
      </div>
      <div class="poke-overlay-type" style="background-color: ${pokemon.color}">
        <strong>${capitalize(pokemon.type)}</strong>
      </div>
      <div class="poke-overlay-stats">
        <div class="stat-block">
          <img class="stat-icon" src="./assets/icons/weight.svg" alt="weight icon">
          <p><strong>${pokemon.weight / 10} kg</strong></p>
          <span>Weight</span>
        </div>
        <div class="divider"></div>
        <div class="stat-block">
          <img class="stat-icon" src="./assets/icons/height.svg" alt="height icon">
          <p><strong>${pokemon.height / 10} m</strong></p>
          <span>Height</span>
        </div>
        <div class="divider"></div>
        <div class="stat-block">
          <img class="stat-icon" src="./assets/icons/xp.svg" alt="ability icon">
          <p><strong>${pokemon.base_experience}</strong></p>
          <span>XP</span>
        </div>
      </div>
      <div class="poke-overlay-basestats">
        <h3>Base Stats</h3>
        ${renderBaseStat("HP", pokemon.hp, pokemon.color)}
        ${renderBaseStat("Attack", pokemon.attack, pokemon.color)}
        ${renderBaseStat("Defense", pokemon.defense, pokemon.color)}
        ${renderBaseStat("Sp. Atk", pokemon.special_attack, pokemon.color)}
        ${renderBaseStat("Sp. Def", pokemon.special_defense, pokemon.color)}
        ${renderBaseStat("Speed", pokemon.speed, pokemon.color)}
      </div>   
  `;
}

function renderBaseStat(label, value, color) {
  return /*html*/ `
    <div class="stat-row">
      <span class="stat-label">${label}</span>
      <span class="stat-value">${value}</span>
      <div class="stat-bar">
        <div class="stat-fill" style="width: ${
          value / 2
        }%; background-color: ${color}"></div>
      </div>
    </div>
  `;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function openOverlay() {
  document.getElementById("overlay").classList.remove("d-none");
}

function closeOverlay() {
  document.getElementById("overlay").classList.add("d-none");
}

loadFirst20Pokemon();
