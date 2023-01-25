let params = window.location.search;
const urlParams = new URLSearchParams(params);
const movie = urlParams.get('movie');
let backdrop = document.getElementById('movie-poster');
let movie_info = document.getElementById('movie-info');
let trailerCont = document.getElementById('trailer-cont');
let cast_cont = document.getElementById('cast-container');

documentName = movie.split('-').join(' ');

console.log(documentName);

document.title = documentName;

fetch (`https://api.kenyabuzz.com/mvDetailsBySlg/${movie}`)
    .then(result => result.json())
    .then(res => {
        // movie
        var title = res.data.name;
        var YTId = res.data.youtube_id;
        var poster = "https://image.tmdb.org/t/p/original" + res.data.api_data.poster_path
        var backdrop_img = "https://image.tmdb.org/t/p/original" + res.data.api_data.backdrop_path;
        var synopsis = res.data.synopsis;
        var runtime = res.data.api_data.runtime;

        // crew info
        var production = res.data.api_data.production_companies[0].name;
        var director = "";
        var language = res.data.api_data.spoken_languages[0].name;

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

        var duration = hour + " hour(s)";

        if (hours % 1 != 0) {
            var num = hours % 1;
            var minutes = num * 60;

            duration = hour + " hour(s) " + minutes + " minutes" ;
        }

        var back_img = '<img id="movie-backdrop" src=" ' + backdrop_img + '" alt="'+ title +' backdrop image">';
        synopsis = '<div class="movie-poster-img"><img src="' + poster +'" alt="' + title +' poster img"></div><div class="movie-d"><div class="title"><h2>'+ title +'</h2></div><div class="movie-d-synopsis"><p>' + synopsis +'</p></div></div>';
        var crew = '<div class="crew"><p>Directed by: '+ director +'</p><p>Duration : '+ duration +'</p><p>Language : '+ language +'</p><p>Production company : '+ production +'</p></div><div class="movie-trailer"><div class="overlay"></div><img class="thumbnail" src="'+ poster +'" alt='+ title +' poster><img class="play-trailer" src="assets/images/play-32.png" alt="play button"></div>';

        backdrop.innerHTML += back_img;
        movie_info.innerHTML = synopsis;
        trailerCont.innerHTML = crew;
    })
    .catch (err => {
        console.log(err);
    })