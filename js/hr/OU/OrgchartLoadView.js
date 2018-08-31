$(document).ready(function() {
    $('#selectworking').val(56);
    loadChart();
});

function loadChart(icompany) {

    if (icompany == undefined) {
        id = $('#selectworking').val();
    } else {
        id = icompany.value;
    }
    chart = { class: "go.TreeModel" }
    nodeDataObj = [];
    nodeDataArray = [];
    $.get('getchartnode', { company: id }, function(res) {
        $.each(res, function(index, value) {
            obj = {};
            if (value.parent == 0) {
                obj.key = value.company + value.ref_id;
                obj.name = value.Emp_name;
                obj.company = value.company;
                obj.title = value.name;
                obj.parent = '0';
                obj.idPosition = '';
            } else {
                obj.key = value.company + value.ref_id;
                obj.name = value.Emp_name;
                obj.company = value.company;
                obj.title = value.name;
                obj.parent = value.company + value.parent;
                obj.idPosition = '';
            }
            nodeDataArray[index] = obj;
        });
        chart.nodeDataArray = nodeDataArray;
        $("textarea#mySavedModel").text(JSON.stringify(chart));
        var originalState = $("#myDiagramDiv").clone();
        $("#myDiagramDiv").replaceWith(originalState);
        init();
        var canvas = document.getElementsByTagName('canvas')[0];
        canvas.setAttribute("style", "pointer-events: none");

    });
}