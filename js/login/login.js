
$(document).ready(function() {
alert('tttttttt');

    $('#btnExport50Tvi').on("click", function () {
        var data = $('#frmForyear').serialize();
        tvi50pdfs('generatetvi50',data);
    });
}

function tvi50pdfs(url,data) {
    var crsf = $('meta[name="csrf-token"]').attr("content");
    var datavar = '_csrf='+crsf+'&'+data;
    console.log(data);
    var to = $('#tvi50pdfs').val();
    $.ajax({
        url: to,
        data: datavar,
        type: 'POST',
        success: function (data, textStatus, jQxhr) {
            console.log(data)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

   // window.open(to+'?'+datavar)
}