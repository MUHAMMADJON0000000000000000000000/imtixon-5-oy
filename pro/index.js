document.addEventListener('DOMContentLoaded', async () => {
  const movieGrid = document.getElementById('movie-grid');

  try {
    const response = await fetch('./public/movies.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movies = await response.json();

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.className = "group relative overflow-hidden rounded-xl cursor-pointer";
      
      card.innerHTML = `
        <img src="${movie.image}" 
             class="w-full h-auto object-cover rounded-xl group-hover:scale-110 transition duration-500 aspect-[2/3]" 
             alt="${movie.title}" />

        <div class="absolute inset-0 bg-black/70 opacity-0 
                    group-hover:opacity-100 flex flex-col items-center justify-center 
                    transition duration-300 p-4 text-center">
          <h3 class="text-xl font-semibold text-white">${movie.title}</h3>
          <p class="text-sm text-gray-300 mt-2">${movie.year} | ${movie.rating}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movie.id}`;
      });

      movieGrid.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching movies:', error);
    movieGrid.innerHTML = `<p class="text-red-500 text-center col-span-full">Failed to load movies. Please try again later.</p>`;
  }
});
