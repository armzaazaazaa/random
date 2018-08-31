$(document).ready(function() {

});
var datachart = function() {
    var chart = null;
    $.ajaxSetup({ async: false });
    $.get('getchart', { company: 56 }, function(res) {
        chart = res;
    });
    return chart;
}
var testData = datachart();
$(function() {
    org_chart = $('#orgChart').orgChart({
        data: testData,
        showControls: true,
        allowEdit: true,
        onAddNode: function(node) {
            log('Created new node on node ' + node.data.id);
            org_chart.newNode(node.data.id, node.data.level);
        },
        onDeleteNode: function(node) {
            log('Deleted node ' + node.data.id);
            org_chart.deleteNode(node.data.id);
        },
        onClickNode: function(node) {
            log('Clicked node ' + node.data.id);
        }

    });
});

// just for example purpose
function log(text) {
    $('#consoleOutput').append('<p>' + text + '</p>')
}

//-----------------------------------------------------------

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();