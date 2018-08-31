$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmBleveleducation');
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

function deleteleveleducationl(id) {
    // alert(id);
    $.ajax({
        url: 'deleteleveleducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                $.pjax.reload({ container: "#pjax_tb_bleveleducation" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function saveleveleducation() {
    var datavar = $('#frmBleveleducation').serialize();
    // if (idselectform == 1) {
    //     var datavar = $('#frmAdddeduct').serialize();
    // } else {
    //     var datavar = $('#frmDeduct').serialize();
    // }
    // console.log(datavar);
    $.ajax({
        url: 'saveleveleducation',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBleveleducation');
                $.pjax.reload({ container: "#pjax_tb_bleveleducation" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editleveleducation(id) {
    initForm('frmBleveleducation');
    //console.log(x);
    $.ajax({
        url: 'updateleveleducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            console.log(data);
            $('#level_education').val(data.level_education);
            $('#hide_activitybtitel5').val(data.id);
            $('#status_active5').val(data.status_active);

            $('#modalfrmleveleducation').modal();

        }
    });
}


function getdatesubmit5() {
    var valid = $('#frmBleveleducation').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    saveleveleducation();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmBleveleducation').reset();

}