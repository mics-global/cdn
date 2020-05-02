// Link to CDN -> https://cdn.jsdelivr.net/gh/mics-global/cdn/htm100/astronomy-predictor-main.js

const astronomy_predictor_base = 'https://api.weatherapi.com/v1/astronomy.json'
const api_key = '5d483a1303e648fa989143924200205'
var xhr = new XMLHttpRequest();

$.fn.setClass = function(classes) {
    this.attr('class', classes);
    return this;
};

function get_metrics(){

    xhr.open("GET", api_constructor(), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);        
        
        console.log(response);

        if(xhr.status == 400){
            set_output_texts(response, false);
            visibility_enabling_failure();
        } else{
            set_output_texts(response, true);
            visibility_enabling_success();
        }

    };
    xhr.send();
}

function set_output_texts(response, is_success){
    if (is_success){
        $("#full-location").text('Full Location: ' + response.location.name + ', ' + response.location.region + ', ' + response.location.country);
        $("#lat-long").text('Lat: ' + response.location.lat + ' | ' + 'Long: ' + response.location.lon);
        $("#sunrise-sunset").text('Sunrise: ' + response.astronomy.astro.sunrise + " | " + 'Sunset: ' + response.astronomy.astro.sunset);
        $("#moonrise-moonset").text('Moonrise: ' + response.astronomy.astro.moonrise + " | " + 'Moonset: ' + response.astronomy.astro.moonset);
    }else{
        $("#full-location").text('Woops! This place does not exist.');
    }
}

function visibility_enabling_failure(){
    $('p').css('visibility','hidden');
    $('p').setClass('alert alert-danger');
    $('#full-location').css('visibility','inherit');
}

function visibility_enabling_success(){
    $('p').css('visibility','inherit');
    $('p').setClass('alert alert-success');
}

function api_constructor(){
    return astronomy_predictor_base + '?key=' + api_key + '&q=' + $('#location').val() + '&dt=' + $('#date').val()
}

function auto_elements_styling(){
    // Main Div Styling
    $('.container').css('margin-top','50px');
    // Output URL Styling
    $('p').css('margin-top','20px');
    $('p').setClass('alert alert-success');
    $('p').css('visibility','hidden');
    // Button
    $('button').setClass('btn btn-primary');
    // Input
    $('input').setClass('form-control');
}

$(document).ready(function() {
    $("button").click(function(){
        get_metrics();
    });

    auto_elements_styling();
});