function setupPagination(totalPages) {
  window.currentPageGroup = 0;
  window.visibleButtons = 5;
  window.limit = 40;
  window.totalPages = totalPages;
  renderPaginationButtons();
}

function renderPaginationButtons(direction = null) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (direction === "left") {
    container.classList.remove("slide-right");
    container.classList.add("slide-left");
  } else if (direction === "right") {
    container.classList.remove("slide-left");
    container.classList.add("slide-right");
  }

  renderPrevButton(container);
  renderPageButtons(container);
  renderNextButton(container);
}

function renderPrevButton(container) {
  if (currentPageGroup === 0) return;
  const btn = document.createElement("button");
  btn.textContent = "←";
  btn.onclick = () => {
    currentPageGroup -= visibleButtons;
    renderPaginationButtons("left");
  };
  container.appendChild(btn);
}

function renderNextButton(container) {
  if (currentPageGroup + visibleButtons >= totalPages) return;
  const btn = document.createElement("button");
  btn.textContent = "→";
  btn.onclick = () => {
    currentPageGroup += visibleButtons;
    renderPaginationButtons("right");
  };
  container.appendChild(btn);
}

function renderPageButtons(container) {
  const start = currentPageGroup;
  const end = Math.min(start + visibleButtons, totalPages);
  for (let i = start; i < end; i++) {
    const btn = createPageButton(i);
    container.appendChild(btn);
  }
}

function createPageButton(i) {
  const btn = document.createElement("button");
  btn.textContent = i + 1;
  btn.id = `page-btn-${i}`;
  btn.onclick = () => {
    loadPokemonRange(i * limit, limit);
    highlightActiveButton(i);
  };
  return btn;
}

function highlightActiveButton(i) {
  document.querySelectorAll("#pagination button")
    .forEach(b => b.classList.remove("active-page"));

  const btn = document.getElementById(`page-btn-${i}`);
  if (btn) btn.classList.add("active-page");
}
