$(document).ready(function() {});

function clickdiv(url) {
    var a = $('#' + url.id);
    window.open('http://' + a.find('#IP').val() + a.find('#part').val() + '?data=' + a.find('#place_id').val(), '_blank');
}