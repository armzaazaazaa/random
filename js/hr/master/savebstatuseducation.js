$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmBstatuseducation');
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

function deletestatuseducationl(id) {
    // alert(id);
    $.ajax({
        url: 'deletestatuseducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                $.pjax.reload({ container: "#pjax_tb_bstatuseducation" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function savestatuseducation() {
    var datavar = $('#frmBstatuseducation').serialize();
    // if (idselectform == 1) {
    //     var datavar = $('#frmAdddeduct').serialize();
    // } else {
    //     var datavar = $('#frmDeduct').serialize();
    // }
    // console.log(datavar);
    $.ajax({
        url: 'savestatuseducation',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBstatuseducation');
                $.pjax.reload({ container: "#pjax_tb_bstatuseducation" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editstatuseducation(id) {
    initForm('frmBstatuseducation');
    //console.log(x);
    $.ajax({
        url: 'updatestatuseducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            console.log(data);
            $('#status_education').val(data.status_education);
            $('#hide_activitybtitel4').val(data.id);
            $('#status_active4').val(data.status_active);

            $('#modalfrmStatuseducation').modal();

        }
    });
}


function getdatesubmit4() {
    var valid = $('#frmBstatuseducation').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    savestatuseducation();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmBstatuseducation').reset();

}