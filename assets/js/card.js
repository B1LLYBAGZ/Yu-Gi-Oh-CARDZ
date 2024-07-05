document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("cardId");
  const cardDetailsContainer = document.getElementById("card-details");
  const cardTitle = document.getElementById("card-title");

  fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`)
    .then((response) => response.json())
    .then((data) => {
      const card = data.data[0]; // Assuming API returns a card object
      cardTitle.textContent = card.name;

      cardDetailsContainer.innerHTML = `
                <img src="${card.card_images[0].image_url}" class="img-fluid mb-4" alt="${card.name}">
                <p><strong>Type:</strong> ${card.type}</p>
                <p><strong>Attack:</strong> ${card.atk}</p>
                <p><strong>Defense:</strong> ${card.def}</p>
                <p><strong>Level:</strong> ${card.level}</p>
                <p><strong>Description:</strong> ${card.desc}</p>
            `;
    })
    .catch((error) => console.error("Error fetching card data:", error));
});
