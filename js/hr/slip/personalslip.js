/**
 * Created by pacharapol on 6/6/2017 AD.
 */
$(document).ready(function() {



});


function loadPersonalslip(tab) {

    var haveCont = $(tab).data('have-contend');
    //var id_card_ref = $('#id_card_ref').val();
    var idcardlogin = $('#id_card_ref').val();
    // var viewOnly = $('#viewOnly').val();
    $('#idcardset').val(idcardlogin);
    // console.log(haveCont);
    // console.log(idcardlogin);

    if (haveCont == 'no') {
        //load
        $.get('../payroll/personalslip', function(res) {
            $('#slip .box-body').html(res).promise().done(function() {
                $("#selectyearslip").change(function() {
                    $.get('../payroll/getdataviewbyyear', { data: $("#selectyearslip").val() }, function(html) {
                        $('#viewslipbyyear').html(html);
                    });
                });
                //-----
                //$(".select2").select2();

                //$("[data-mask]").inputmask();

                //getYear();

                // $('#searchSlip').click(function() {
                //     var data = { 'idcard':$('#id_card_ref').val(),
                //                  'monthselect':$('#selectmonth').val(),
                //                  'yearselect':$('#selectyear').val(),
                //                 };
                //
                //    // console.log(data);
                //     var tbhtml = "";
                //
                //     $.ajax({
                //         method: "post",
                //         url: "../hr/payroll/searchslippersonal",
                //         data: data,
                //         success: (function(data) {
                //             consol  |
                //
                //
                // e.log(data);
                //
                //
                //
                //             getYear();
                //
                //         })
                //     });
                //
                // });

            });

        });

    }
}

function previewPDF(data) {
    idcardset = $('#idcardset').val();
    window.open('../payrollexport/slippdf?data=' + data.title, '_blank');
    // window.location = '../hr/payrollexport/slippdf';
    // $.get('../hr/payrollexport/slippdf', { data: data.title }, function() {

    // });
}

function getYear() {

    $.ajax({
        method: "GET",
        url: "../payroll/getsalarybyidcard",
        success: (function(data) {
            // console.log(data);
            var _options = "";

            $.each(data, function(key, value) {
                _options += "<option value='" + data[key].Year + "'>" + data[key].Year + "</option>";

                $("#selectyear").html(_options);
            });

        })
    });
}


function CalculateType() {

}