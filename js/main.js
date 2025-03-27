const button = document.querySelector('button')
const apiKey = '630a1b0df4184cf18b9eba2142a6df9c'
const results = document.querySelector('.results')

button.addEventListener('click', () => {
    const genre = document.querySelector('#genreSelect').value
    results.innerHTML = ''

    fetch(`https://api.rawg.io/api/games?genres=${genre}&key=${apiKey}&page_size=12`)
    .then(response => response.json())
    .then(data => {
        if (data && data.results.length > 0) {
            data.results.forEach(game => {
                const gameElement = document.createElement('p');
                gameElement.textContent = game.name; 
                results.appendChild(gameElement);
            });
        } else {
            results.textContent = 'No games found for this genre.';
        }
    })
    .catch(error => console.error('Error fetching data:', error))
});