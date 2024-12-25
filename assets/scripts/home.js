const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2JlMjNiNjYwMTU5MWQyY2VmOTRkYzQ4NzE3NDU2NSIsIm5iZiI6MTczMjk4MzYyOS42OTUwMDAyLCJzdWIiOiI2NzRiM2I0ZDMzOWI3YjY3MGM5YzdmNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KBDTblfUubwOSfQnregIopVpkxXeHPlAqDmRLS5tMuo'
    }
};

async function fetchMoviesByGenre(genreId) {
    try {
        const response = await fetch(`${API_URL}/discover/movie?with_genres=${genreId}`, options);

        const data = await response.json();
        return data.results; // Array of movies
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
    }
}

const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

fetch(topRatedUrl, options)
  .then(res => res.json())
  .then(json => generatePopulars(json, 'top-rate'))
  .catch(err => console.error(err));

fetch(url, options)
    .then(res => res.json())
    .then(data =>{
        generatePopulars(data, 'trending-section')
        generatePopulars(data, 'popular-movies')
    })
    .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=ccbe23b6601591d2cef94dc487174565&language=en-US').then(res => res.json())
    .then(response => generateGenres(response)).catch(err => console.log(err))


const generatePopulars = (data, wrapper) => {
    const movieList = selectRandomElements(data.results, 6)
    movieList.forEach(item => {
        document.querySelector(`.${wrapper} .movie-grid`).innerHTML += `               
        <a href="details-new.html?id=${item.id}" class="movie-card">
            <img src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="Loetoeng Kasarung">
                <div class="movie-info">
                    <h3>${item.title.slice(0, 25)}${item.title.length > 25 ? '...' : ''}</h3>
                    <div class="movie-meta">
                        <span>⭐ ${item.vote_average.toFixed(1)} | ${item.release_date.slice(0, 4)}</span>
                    </div>
                </div>
        </a>`
    })
}

const generateGenres = (genres) => {
    console.log(genres)
    const genreList = genres.genres
    genreList.forEach(genre => {
        document.querySelector('.categories').innerHTML += `<a data-value=${genre.id} class="category-button">${genre.name}</a>`
    })

    document.querySelectorAll('.categories a').forEach(item => {
        item.addEventListener('click', ()=> {
            window.location.href = `category.html?id=${item.getAttribute('data-value')}`
        })
    })

}

const trendingMovies = () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2JlMjNiNjYwMTU5MWQyY2VmOTRkYzQ4NzE3NDU2NSIsIm5iZiI6MTczMjk4MzYyOS42OTUwMDAyLCJzdWIiOiI2NzRiM2I0ZDMzOWI3YjY3MGM5YzdmNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KBDTblfUubwOSfQnregIopVpkxXeHPlAqDmRLS5tMuo'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(movies => generateTrendings(movies.results))
        .catch(err => console.error(err));
}

const generateTrendings = (data) => {    
    const trendList = selectRandomElements(data, 2)
    trendList.forEach(movie => {
        document.querySelector('.featured-content').innerHTML += `<a class="featured-item" href="details-new.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title}">
                    <div class="featured-item-info">
                        <h2>${movie.title}</h2>
                        <button class="play-button">
                            <span>▶</span>
                            Let Play Preview
                        </button>
                    </div>
                </a>`
    })

}

function selectRandomElements(array, count) {
    if (count > array.length) {
        return array
    }

    let copy = [...array];
    let randomElements = [];

    for (let i = 0; i < count; i++) {

        let randomIndex = Math.floor(Math.random() * copy.length);

        randomElements.push(copy[randomIndex]);

        copy.splice(randomIndex, 1);
    }

    return randomElements;
}

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        console.log(`Category selected: ${button.textContent}`);
    });
});

document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const movieTitle = e.target.closest('.featured-item-info').querySelector('h2').textContent;
        console.log(`Playing preview for: ${movieTitle}`);
    });
});

const searchInput = document.querySelector('.search-bar input');
searchInput?.addEventListener('input', (e) => {
    console.log(`Searching for: ${e.target.value}`);
});

trendingMovies()
