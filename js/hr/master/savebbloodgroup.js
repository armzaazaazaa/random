$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmBbloodgroup');
    //     console.log(f);
    //     if (!f) {
    //         showWarningInputForm();
    //         // alert('zxxxx');
    //     } else {
    //         savebtitel();
    //     }
    // });

    // $("#btnSaveBtitle").click();

    $('#btnAddNewBloodgroup').on("click", function() {
        initForm('btnSaveBtitle');
    });

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

function deletebloodgroup(id) {
    // alert(id);
    $.ajax({
        url: 'deletebloodgroup',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                $.pjax.reload({ container: "#pjax_tb_bbloodgroup" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function savebloodgroup() {
    var datavar = $('#frmBbloodgroup').serialize();
    // if (idselectform == 1) {
    //     var datavar = $('#frmAdddeduct').serialize();
    // } else {
    //     var datavar = $('#frmDeduct').serialize();
    // }
    // console.log(datavar);
    $.ajax({
        url: 'savebloodgroup',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBbloodgroup');
                $.pjax.reload({ container: "#pjax_tb_bbloodgroup" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editbloodgroup(id) {
    initForm('frmBbloodgroup');
    //console.log(x);
    $.ajax({
        url: 'updatebloodgroup',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            console.log(data);
            $('#bloodgroup').val(data.bloodgroup);
            $('#hide_activitybtitel2').val(data.id);
            $('#status_active2').val(data.status_active);

            $('#modalfrmBbloodgroup').modal();

        }
    });
}


function getdatesubmit2() {
    // $('#frmBbloodgroup').submit();
    var valid = $('#frmBbloodgroup').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    savebloodgroup();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmBbloodgroup').reset();

}