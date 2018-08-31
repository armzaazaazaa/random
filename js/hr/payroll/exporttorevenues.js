/**
 * Created by adithep on 8/3/2018 AD.
 */

$(document).ready(function() {


    $('.select2').css({ "width": "100%" });
    $(".select2").select2();
    $('.select2').select2().val('').trigger("change");
    // $('.month_picker').MonthPicker(MonthPickerConfig);
    //
    // $("#ot_date").datepicker({
    //     autoclose: true,
    //     language: 'th',
    //     format: 'dd/mm/yyyy',
    // });


    $(".datepick").datepicker({
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



    $('#btnExportWHT').on("click", function () {
        var data = $('#frmFormonth').serialize();
       // console.log(data+1);
        export_pdf('generatewht',data);
    });

    $('#btnExportPND1').on("click", function () {
        var data = $('#frmFormonth').serialize();
        btnExportPND1('generatepnd1',data);
    });

    $('#btnExport50Tvi').on("click", function () {
        var data = $('#frmForyear').serialize();
        tvi50pdfs('generatetvi50',data);
    });

    $('#btnExportPND1a').on("click", function () {
        var data = $('#frmForyear').serialize();
        PND1a('generatepnd1a',data);
    });

});




//url-->taxexportController

function export_pdf(url,data) {
    var crsf = $('meta[name="csrf-token"]').attr("content");
    var datavar = '_csrf='+crsf+'&'+data;
    var to = $('#url_to').val(); //url-->taxexport/tvi50pdf
    //---------POST AJAX -------------//
    // $.ajax({
    //     url: to,
    //     data: datavar,
    //     type: 'POST',
    //     success: function (data, textStatus, jQxhr) {
    //         console.log(data)
    //     },
    //     error: function (jqXhr, textStatus, errorThrown) {
    //         console.log(errorThrown);
    //     }
    // });
    //---------POST AJAX -------------//
    window.open(to+'?'+datavar)
} //หัก ณ ที่จ่าย


function tvi50pdfs(url,data) {
    var crsf = $('meta[name="csrf-token"]').attr("content");
    var datavar = '_csrf='+crsf+'&'+data;
    var to = $('#tvi50pdfs').val();
    window.open(to+'?'+datavar)
} //TV50


function PND1a (url,data) {
    var crsf = $('meta[name="csrf-token"]').attr("content");
    var datavar = '_csrf='+crsf+'&'+data;
    var to = $('#PND1a').val();

    window.open(to+'?'+datavar)
} //ภงด 1ก พร้อมไฟล์แนบ


function btnExportPND1 (url,data) {
     var crsf = $('meta[name="csrf-token"]').attr("content");
     var datavar = '_csrf='+crsf+'&'+data;
     var to = $('#Pndpdf1').val();
    window.open(to+'?'+datavar)

}   //ภงด 1 พร้อมไฟล์แนบ

