const url_shortener_base_url = 'https://rel.ink/'
const url_shortener_url = 'https://rel.ink/api/links/'
var xhr = new XMLHttpRequest();

$.fn.setClass = function(classes) {
    this.attr('class', classes);
    return this;
};

function get_shortened_url(){

    xhr.open("POST", url_shortener_url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        var hash_id = response.hashid
        if (hash_id == undefined){

            if($('#url').val().includes('https://') || $('#url').val().includes('http://')){
                $("#shortened-url").text('Invalid URL Please try again.');
            }else{
                $("#shortened-url").text('Invalid URL (Make sure that you have included https:// or http://)');
            }

            
        }else{
            $("#shortened-url").text('Shortened URL: ' + url_shortener_base_url + hash_id);
        }
        $('#shortened-url').css('visibility','inherit');
    };
    xhr.send(JSON.stringify(return_params_dictionary()));
}

function return_params_dictionary(){
    var params = {};
    var url = $('#url').val();
    params['url'] = url;
    return params;
}

function auto_elements_styling(){
    // Main Div Styling
    $('.container').css('margin-top','50px');
    // Output URL Styling
    $('#shortened-url').css('margin-top','20px');
    $('#shortened-url').setClass('alert alert-success');
    $('#shortened-url').css('visibility','hidden');
    $('#url').setClass('form-control');
    // Button
    $('#get-shortened-url').setClass('btn btn-primary');
}

$(document).ready(function() {
    $("#get-shortened-url").click(function(){
        get_shortened_url();
    });

    auto_elements_styling();
});