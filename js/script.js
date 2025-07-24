let currentPage = 0;
const pageIds = ["page-one", "page-two", "page-three"];
const pageTitles = ["Base Stats", "Evolution", "Dritter Page"];
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

async function loadPokemonRange(offset, limit = 40) {
  showSpinner();

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("pokemonList").innerHTML = "";

  const allPokemon = data.results;

  for (let pokemon of allPokemon) {
    await loadPokemonData(pokemon.url);
  }

  hideSpinner();
}


function showSpinner() {
  document.getElementById("loading-spinner").style.display = "flex";
}

function hideSpinner() {
  document.getElementById("loading-spinner").style.display = "none";
}



async function initPagination() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
  const data = await res.json();
  const total = data.count;
  const totalPages = Math.ceil(total / 40);
  setupPagination(totalPages);
}

async function loadPokemonData(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const data = await response.json();
  const speciesResponse = await fetch(data.species.url);
  const speciesData = await speciesResponse.json();
  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionResponse.json();
  pokemonData(data, evolutionData);
}

function pokemonData(data, evolutionData) {
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
    evolution_chain: evolutionData.chain,
  };
  document.getElementById("pokemonList").innerHTML += createPokecard(pokemon);
}

async function renderEvolutionChain(chain) {
  const stages = [];
  let current = chain;
  while (current) {
    const name = current.species.name;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const poke = await res.json();
    const image = poke.sprites.other.dream_world.front_default;
    stages.push({ name, image });
    current = current.evolves_to?.[0];
  }
  return createEvolutionHTML(stages);
}

async function renderPokemonOverlay(encodedData) {
  currentPage = 0;
  const decoded = decodeURIComponent(encodedData);
  const pokemon = JSON.parse(decoded);
  openOverlay();
  document.getElementById("overlay-content").innerHTML =
    createPokeOverlayHTML(pokemon);
  const evoHtml = await renderEvolutionChain(pokemon.evolution_chain);
  document.getElementById("page-two").innerHTML = `
    ${evoHtml}
  `;
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

function setupSearch() {
  const input = document.getElementById("search-input");
  input.addEventListener("input", async () => {
    const query = input.value.trim().toLowerCase();

    if (query.length < 3) {
      loadPokemonRange(0);
      return;
    }

    const url = "https://pokeapi.co/api/v2/pokemon?limit=1302";
    const response = await fetch(url);
    const data = await response.json();
    const filtered = data.results.filter(p => p.name.startsWith(query));

    document.getElementById("pokemonList").innerHTML = "";
    for (let p of filtered) {
      await loadPokemonData(p.url);
    }
  });
}



initPagination();
loadPokemonRange(0);
setupSearch();
