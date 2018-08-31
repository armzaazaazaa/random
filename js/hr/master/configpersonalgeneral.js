$(document).ready(function() {

    $("#btnSaveBtitle").on("click", function() {
        var f = frmValidate('frmBtitle');
        if (!f) {
            showWarningInputForm();
        } else {


        }
    });

    $('#btnAddNewAdddeduct').on("click", function() {
        initForm('btnSaveBtitle');
    });

});

function selectlanguage(vallanguage) {
    alert(vallanguage);
    if (vallanguage == 1) {
        $('#title_name_th').attr("data-required", "false");
        $('#title_name_th').attr("data-required", "false");
        $('#title_name_en').attr("data-required", "true");
    } else {

    }


}

function deletebtitel(id) {
    // alert(id);
    $.ajax({
        url: 'deletebtitel',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}