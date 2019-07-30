(function () {

  // -------------命名變數------------- //

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const movieGenres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const dataPanel = document.getElementById('data-panel')
  const genresBar = document.getElementById('genres-bar')



  // -------------主要程式-------------- //

  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      displayGenresList()
      displayDataList(data)
    }).catch((err) => console.log(err))







  // -------------監聽器-------------- //

  genresBar.addEventListener('click', function (event) {
    console.log(event.target.dataset.genres)
    let moviegenres = Number(event.target.dataset.genres)

    let results = data.filter(
      movie => movie.genres.includes(moviegenres)
    )

    //console.log(results)
    displayDataList(results)
  })






  // -------------Functions-------------- //

  // function-列出電影
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-4">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>
              ${tagMovieType(item.genres)}
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }


  // function-列出電影分類list
  function displayGenresList() {
    let htmlContent = ''
    for (let i in movieGenres) {
      htmlContent += `
      <a class='nav-link' href="#" data-toggle="tab" data-genres="${i}">${movieGenres[i]}</a>
      `
    }
    genresBar.innerHTML = htmlContent
  }


  // function-標上電影類型標籤
  function tagMovieType(arr) {
    let htmlContent = ''
    for (let i = 0; i < arr.length; i++) {
      htmlContent += `
      <span class="badge badge-secondary">${movieGenres[arr[i]]}</span>
    `
    }
    return htmlContent
  }


})()

