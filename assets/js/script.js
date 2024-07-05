document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Function to fetch and display cards
  const fetchAndDisplayCards = (query = "") => {
    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
    if (query) {
      url += `?fname=${query}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayCards(data.data);
      })
      .catch((error) => console.error("Error fetching card data:", error));
  };

  // Function to display cards
  const displayCards = (cards) => {
    cardContainer.innerHTML = ""; // Clear existing cards
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
              <h2>${card.name}</h2>
              <img src="${card.card_images[0].image_url}" alt="${card.name}">
          `;
      cardElement.addEventListener("click", () => {
        window.location.href = `card.html?cardId=${card.id}`;
      });
      cardContainer.appendChild(cardElement);
    });
  };

  // Initial fetch and display
  fetchAndDisplayCards();

  // Event listener for search button click
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    fetchAndDisplayCards(query);
  });
});
