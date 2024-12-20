        // Extract the movie ID from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = parseInt(urlParams.get("id"));

        // Base URL and headers for The Movie Database API
        const baseURL = "https://api.themoviedb.org/3/movie";
        const apiHeaders = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2JlMjNiNjYwMTU5MWQyY2VmOTRkYzQ4NzE3NDU2NSIsIm5iZiI6MTczMjk4MzYyOS42OTUwMDAyLCJzdWIiOiI2NzRiM2I0ZDMzOWI3YjY3MGM5YzdmNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KBDTblfUubwOSfQnregIopVpkxXeHPlAqDmRLS5tMuo'
        };

        // Fetch and display movie details
        fetch(`${baseURL}/${movieId}?language=en-US`, { method: 'GET', headers: apiHeaders })
            .then(res => res.json())
            .then(movie => {
                // Update hero background
                const heroSection = document.querySelector('.hero');
                heroSection.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

                // Update movie poster
                const poster = document.querySelector('.movie-poster');
                poster.src = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
                poster.alt = `${movie.title} Poster`;

                // Update movie details
                document.querySelector('.movie-title').textContent = movie.title;
                document.querySelector('.movie-meta').innerHTML = `
            <div class="movie-rating">
                <span class="star">★</span>
                <span>${movie.vote_average.toFixed(1)}</span>
                <span style="color: #999; margin-left: 4px;">IMDB</span>
            </div>
            <div>${movie.runtime} min</div>
            <div>${movie.release_date.slice(0, 4)}</div>
        `;

                // Update genres
                const genresContainer = document.querySelector('.movie-genres');
                movie.genres.forEach(genre => {
                    const genreBadge = document.createElement('span');
                    genreBadge.className = 'genre-badge';
                    genreBadge.textContent = genre.name;
                    genresContainer.appendChild(genreBadge);
                });

                // Update movie description
                document.querySelector('.movie-description').textContent = movie.overview;
            })
            .catch(err => console.error('Error fetching movie details:', err));

        // Fetch and display similar movies
        const fetchSimilarMovies = () => {
            fetch(`${baseURL}/${movieId}/similar?language=en-US&page=1`, { method: 'GET', headers: apiHeaders })
                .then(res => res.json())
                .then(data => {
                    const similarMoviesContainer = document.querySelector('.movie-list');
                    data.results
                        .filter(movie => movie.poster_path)
                        .slice(0, 12)
                        .forEach(movie => {
                            const movieCard = document.createElement('div');
                            movieCard.className = 'movie-card';
                            movieCard.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
                        <div class="movie-card-info">
                            <div class="movie-card-title">${movie.title.slice(0, 25)}${movie.title.length > 25 ? '...' : ''}</div>
                            <div class="movie-card-meta">${movie.release_date.slice(0, 4)} • ${movie.vote_average.toFixed(1)}</div>
                        </div>
                    `;
                            similarMoviesContainer.appendChild(movieCard);
                        });
                })
                .catch(err => console.error('Error fetching similar movies:', err));
        };

        fetchSimilarMovies();