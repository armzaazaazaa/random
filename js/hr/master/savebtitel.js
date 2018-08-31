$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmBtitle');
    //     console.log(f);
    //     if (!f) {
    //         showWarningInputForm();
    //         // alert('zxxxx');
    //     } else {
    //         savebtitel();
    //     }
    // });

    // $("#btnSaveBtitle").click();

    $('#btnAddNewBtitle').on("click", function() {
        initForm('btnSaveBtitle');
    });

});

function selectlanguage(vallanguage) {
    // alert(vallanguage);
    if (vallanguage == 1) {
        $('#title_name_th').removeAttr('disabled');
        $('#title_name_th').attr("data-required", "true");
        $('#title_name_en').attr("disabled", "true");
        $('#title_name_en').attr("data-required", "false");
    } else {
        $('#title_name_en').removeAttr('disabled');
        $('#title_name_en').attr("data-required", "true");
        $('#title_name_th').attr("disabled", "true");
        $('#title_name_th').attr("data-required", "false");
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

                $.pjax.reload({ container: "#pjax_tb_betitel" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function savebtitel() {
    var datavar = $('#frmBtitle').serialize();
    $.ajax({
        url: 'savebtitel',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBtitle');
                $.pjax.reload({ container: "#pjax_tb_betitel" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editbtitel(id) {
    initForm('frmBtitle');
    //console.log(x);
    $.ajax({
        url: 'updatebtitel',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            // console.log(data);
            $('#hide_activitybtitel').val(data.id);
            if (data.gender == "1") {
                $('#gender1').attr('checked', true);
            } else {
                $('#gender2').attr('checked', true);
            }
            if ((data.title_name_th != "") && (data.title_name_th != null)) {
                $('#language1').attr('checked', true);
                $('#title_name_th').removeAttr('disabled');
                // $('#title_name_th').attr("data-required", "true");
                $('#title_name_th').data('required', true);
                $('#title_name_en').attr("disabled", "true");
                $('#title_name_en').removeAttr('data-required');
                $('#title_name_th').val(data.title_name_th);
                //console.log('condition1');
            } else {
                $('#language2').attr('checked', true);
                $('#title_name_en').removeAttr('disabled');
                $('#title_name_en').attr("data-required", "true");
                $('#title_name_th').attr("disabled", "true");
                $('#title_name_th').removeAttr('data-required');
                $('#title_name_en').val(data.title_name_en);
                //console.log('condition2');
            }
            $('#status_active').val(data.status_active);

            $('#modalfrmBtitel').modal();

        }
    });
}


function getdatesubmit1() {
    // $('#frmBtitle').submit();
    var valid = $('#frmBtitle').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    savebtitel();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmBtitle').reset();

}