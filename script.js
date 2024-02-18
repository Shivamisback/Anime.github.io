document.addEventListener('DOMContentLoaded', function() {
    fetch('/jikan?url=/season/later')
        .then(response => response.json())
        .then(data => {
            displayUpcomingAnime(data.anime, 'Jikan API');
        })
        .catch(error => console.error('Error fetching upcoming anime from Jikan API:', error));

    fetch('/anilist?query=' + encodeURIComponent(`
        query {
            Page {
                media(season: WINTER, seasonYear: 2024, type: ANIME, sort: POPULARITY_DESC) {
                    title {
                        romaji
                    }
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                    episodes
                    averageScore
                }
            }
        }
    `))
    .then(response => response.json())
    .then(data => {
        displayUpcomingAnime(data.data.Page.media, 'AniList API');
    })
    .catch(error => console.error('Error fetching upcoming anime from AniList API:', error));

    fetch('/kitsu?url=/anime?filter[status]=upcoming')
        .then(response => response.json())
        .then(data => {
            displayUpcomingAnime(data.data, 'Kitsu API');
        })
        .catch(error => console.error('Error fetching upcoming anime from Kitsu API:', error));

    function displayUpcomingAnime(animeList, source) {
        const upcomingAnimeList = document.getElementById('upcoming-anime-list');
        animeList.forEach(anime => {
            const animeElement = document.createElement('div');
            animeElement.classList.add('anime');
            animeElement.innerHTML = `
                <h3>${anime.title.romaji || anime.attributes.canonicalTitle}</h3>
                <p>Start Date: ${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}</p>
                <p>End Date: ${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}</p>
                <p>Episodes: ${anime.episodes || anime.attributes.episodeCount}</p>
                <p>Rating: ${anime.averageScore || anime.attributes.averageRating}</p>
                <p>Source: ${source}</p>
            `;
            upcomingAnimeList.appendChild(animeElement);
        });
    }
});
