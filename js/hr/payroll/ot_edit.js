/**
 * Created by adithep on 4/25/2017 AD.
 */

$(document).ready(function () {

    $("#ot_date, #request_date" ).datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
    });

    $("#month_pay").datepicker({
        autoclose: true,
        language: 'th',
        format: "mm-yyyy",
        startView: "year",
        minView: "year",
        minViewMode: "months"
    });

    $('#xcompany').change(function() {
        lookupdepartment($(this), 'xdepartment', 'xsection');
    });

    $('#xdepartment').change(function() {
        lookupsection($(this), $('#xcompany').val(), 'xsection'); //ค่า demp working selection true
    });


    $('#btnSearch').on("click",function(){
        loadotedit(1);
    });


    $('#btn​Cancel').on("click",function(){
        $('#frmseachotedit')[0].reset();
    });

    //load ot from controller
    loadotedit(0);
});



function loadotedit(opt) {
    $('#dvloadot').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');

    var objVar = {};
    objVar.companyID = $('#xcompany').val();
    objVar.departmentID = $('#xdepartment').val();
    objVar.sectionID = $('#xsection').val();
    objVar.returnID = $('#otreturn_id').val();
    objVar.activityID = $('#activity_id').val();
    objVar.requestDate = $('#request_date').val();
    objVar.monthPay = $('#month_pay').val();
    objVar.otDate = $('#ot_date').val();
    objVar.opt = opt;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");

    $.ajax({
        url: 'loadotedit',
        data: objVar,
        type: 'POST',
        success: function (data, textStatus, jQxhr) {
            $('#dvloadot').html(data);
            setdatatable('tbldatatable',20);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function goURL(url) {
    window.open(url);
}

function doDeleteOT(id) {

    bootbox.confirm("คุณแน่ใจว่าจะลบข้อมูลนี้?", function(result) {
        if(result==1) {
            var objVar = {};
            objVar.id = id;
            objVar._csrf = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                url: 'deleteot',
                data: objVar,
                type: 'POST',
                success: function (data, textStatus, jQxhr) {
                    loadotedit();
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    });
}
