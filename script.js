const grid = document.getElementById("dogGrid");
const searchInput = document.getElementById("searchInput");
let allCards = [];

async function loadDogs() {
    try {
        const breedRes = await fetch("https://dog.ceo/api/breeds/list/all");
        const breedData = await breedRes.json();
        const breeds = Object.keys(breedData.message);

        for (let breed of breeds) {
            const imageRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
            const imageData = await imageRes.json();

            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-breed", breed);

            card.innerHTML = `
        <img src="${imageData.message}" alt="${breed}" />
        <p>${breed}</p>
      `;

            grid.appendChild(card);
            allCards.push(card);
        }
    } catch (err) {
        console.error("Error fetching dogs:", err);
    }
}

function filterDogs() {
    const search = searchInput.value.toLowerCase();
    allCards.forEach(card => {
        const breed = card.getAttribute("data-breed").toLowerCase();
        card.style.display = breed.includes(search) ? "block" : "none";
    });
}

window.onload = loadDogs;
