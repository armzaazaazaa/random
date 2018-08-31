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
                obj.Emp_id = value.Emp_id;
                obj.idPosition = value.position;
                obj.active_status = value.active_status;
                obj.img = value.img;
            } else {
                obj.key = value.company + value.ref_id;
                obj.name = value.Emp_name;
                obj.company = value.company;
                obj.title = value.name;
                obj.parent = value.company + value.parent;
                obj.Emp_id = value.Emp_id;
                obj.idPosition = value.position;
                obj.active_status = value.active_status;
                obj.img = value.img;
            }
            nodeDataArray[index] = obj;
        });
        chart.nodeDataArray = nodeDataArray;
        $("textarea#mySavedModel").text(JSON.stringify(chart));
        var originalState = $("#myDiagramDiv").clone();
        $("#myDiagramDiv").replaceWith(originalState);
        init();
        $(':canvas').attr();
    });
}