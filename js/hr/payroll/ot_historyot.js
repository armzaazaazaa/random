/**
 * Created by adithep on 4/25/2017 AD.
 */


$(document).ready(function() {



    $("#month_ot").datepicker({
        autoclose: true,
        language: 'th',
        format: "mm-yyyy",
        startView: "year",
        minView: "year",
        minViewMode: "months"
    });

    $('#btnSearchOThistory').on("click", function() {
        loadhistoryot(1);
    });


    //load ot from controller
    loadhistoryot(0);
});

function viewothistoryapproved(id) {
    window.open('viewotitem?id='+id);
}

function loadhistoryot(opt) {
    $('#dvloadot').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');

    var objVar = {};
    objVar.monthOT = $('#month_ot').val();
    objVar.opt = opt;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'loadhistoryot',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dvloadot').html(data);
            setdatatable('tbldatatable', 20);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}