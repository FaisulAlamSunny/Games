// Configuration
const gamesPerPage = 12;
let currentPage = 1;
let currentFilter = "all";

// DOM elements
const gamesContainer = document.getElementById("games-container");
const paginationContainer = document.getElementById("pagination");
const filterButtons = document.querySelectorAll(".filter-btn");

// Initialize
function init() {
    if (!gamesData || gamesData.length === 0) {
        console.error("No games data found!");
        return;
    }
    renderGames();
    renderPagination();
    setupEventListeners();
}

// Render games
function renderGames() {
    gamesContainer.innerHTML = "";
    const filteredGames = currentFilter === "all" 
        ? gamesData 
        : gamesData.filter(game => game.type.includes(currentFilter));
    
    const startIdx = (currentPage - 1) * gamesPerPage;
    filteredGames.slice(startIdx, startIdx + gamesPerPage).forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
             <div class="game-thumbnail">
        <img src="${game.thumbnail}" alt="${game.title}">
    </div>
    <h3 class="game-title">${game.title}</h3>
    <div class="game-types">
        ${game.type.map(t => `<span class="game-type">${t.toUpperCase()}</span>`).join(" ")}
    </div>
    <p class="game-description">${game.description}</p>
    <a href="${game.link}" ${game.target ? `target="${game.target}"` : ''} class="play-btn">
        PLAY NOW</a>
        `;
        gamesContainer.appendChild(card);
    });
}

// Pagination
function renderPagination() {
    paginationContainer.innerHTML = "";
    const filteredGames = currentFilter === "all" 
        ? gamesData 
        : gamesData.filter(game => game.type.includes(currentFilter));
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

    if (totalPages <= 1) return;

    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.className = "page-btn";
        prevBtn.textContent = "◀";
        prevBtn.onclick = () => {
            currentPage--;
            renderGames();
            renderPagination();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        paginationContainer.appendChild(prevBtn);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            renderGames();
            renderPagination();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        paginationContainer.appendChild(pageBtn);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.className = "page-btn";
        nextBtn.textContent = "▶";
        nextBtn.onclick = () => {
            currentPage++;
            renderGames();
            renderPagination();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        paginationContainer.appendChild(nextBtn);
    }
}

// Event listeners
function setupEventListeners() {
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            renderGames();
            renderPagination();
        });
    });
}

// Start the app
document.addEventListener("DOMContentLoaded", init);