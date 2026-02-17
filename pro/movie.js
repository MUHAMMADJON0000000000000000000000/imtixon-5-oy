document.addEventListener('DOMContentLoaded', async () => {
  const movieContent = document.getElementById('movie-content');
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  if (!movieId) {
    movieContent.innerHTML = '<p class="text-red-500 text-xl font-bold">Movie not found (No ID provided).</p>';
    return;
  }

  try {
    const response = await fetch('./public/movies.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const movies = await response.json();
    const movie = movies.find(m => m.id == movieId);

    if (movie) {
      movieContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <img src="${movie.image}" 
               alt="${movie.title}" 
               class="rounded-xl shadow-2xl w-full md:w-1/3 object-cover aspect-[2/3]">
          
          <div class="flex-1 text-left">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              ${movie.title}
            </h1>
            
            <div class="flex flex-wrap gap-4 mb-6 text-sm md:text-base text-gray-300">
              <span class="bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">${movie.year}</span>
              <span class="bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">${movie.genre}</span>
              <span class="bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700 flex items-center gap-1">
                ⭐ ${movie.rating}
              </span>
            </div>

            <p class="text-lg text-gray-300 leading-relaxed mb-8">
              ${movie.description}
            </p>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-white">Cast</h3>
              <div class="flex flex-wrap gap-2">
                ${movie.cast.map(actor => `
                  <span class="bg-zinc-800 text-gray-300 px-3 py-1 rounded-md text-sm hover:bg-zinc-700 transition cursor-default">
                    ${actor}
                  </span>
                `).join('')}
              </div>
            </div>
            
             <button class="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2">
               ▶ Watch Now
             </button>
          </div>
        </div>
      `;
    } else {
      movieContent.innerHTML = '<p class="text-red-500 text-xl">Movie not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    movieContent.innerHTML = '<p class="text-red-500 text-xl">Error loading details.</p>';
  }

  const burgerBtn = document.getElementById('burger-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
