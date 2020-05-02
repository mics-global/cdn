const dictionary_base_url = 'https://owlbot.info/api/v4/dictionary/'
var xhr = new XMLHttpRequest();

$.fn.setClass = function(classes) {
    this.attr('class', classes);
    return this;
};

function get_metrics(){

    xhr.open("GET", dictionary_base_url + $('#word').val(), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Token 6622d06bac6a026393f107ce1ee36a0946da6c42");
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);        
        
        console.log(response);

        if(xhr.status == 404){
            $('p').css('visibility','hidden');
            $("#type").text('Woops! Nothing found! Try a different word.');
            $('p').setClass('alert alert-danger');
            $('#type').css('visibility','inherit');
        } else{
            var word_type = response.definitions[0].type;
            var example = response.definitions[0].example;
            var definition = response.definitions[0].definition;
            var pronunciation = response.pronunciation;

            $("#type").text('Word Type: ' + word_type);
            $("#example").text('Example Usage: ' + example);
            $("#definition").text('Definition: ' + definition);
            $("#pronunciation").text('Pronunciation: ' + pronunciation);        
            $('p').css('visibility','inherit');
            $('p').setClass('alert alert-success');
        }

    };
    xhr.send();
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