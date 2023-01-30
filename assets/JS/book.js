let params = window.location.search;
let urlParams = new URLSearchParams(params);
let movie = urlParams.get('movie');
let backdrop = document.getElementById('movie-poster');
let movie_info = document.getElementById('movie-info');

let dates = document.getElementById('dates');

document.title = movie.split('-').join(' ');

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
                backdrop_img = "https://image.tmdb.org/t/p/original" + res.data.api_data.backdrop_path;
            }
            var synopsis = res.data.synopsis;

            var back_img = '<img id="movie-backdrop" src=" ' + backdrop_img + '" alt="'+ title +' backdrop image">';
            synopsis = '<div class="movie-poster-img"><img src="' + poster +'" alt="' + title +' poster img"></div><div class="movie-d"><div class="title"><h2>'+ title +'</h2></div><div class="movie-d-synopsis"><p>' + synopsis +'</p></div></div>';

            backdrop.innerHTML += back_img;
            movie_info.innerHTML = synopsis;
    } else {
        var poster = "https://manage.kenyabuzz.com/public" + res.data.poster;
        synopsis = '<div class="movie-poster-img"><img src="' + poster +'" alt="' + res.data.name +' poster img"></div><div class="movie-d"><div class="title"><h2>'+ res.data.name +'</h2></div><div class="movie-d-synopsis"><p>' + res.data.synopsis +'</p></div></div>';

        backdrop.innerHTML += api_null_image;
        movie_info.innerHTML = synopsis;
    }
    })
    .catch (err => {
        console.log(err);
    })

let dateString;


fetch("https://api.kenyabuzz.com/getFullCinemasSchedule")
.then(result => result.json())
.then(res => {
    for(let i = 0; i < res.data.vista_schedule.length; i++) {
            dateString = res.data.vista_schedule[i].show_date;
            const date = new Date(dateString);
            
            // week day
            let getWeekDay = { weekday: 'long'};
            let weekday = date.toLocaleDateString('en-US', getWeekDay);
            // month
            let getMonth = { month: 'short'};
            let month = date.toLocaleDateString('en-US', getMonth);
            // day
            let getDay = { day: 'numeric'};
            let day = date.toLocaleDateString('en-US', getDay);
            // year
            let getYear = { year: 'numeric'} 
            let year = date.toLocaleDateString('en-US', getYear);

            var date_div = '<div class="date"><div class="weekday"><h4>'+ weekday +'</h4></div><div class="day"><h2>'+ day +'</h2></div><div class="year"><h5>'+ month +', '+ year +'</h5></div>';
            dates.innerHTML += date_div;
        }
    })
    .catch(err => {
        console.log(err);
    })