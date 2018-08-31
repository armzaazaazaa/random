$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmBinstitutioneducation');
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

function deleteinstitutioneeducation(id) {
    // alert(id);
    $.ajax({
        url: 'deleteinstitutioneeducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                $.pjax.reload({ container: "#pjax_tb_binstitutioneducation" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function saveinstitutioneducation() {
    var datavar = $('#frmBinstitutioneducation').serialize();
    // if (idselectform == 1) {
    //     var datavar = $('#frmAdddeduct').serialize();
    // } else {
    //     var datavar = $('#frmDeduct').serialize();
    // }
    // console.log(datavar);
    $.ajax({
        url: 'saveinstitutioneducation',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBinstitutioneducation');
                $.pjax.reload({ container: "#pjax_tb_binstitutioneducation" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editinstitutioneducation(id) {
    initForm('frmBinstitutioneducation');
    //console.log(x);
    $.ajax({
        url: 'updateinstitutioneducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            console.log(data);
            $('#institution_education').val(data.institution_education);
            $('#hide_activitybtitel7').val(data.id);
            $('#status_active7').val(data.status_active);

            $('#modalfrminstitutioneducation').modal();

        }
    });
}


function getdatesubmit7() {
    var valid = $('#frmBinstitutioneducation').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    saveinstitutioneducation();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmBinstitutioneducation').reset();

}