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
                <img src="${card.card_images[0].image_url}" alt="${card.name}">
                <p>Type: ${card.type}</p>
                <p>Attack: ${card.atk}</p>
                <p>Defense: ${card.def}</p>
                <p>Level: ${card.level}</p>
                <p>Description: ${card.desc}</p>
            `;
    })
    .catch((error) => console.error("Error fetching card data:", error));
});
