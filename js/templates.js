function createPokecard(pokemon) {
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

function createPokeOverlayHTML(pokemon) {
  return /*html*/`
    <div class="poke-overlay-header" style="--type-color: ${pokemon.color}">
      <button class="overlay-close" onclick="closeOverlay()">←</button>
      <h2>${capitalize(pokemon.name)} <span>#${String(pokemon.number).padStart(3, "0")}</span></h2>
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
        <img class="stat-icon" src="./assets/icons/xp.svg" alt="xp icon">
        <p><strong>${pokemon.base_experience}</strong></p>
        <span>XP</span>
      </div>
    </div>
    <div class="poke-slider">
      <div class="slider-nav">
        <button onclick="changePage(-1)">←</button>
        <h3 id="slider-title" class="slider-title">Base Stats</h3>
        <button onclick="changePage(1)">→</button>
      </div>
      <div class="slider-pages">
        <div class="slider-page active" id="page-one">
          <div class="poke-overlay-basestats">
            ${createBaseStat("HP", pokemon.hp, pokemon.color)}
            ${createBaseStat("Attack", pokemon.attack, pokemon.color)}
            ${createBaseStat("Defense", pokemon.defense, pokemon.color)}
            ${createBaseStat("Sp. Atk", pokemon.special_attack, pokemon.color)}
            ${createBaseStat("Sp. Def", pokemon.special_defense, pokemon.color)}
            ${createBaseStat("Speed", pokemon.speed, pokemon.color)}
          </div>
        </div>
        <div class="slider-page" id="page-two">
          <div id="evolution-chain-loader">Lade Evolution...</div>
        </div>
        <div class="slider-page" id="page-three">
          <h3>Coming soon</h3>
        </div>
      </div>
    </div>
  `;
}

function createBaseStat(label, value, color) {
  return /*html*/ `
    <div class="stat-row">
      <span class="stat-label">${label}</span>
      <span class="stat-value">${value}</span>
      <div class="stat-bar">
        <div class="stat-fill" style="width: ${value / 2}%; background-color: ${color}"></div>
      </div>
    </div>
  `;
}

function createEvolutionHTML(stages) {
  return /*html*/ `
    <div class="evolution-chain">
      <div class="evo-stage">
        <img src="${stages[0]?.image}" alt="${stages[0]?.name}">
        <span>${capitalize(stages[0]?.name)}</span>
      </div>
      
      ${stages[1] ? `
        <div class="evo-arrow">→</div>
        <div class="evo-stage">
          <img src="${stages[1].image}" alt="${stages[1].name}">
          <span>${capitalize(stages[1].name)}</span>
        </div>
      ` : ''}

      ${stages[2] ? `
        <div class="evo-arrow">→</div>
        <div class="evo-stage">
          <img src="${stages[2].image}" alt="${stages[2].name}">
          <span>${capitalize(stages[2].name)}</span>
        </div>
      ` : ''}
    </div>
  `;
}