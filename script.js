let films = [];

// Fetch JSON data
fetch('films.json')
    .then(response => response.json())
    .then(data => {
        films = data;
        displayFilms(films);
    })
    .catch(error => console.error('Error fetching data:', error));

// Display films in the table
function displayFilms(films) {
    const filmsBody = document.getElementById('films-body');
    filmsBody.innerHTML = ''; // Clear existing rows

    films.forEach(film => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.id}</td>
            <td>${film.title}</td>
            <td>${film.release_year}</td>
            <td>${film.director}</td>
            <td>${film.box_office.toLocaleString()}</td>
            <td>${film.country}</td>
        `;
        filmsBody.appendChild(row);
    });
}

// Filter films by title
function filterFilms() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm));
    displayFilms(filteredFilms);
}

// Sort films
function sortFilms() {
    const sortValue = document.getElementById('sort').value;
    let sortedFilms = [...films];

    switch (sortValue) {
        case 'title-asc':
            sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sortedFilms.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'year-asc':
            sortedFilms.sort((a, b) => a.release_year - b.release_year);
            break;
        case 'year-desc':
            sortedFilms.sort((a, b) => b.release_year - a.release_year);
            break;
        case 'box-office-asc':
            sortedFilms.sort((a, b) => a.id - b.id);
            break;
        case 'box-office-desc':
            sortedFilms.sort((a, b) => b.id - a.id);
            break;
        case 'director-asc':
            sortedFilms.sort((a, b) => a.director.localeCompare(b.director)); // Sort by Director (A-Z)
            break;
        case 'country-asc':
            sortedFilms.sort((a, b) => a.country.localeCompare(b.country)); // Sort by Country (A-Z)
            break;
    }

    displayFilms(sortedFilms);
}
