const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1
    }
}


const popular_movies = document.querySelector('#popular-movies')

const DisplayPopularMovies = async() => {
        showSpinner()
        const { results } = await fetchAPIData('movie/popular')
        results.map((movie) => {
                    const div = document.createElement('div')
                    div.classList.add('card')
                    div.innerHTML = `
                    <a href="movie-details.html?id=${movie.id}">
                    ${movie.poster_path ? `<img src=https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="Movie Title" />`
                        : `<img src="images/no-image.jpg" class="card-img-top" alt="Movie Title" />`}
                    
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">
                            <small class="text-muted">Release: ${movie.release_date}</small>
                        </p>
                    </div>

        `
        hideSpinner()
        popular_movies.appendChild(div)
    })
}


const DisplayMovieDetails = async() => {
    const id = window.location.search.split('=')[1];
    const movie= await fetchAPIData(`movie/${id}`)

      displayBackgroundImage('movie', movie.backdrop_path);
    showSpinner()
    const div = document.createElement('div')
    div.innerHTML = `
     <div class="details-top">
          <div>
           ${movie.poster_path ? `<img src=https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="Movie Title" />`
                        : `<img src="images/no-image.jpg" class="card-img-top" alt="Movie Title" />`}
                    
                
          </div>
          <div>
            <h2>Movie Title</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:${movie.release_date}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((gen) =>  `<li>${gen.name}</li>`).join('')}
            </ul>
            <a href="#${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${movie.production_companies.map((each)=> `<span>${each.name}</span>`).join(' ')}
          </div>
        </div>
    
    `

    hideSpinner()

    document.querySelector('#movie-details').appendChild(div)
}





const DisplayPopularShows = async() => {
        showSpinner()
        const { results } = await fetchAPIData('tv/popular')
        results.map((tv) => {
                    const div = document.createElement('div')
                    div.classList.add('card')
                    div.innerHTML = `
                    <a href="tv-details.html?id=${tv.id}">
                    ${tv.poster_path ? `<img src=https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top" alt="Movie Title" />`
                        : `<img src="images/no-image.jpg" class="card-img-top" alt="Movie Title" />`}
                    
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${tv.name}</h5>
                        <p class="card-text">
                            <small class="text-muted">Release: ${tv.release_date}</small>
                        </p>
                    </div>

        `
        hideSpinner()
        document.querySelector('#popular-shows').appendChild(div)
    })
}


const DisplayShowDetails = async() => {
    const id = window.location.search.split('=')[1];
    const tv= await fetchAPIData(`tv/${id}`)

      displayBackgroundImage('tv', tv.backdrop_path);
    showSpinner()
    const div = document.createElement('div')
    div.innerHTML = ` <div class="details-top">
          <div>
           ${tv.poster_path ? `<img src=https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top" alt="Movie Title" />`
                        : `<img src="images/no-image.jpg" class="card-img-top" alt="Movie Title" />`}
                    
               
          </div>
          <div>
            <h2>Show Name</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${tv.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${tv.last_air_date}</p>
            <p>
            ${tv.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${tv.genres.map((gen) =>  `<li>${gen.name}</li>`).join('')}
            </ul>
            <a href="#${tv.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${tv.last_episode_to_air.episode_number}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${tv.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${tv.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group"> ${tv.production_companies.map((each)=> `<span>${each.name}</span>`).join(' ')}</div>
        </div>`

    hideSpinner()

    document.querySelector('#show-details').appendChild(div)
}



const DisplaySlider = async() => {
  const {results} = await fetchAPIData('movie/now_playing')
  results.map((each) => {
const div = document.createElement('div')
  div.className = 'swiper-slide'
  div.innerHTML = `
   <a href="movie-details.html?id=${each.id}">
              <img src=https://image.tmdb.org/t/p/w500${each.poster_path}"  alt="Movie Title" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${each.vote_average.toFixed(1)} / 10
            </h4>
  
  `
  document.querySelector('.swiper-wrapper').appendChild(div)
 initSwipper()
  })
  
}


function initSwipper()
 {
  const swiper = new Swiper('.swiper',{
    // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    } }
  })
 }


 const search = async() => {
   const queryString = window.location.search 
   const urlParams = new URLSearchParams(queryString)

   global.search.type = urlParams.get('type')
   global.search.term = urlParams.get('search-term')
   if(global.search.term !== '' && global.search.term !== null) {
     const {results,total_pages,page,total_results} = await fetchAPIsearchData()
     global.search.totalPages = total_pages
     global.search.page = page
     if(results.length === 0) {
      CustomAlert("Search Result Not found",'success')
      return
     }

     DisplaySearchResults(results)
     document.querySelector('#search-term').value = ''
    
   }
   else {
    CustomAlert("Enter the Search Value")
   }
 }

const DisplayPageAndvalue = async () => {
    const div = document.createElement('div')
    div.classList.add('pagination')
    div.innerHTML = `
      <button class="btn btn-primary" id="prev">Prev</button>
      <button class="btn btn-primary" id="next">Next</button>
      <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
      `

      document.querySelector('#pagination').appendChild(div)
      if(global.search.page === 1) {
        document.querySelector('#prev').disabled = true;
      }
      if(global.search.page === global.search.totalPages) {
              document.querySelector('#next').disabled = true;
            }
      document.querySelector('#next').addEventListener('click',async() => {
        global.search.page++;
           const {results} = await fetchAPIsearchData()
           DisplaySearchResults(results)
      })

       document.querySelector('#prev').addEventListener('click',async() => {
        global.search.page--;
           const {results} = await fetchAPIsearchData()
           DisplaySearchResults(results)
      })
}


 const  DisplaySearchResults = (results) => {
   document.querySelector('#search-results').innerHTML = ``
   document.querySelector('#pagination').innerHTML = ``
   results.map((res) => {
      const div = document.createElement('div')
      div.classList.add('card')
      div.innerHTML = `
      <a href="movie-details.html?id=${res.id}">
      ${res.poster_path ? `<img src=https://image.tmdb.org/t/p/w500${res.poster_path}" class="card-img-top" alt="Movie Title" />`
          : `<img src="images/no-image.jpg" class="card-img-top" alt="Movie Title" />`}
      
      </a>
      <div class="card-body">
          <h5 class="card-title">${global.search.type === 'movie' ? res.title : res.name }</h5>
          <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === 'movie' ? res.release_date : res.first_air_date}</small>
          </p>
      </div>

`
        hideSpinner()
        document.querySelector('#search-results').appendChild(div)
         
    })
DisplayPageAndvalue()
 }


 const CustomAlert = (message,className='error') => {
    const div = document.createElement('div')
    div.classList.add('alert',className)
    const textNode = document.createTextNode(`${message}`)
    div.appendChild(textNode)
    document.querySelector('#alert').appendChild(div)
    setTimeout(() => {
        document.querySelector('#alert').remove(div)
    },2000)
 }

 const fetchAPIsearchData = async() => {
    const API_KEY = '6631a63b27b4c1a7aa2683f8c2871d2a'
    const API_URL = 'https://api.themoviedb.org/3/'

    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`)
    const data = await response.json()

    return data
}


const showSpinner = () => {
    document.
    querySelector('.spinner').classList.add('show')
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show')
}



const fetchAPIData = async(endpoint) => {
    const API_KEY = '6631a63b27b4c1a7aa2683f8c2871d2a'
    const API_URL = 'https://api.themoviedb.org/3/'

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await response.json()

    return data
}


function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}




const hightlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link')
    links.forEach((each) => {
        if (each.getAttribute('href') === global.currentPage) {
            each.classList.add('active')
        }
    })
}



function init() {
    switch (global.currentPage) {

        case '/':
            case '/index.html':
            DisplaySlider()
            DisplayPopularMovies()
            break;
        case '/shows.html':
            DisplayPopularShows()
            break;
        case '/tv-details.html':
            DisplayShowDetails()
            break;
        case '/movie-details.html':
            DisplayMovieDetails()
            break;
        case '/search.html':
            search()
            break;
    }
    hightlightActiveLink()
}


document.addEventListener('DOMContentLoaded', init)