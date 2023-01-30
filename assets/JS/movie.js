let params = window.location.search;
const urlParams = new URLSearchParams(params);
const movie = urlParams.get('movie');
let backdrop = document.getElementById('movie-poster');
let movie_info = document.getElementById('movie-info');
let trailerCont = document.getElementById('trailer-cont');
let cast_cont = document.getElementById('cast-container');
let book_movie = document.getElementById("book_movie");

documentName = movie.split('-').join(' ');

console.log(documentName);

document.title = documentName;

fetch (`https://api.kenyabuzz.com/mvDetailsBySlg/${movie}`)
    .then(result => result.json())
    .then(res => {
        if (res.data.api_data != null) {
            // movie
            var title = res.data.name;
            var YTId = res.data.youtube_id;
            var poster = "https://image.tmdb.org/t/p/original" + res.data.api_data.poster_path
            if (res.data.api_data.backdrop_path === null) {
                backdrop_img = poster;
            } else {
                var backdrop_img = "https://image.tmdb.org/t/p/original" + res.data.api_data.backdrop_path;
            }
            
            var synopsis = res.data.synopsis;
            var runtime = res.data.api_data.runtime;

            var back_img = '<img id="movie-backdrop" src=" ' + backdrop_img + '" alt="'+ title +' backdrop image">';
            synopsis = '<div class="movie-poster-img"><img src="' + poster +'" alt="' + title +' poster img"></div><div class="movie-d"><div class="title"><h2>'+ title +'</h2></div><div class="movie-d-synopsis"><p>' + synopsis +'</p></div></div>';

            backdrop.innerHTML += back_img;
            movie_info.innerHTML = synopsis;

            // crew info
            if (res.data.api_data.production_companies !== null || res.data.api_data.production_companies.length !== 0) {
                var production = res.data.api_data.production_companies[0].name;
                var director = "";
                var language = res.data.api_data.spoken_languages[0].name;
            }

            for (let i = 0; i < res.data.cast_data.crew.length; i++) {
                if (res.data.cast_data.crew[i].department === "Directing")
                {
                    director = res.data.cast_data.crew[i].name;
                    break;
                }
            }


            // cast
            for (let i = 0; i < res.data.cast_data.cast.length; i++) {
                if (i === 5) {
                    break;
                } else {
                    var cast_name = res.data.cast_data.cast[i].name;
                    var cast_img = "https://image.tmdb.org/t/p/original" + res.data.cast_data.cast[i].profile_path;
                    let cast_div = '<div class="cast"><img src='+ cast_img +' alt='+ cast_name +' profile><p>'+ cast_name +'</p></div>';

                    cast_cont.innerHTML += cast_div;
                }
            }

            var hours = runtime / 60;

            var strH = hours.toString();
            var split = strH.split('.');
            var hour = split[0];

            var duration = "";

            if (hour > 1) {
                duration = hour + " hours ";
            } else {
                duration = hour +" hour "
            }

            if (hours % 1 != 0) {
                var num = hours % 1;
                var minutes = (num * 60) | 0;

                duration += minutes + " minutes" ;
            }

            var crew = '<div class="crew"><p>Directed by: '+ director +'</p><p>Duration : '+ duration +'</p><p>Language : '+ language +'</p><p>Production company : '+ production +'</p></div><div class="movie-trailer"><div class="overlay"></div><img class="thumbnail" src="'+ poster +'" alt='+ title +' poster><img class="play-trailer" src="assets/images/play-32.png" alt="play button"></div>';

            trailerCont.innerHTML = crew;
    } else {
        var poster = "https://manage.kenyabuzz.com/public" + res.data.poster;
        synopsis = '<div class="movie-poster-img"><img src="' + poster +'" alt="' + res.data.name +' poster img"></div><div class="movie-d"><div class="title"><h2>'+ res.data.name +'</h2></div><div class="movie-d-synopsis"><p>' + res.data.synopsis +'</p></div></div>';
        var api_null_image = '<img id="movie-backdrop" src=" ' + res.data.image + '" alt="'+ res.data.image +' backdrop image">';;
        var null_crew = '<div class="crew"><p>Directed by: '+ '' +'</p><p>Duration : '+ '' +'</p><p>Language : '+ '' +'</p><p>Production company : '+ '' +'</p></div><div class="movie-trailer"><div class="overlay"></div><img class="thumbnail" src="'+ poster +'" alt='+ res.data.name +' poster><img class="play-trailer" src="assets/images/play-32.png" alt="play button"></div>';
        backdrop.innerHTML += api_null_image;
        movie_info.innerHTML = synopsis;
        trailerCont.innerHTML = null_crew;
    }
    })
    .catch (err => {
        console.log(err);
    })

book_movie.addEventListener('click', () => {
    window.location.href = `book.html?movie=${movie}`;
});