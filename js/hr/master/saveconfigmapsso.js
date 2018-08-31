
function deleteconfigmapsso(id) {
    // alert(id);
    $.ajax({
        url: 'deleteconfigmapsso',
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


function saveconfigmapsso() {
    var datavar = $('#frmConfigmaping').serialize();
    $.ajax({
        url: 'saveconfigmapping',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmConfigmaping');
                $.pjax.reload({ container: "#pjax_tb_betitel" }); //Reload GridView
                reset();
            } else { showSaveError(); }
        }
    });
}



function updateconfigmapping(id) {
    initForm('frmConfigmaping');
    //console.log(x);
    $.ajax({
        url: 'updateconfigmapping',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
             console.log(data);
            $('#hide_activityconfigmaping').val(data.id);
            $('#id_sso').val(data.id_sso);
            $('#namestatussso').val(data.namestatussso);
            $('#namestatushr').val(data.namestatushr);
            $('#status').val(data.status);

            $('#modelProvider').modal();

        }
    });
}


function getdatesubmit1() {

    var valid = $('#frmConfigmaping').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    saveconfigmapsso();
                }
            }
        });
    }

    return false;
}


function reset() {
    document.getElementById('frmConfigmaping').reset();

}