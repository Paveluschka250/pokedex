let currentPage = 0;
const pageIds = ["page-one", "page-two", "page-three"];
const pageTitles = ["Base Stats", "Zweiter Page", "Dritter Page"];
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

function renderPokemonOverlay(encodedData) {
  const pokemon = JSON.parse(decodeURIComponent(encodedData));
  openOverlay();
  document.getElementById("overlay-content").innerHTML =
    createPokeOverlay(pokemon);
}

function changePage(direction) {
  document.getElementById(pageIds[currentPage]).classList.remove("active");
  currentPage = (currentPage + direction + pageIds.length) % pageIds.length;
  document.getElementById(pageIds[currentPage]).classList.add("active");
  document.getElementById("slider-title").textContent = pageTitles[currentPage];
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
