const movie_zone_base = 'http://cors-container.herokuapp.com/http://www.omdbapi.com/'
const api_key = 'e91e344'
var xhr = new XMLHttpRequest();

$.fn.setClass = function(classes) {
    this.attr('class', classes);
    return this;
};

function get_metrics(){
    console.log(api_constructor());
    xhr.open("GET", api_constructor(), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        console.log(response);

        if(response.Response == 'True'){
            // Movie Found
            onMovieFound(response);
        }else{
            // Movie Not Found
            onMovieNotFound();
        }

    };
    xhr.send();
}

function onMovieFound(response){
    $("#poster").attr("src",response.Poster);
    $("#year").text(response.Year);
    $("#rated").text(response.Rated);
    $("#released").text(response.Released);
    $("#runtime").text(response.Runtime);
    $("#genre").text(response.Genre);
    $("#director").text(response.Director);
    $("#writer").text(response.Writer);
    $("#actors").text(response.Actors);
    $("#plot").text(response.Plot);
    $("#language").text(response.Language);
    $("#country").text(response.Country);
    $("#awards").text(response.Awards);
    $("#metascore").text(response.Metascore);
    $("#imdbRating").text(response.imdbRating);
    $("#imdbVotes").text(response.imdbVotes);
    $("#imdbID").text(response.imdbID);
    $("#type").text(response.Type);
    $("#dvd").text(response.DVD);
    $("#boxoffice").text(response.BoxOffice);
    $("#production").text(response.Production);
    $("#website").text(response.Website);
}

function onMovieNotFound(){
    alert('Whoops! Movie Not Found :(');
}

function api_constructor(){
    return movie_zone_base + '?apikey=' + api_key + '&t=' + $('#title').val();
}

function auto_elements_styling(){
    // Main Div Styling
    $('.container').css('margin-top','50px');
    // Button
    $('button').setClass('btn btn-primary');
    // Input
    $('input').setClass('form-control');
}

$(document).ready(function() {
    $("#fetch").click(function(){
        get_metrics();
    });
    auto_elements_styling();
});