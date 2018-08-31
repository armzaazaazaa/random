$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmStatuspersonal');
    //     console.log(f);
    //     if (!f) {
    //         showWarningInputForm();
    //         // alert('zxxxx');
    //     } else {
    //         savebtitel();
    //     }
    // });

    // $("#btnSaveBtitle").click();

    // $('#btnAddNewStatuspersonal').on("click", function() {
    //     initForm('btnSaveBtitle');
    // });

});

// function selectlanguage(vallanguage) {
//     // alert(vallanguage);
//     if (vallanguage == 1) {
//         $('#title_name_th').removeAttr('disabled');
//         $('#title_name_th').attr("data-required", "true");
//         $('#title_name_en').attr("disabled", "true");
//         $('#title_name_en').attr("data-required", "false");
//     } else {
//         $('#title_name_en').removeAttr('disabled');
//         $('#title_name_en').attr("data-required", "true");
//         $('#title_name_th').attr("disabled", "true");
//         $('#title_name_th').attr("data-required", "false");
//     }


// }

function deletestatuspersonal(id) {
    // alert(id);
    $.ajax({
        url: 'deletestatuspersonal',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                $.pjax.reload({ container: "#pjax_tb_bstatuspersonal" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function savestatuspersonal() {
    var datavar = $('#frmStatuspersonal').serialize();
    // if (idselectform == 1) {
    //     var datavar = $('#frmAdddeduct').serialize();
    // } else {
    //     var datavar = $('#frmDeduct').serialize();
    // }
    // console.log(datavar);
    $.ajax({
        url: 'savestatuspersonal',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmStatuspersonal');
                $.pjax.reload({ container: "#pjax_tb_bstatuspersonal" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editstatuspersonal(id) {
    initForm('frmStatuspersonal');
    //console.log(x);
    $.ajax({
        url: 'updatestatuspersonal',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            console.log(data);
            $('#status_personal').val(data.status_personal);
            $('#hide_activitybtitel3').val(data.id);
            $('#status_active3').val(data.status_active);

            $('#modalfrmStatuspersonal').modal();

        }
    });
}


function getdatesubmit3() {
    // $('#frmStatuspersonal').submit();
    var valid = $('#frmStatuspersonal').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    savestatuspersonal();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmStatuspersonal').reset();

}