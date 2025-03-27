function fetchPokemonByType(type) {
    const url = `https://pokeapi.co/api/v2/type/${type}/`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const pokemonList = document.getElementById('pokemonList');
        pokemonList.innerHTML = '';
  
        const pokemonNames = data.pokemon.map(pokemon => pokemon.pokemon.name);
  
        // Only take 10 cards, any more and it'll probably crash lol
        const limitedPokemonNames = pokemonNames.slice(0, 10); 
  
        // high order function to iterate through all items using .forEach() vs. standard for loop
        limitedPokemonNames.forEach(name => {
          const listItem = document.createElement('div');
          listItem.textContent = name;
  
          fetchCardInfo(name, listItem);
  
          pokemonList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching Pokémon by type:', error));
  }
  
  function fetchCardInfo(pokemonName, listItem) {
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}&pageSize=10`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const card = data.data[0];
          const cardRarity = card.rarity || 'N/A';
          const cardImage = card.images.small;
  
        // Used a string literal to keep formatting and add multiple elements
          listItem.innerHTML += `
            <p>Card Rarity: ${cardRarity}</p>
            <img src="${cardImage}" alt="${pokemonName}" />
          `;
        } else {
          listItem.innerHTML += '<p>No card found for this Pokémon.</p>';
        }
      })
      .catch(error => console.error('Error fetching card info:', error));
  }
  

  document.querySelector('#pokemonTypeSelect').addEventListener('change', (event) => {
    const type = event.target.value;
    fetchPokemonByType(type);
});