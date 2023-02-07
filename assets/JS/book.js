let params = window.location.search;
let urlParams = new URLSearchParams(params);
let movie = urlParams.get('movie');
let backdrop = document.getElementById('movie-poster');
let movie_info = document.getElementById('movie-info');
let theatreDate = '';
let dates = document.getElementById('dates');
let cinemas_cont = document.getElementById('cinemas');

document.title = movie.split('-').join(' ');

// get movie details
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
            var api_null_image = "https://manage.kenyabuzz.com/public" + res.data.poster;
            var back_img = '<img id="movie-backdrop" src=" ' + api_null_image + '" alt="'+ res.data.name +' backdrop image">';
            synopsis = '<div class="movie-poster-img"><img src="' + api_null_image +'" alt="' + res.data.name +' poster img"></div><div class="movie-d"><div class="title"><h2>'+ res.data.name +'</h2></div><div class="movie-d-synopsis"><p>' + res.data.synopsis +'</p></div></div>';

            backdrop.innerHTML += back_img;
            movie_info.innerHTML = synopsis;
    }
    })
    .catch (err => {
        console.log(err);
    })

let dateString;

// get show time and theatres
fetch("https://api.kenyabuzz.com/getFullCinemasScheduleStream")
.then(result => result.json())
.then(res => {
    // display date, time & theatres
    for(let i = 0; i < res.length; i++) {
            // dateString = res.data.vista_schedule[i].show_date;
            dateString = res[i].show_date;
            theatreDate = res[0].show_date;
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
    movieShowingOnDate(theatreDate);
    })
    .catch(err => {
        console.log(err);
    })

function movieShowingOnDate(date) {
    console.log(date);
    fetch("https://api.kenyabuzz.com/getFullCinemasScheduleStream")
        .then(result => result.json())
        .then(res => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].show_date === date.toString()) {
                    for (let j = 0; j < res[i].cinemas.length; j++) {
                        var cinema_name = res[i].cinemas[j].cinema_name;
                        var cin_div = '<div class="cinema"><div class="cinema-title"><h2>'+ cinema_name +'</h2></div><div class="start_time_cont">';
                        
                        for (let m = 0; m < res[i].cinemas[j].movies.length; m++) {
                            for (let n = res[i].cinemas[j].movies[m].length - 1; n != -1; n--) {
                                if (res[i].cinemas[j].movies[m][n].movie_slug === movie) {
                                    console.log(movie + ` found at ${m} ${n} site id ${res[i].cinemas[j].movies[m][n].site_id}`);
                                    var movie_time = res[i].cinemas[j].movies[m][n].movie_date_time;
                                    // var seatDesc = res[i].cinemas[j].movies[m][n].performance_info.admitOne.tickets.ticket[0].seatDescription;
                                    var seatDesc = res[i].cinemas[j].movies[m][n].performance_info.admitOne.bookingFee;
                                    const date = new Date(movie_time);

                                    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
                                    var formattedTime = date.toLocaleTimeString('en-US', options);

                                    var show_t = '<div class="start_time"><h2>'+ formattedTime +'</h2><p>'+ seatDesc +'</p></div>'; 
                                    cin_div += show_t;
                                }
                            }
                        }
                        cin_div += '</div></div>';
                        cinemas_cont.innerHTML += cin_div;
                    }
                    break;
                }
            }
        })
        .catch(err => {
            console.log("Api error " + err);
        })
}