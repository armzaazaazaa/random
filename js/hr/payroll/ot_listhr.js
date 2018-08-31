/**
 * Created by adithep on 12/4/2017 AD.
 */


$(document).ready(function () {


    $('#company_id').change(function () {
        loadotpaid($(this).val());
    });

    loadothr(0);
});

function goURL(url) {
    window.open(url);
}


function loadothr(company_id) {
    $('#dvloadot').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    /*    objVar.staffID = $('#hide_staff_id').val();
     objVar.transactionDate = $('#transaction_date').val();
     objVar.clientID = $('#xclient_id').val();
     objVar.processID = $('#xprocess_id').val();
     objVar.stepID = $('#xstep_id').val();*/
    objVar.companyID = company_id;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");

    $.ajax({
        url: 'loadothr',
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
