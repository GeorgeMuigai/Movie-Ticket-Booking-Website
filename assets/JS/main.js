var mySwiper = document.getElementById("mySwiper");
var slider = "";

var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");

var mov_one = document.getElementById("m_one");
var mov_two = document.getElementById("m_two");
var mov_three = document.getElementById("m_three");
var mov_four = document.getElementById("m_four");
var mov_five = document.getElementById("m_five");

var test = document.getElementById('testbtn');

var nShowing = document.getElementById("now-showing");
var coming = document.getElementById("coming-soon");
var btn_book = document.getElementById("btn-book-now");



// test.addEventListener('click', ()=>{
//     window.location.href = "text.html?number=1";
// });

// go to clicked movie
function goToMovie() {
    console.log("you clicked this movie!");
}

// get slider movies
fetch("https://api.kenyabuzz.com/mvsHot")
        .then(response => {
            if (response.ok) {
                console.log("success");
                return response.json();
            } else {
                throw new Error("Error fetching items");
            }
        })
        .then(res => {
            for (let i= 0; i < res.data.length; i++) {
                
                if (res.data[i].api_data != null) {
                    var image =  "https://image.tmdb.org/t/p/original" +  res.data[i].api_data.backdrop_path;  
                    var synopsis = res.data[i].synopsis;
                    var movieName = res.data[i].name;
                    var genres = "";
                    for(let j = 0; j < res.data[i].api_data.genres.length; j++) {
                        if (j === res.data[i].api_data.genres.length - 1) {
                            genres += res.data[i].api_data.genres[j].name;
                        } else {
                            genres += res.data[i].api_data.genres[j].name + " | ";
                        }
                    }
                    // console.log(genres);
                    // console.log(res.data[i].api_data.genres.length + image);
                    var data = '<div class="swiper-slide slide-no "><div class="overlay"></div><img src=' + image + '><div class=`info-container"><div class="movie-info"><div class="movie-title"><h2>'+ movieName +'</h2></div><div class="movie-genres"><span>' + genres + '</span></div><div class="synopsis"><p>' + synopsis + '</p></div></div><div class="book-btn"><a onclick="goToMovie()">Book Now</a></div></div></div>';
                    mySwiper.innerHTML += data;
                }
            }
        })
        .catch(err => console.error(err));

var swiper = new Swiper(".home", {
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});


// get top five movies
fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=39c56d9594f0d22979d3d180187e140e&language=en-US&page=1")
    .then(response => response.json())
    .then(res => {
        // no 1
        var image =  "https://image.tmdb.org/t/p/original" +  res.results[0].poster_path;
        var title = res.results[0].original_title;
        var vote_count = res.results[0].vote_count;
        var resOne = '<img src=' + image + ' alt=' + title + '><div class="top-th-details"><h2>01</h2><h4>' + title + '</h4></div>';
        var m_one = '<div class="number"><h2>1</h2></div><div class="top-fv-title"><span>' + title + '</span><p>' + vote_count + ' votes</p></div><div class="top-fv-img"><img src=' + image + ' alt=' + title + '></div>'

        var imageTwo =  "https://image.tmdb.org/t/p/original" +  res.results[1].poster_path;
        var title = res.results[1].original_title;
        var resTwo = '<img src=' + imageTwo + ' alt=' + title + '><div class="top-th-details"><h2>02</h2><h4>' + title + '</h4></div>';
        var vote_count = res.results[1].vote_count;
        var m_two = '<div class="number"><h2>2</h2></div><div class="top-fv-title"><span>' + title + '</span><p>' + vote_count + ' votes</p></div><div class="top-fv-img"><img src=' + imageTwo + ' alt=' + title + '></div>'
        
        var imageTh =  "https://image.tmdb.org/t/p/original" +  res.results[2].poster_path;
        var title = res.results[2].original_title;
        var resThr = '<img src=' + imageTh + ' alt=' + title + '><div class="top-th-details"><h2>03</h2><h4>' + title + '</h4></div>';
        var vote_count = res.results[2].vote_count;
        var m_three = '<div class="number"><h2>3</h2></div><div class="top-fv-title"><span>' + title + '</span><p>' + vote_count + ' votes</p></div><div class="top-fv-img"><img src=' + imageTh + ' alt=' + title + '></div>'
        
        var imageFour =  "https://image.tmdb.org/t/p/original" +  res.results[3].poster_path;
        var title = res.results[3].original_title;
        var vote_count = res.results[3].vote_count;
        var m_four = '<div class="number"><h2>4</h2></div><div class="top-fv-title"><span>' + title + '</span><p>' + vote_count + ' votes</p></div><div class="top-fv-img"><img src=' + imageFour + ' alt=' + title + '></div>'
        
        var imageFive =  "https://image.tmdb.org/t/p/original" +  res.results[4].poster_path;
        var title = res.results[4].original_title;
        var vote_count = res.results[4].vote_count;
        var m_five = '<div class="number"><h2>5</h2></div><div class="top-fv-title"><span>' + title + '</span><p>' + vote_count + ' votes</p></div><div class="top-fv-img"><img src=' + imageFive + ' alt=' + title + '></div>'


        one.innerHTML = resOne;
        two.innerHTML = resTwo;
        three.innerHTML = resThr;

        mov_one.innerHTML = m_one;
        mov_two.innerHTML = m_two;
        mov_three.innerHTML = m_three;
        mov_four.innerHTML = m_four;
        mov_five.innerHTML = m_five;

        // console.log(res.results[0].original_title);
    })
    .catch(err => console.error(err));

// fetch now showing movies
fetch("https://api.kenyabuzz.com/mvsNowShowing")
    .then(response => response.json())
    .then(now => {
        for (let i = 0; i < now.data.length; i++) {
            var image = "";
            if (now.data[i].poster != "") {
                image =  "https://manage.kenyabuzz.com/public" +  now.data[i].poster;
            } else {
                image = "https://image.tmdb.org/t/p/w342" + now.data[i].imdb_poster;
            }
            var title = now.data[i].name;
            var slug = now.data[i].slug;
            var genre = now.data[i].genre;
            var movie = '<a class="movie" href="movie.html?movie=' + slug + '"><input type="hidden" value=""><div class="mv-img"><img src=' + image + ' alt='+ title +' ></div><div class="mv-info"><div class="title"><h4>' + title + '</h4></div><div class="mv-genres"><p>' + genre + '</p></div></div><button class="cta-btn">Book Now</button></a>';

            nShowing.innerHTML += movie;
        }
    });

// fetch coming soon movies
fetch("https://api.kenyabuzz.com/mvsComingSoon")
    .then(response => response.json())
    .then(now => {
        for (let i = 0; i < now.data.length; i++) {
            var image = "";
            if (now.data[i].poster != "") {
                image =  "https://manage.kenyabuzz.com/public" +  now.data[i].poster;
            } else {
                image = "https://image.tmdb.org/t/p/w342" + now.data[i].imdb_poster;
            }
            var title = now.data[i].name;
            var genre = now.data[i].genre;
            var movie = '<a class="movie"><div class="mv-img"><img src=' + image + ' alt='+ title +' ></div><div class="mv-info"><div class="title"><h4>' + title + '</h4></div><div class="mv-genres"><p>' + genre + '</p></div></div></a>';

            coming.innerHTML += movie;
        }
    });