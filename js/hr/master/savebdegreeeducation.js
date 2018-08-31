$(document).ready(function() {

    // $("#btnSaveBtitle").on("click", function() {
    //     var f = frmValidate('frmBdegreeeducation');
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

function deletedegreeeeducation(id) {
    // alert(id);
    $.ajax({
        url: 'deletedegreeeeducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                $.pjax.reload({ container: "#pjax_tb_bdegreeeducation" });
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}


function savedegreeeducation() {
    var datavar = $('#frmBdegreeeducation').serialize();
    // if (idselectform == 1) {
    //     var datavar = $('#frmAdddeduct').serialize();
    // } else {
    //     var datavar = $('#frmDeduct').serialize();
    // }
    // console.log(datavar);
    $.ajax({
        url: 'savedegreeeducation',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBdegreeeducation');
                $.pjax.reload({ container: "#pjax_tb_bdegreeeducation" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function editdegreeeducation(id) {
    initForm('frmBdegreeeducation');
    //console.log(x);
    $.ajax({
        url: 'updatedegreeeducation',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            console.log(data);
            $('#degree_education').val(data.degree_education);
            $('#hide_activitybtitel6').val(data.id);
            $('#status_active6').val(data.status_active);

            $('#modalfrmdegreeeducation').modal();

        }
    });
}


function getdatesubmit6() {
    var valid = $('#frmBdegreeeducation').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    savedegreeeducation();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmBdegreeeducation').reset();

}