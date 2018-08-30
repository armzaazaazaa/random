$(document).ready(function () {

    $("#btnSaveActivitysymptom").on("click", function () {
        var f = frmValidate('frmAddsymptom');
        if (!f) {
            //    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
            showWarningInputForm();
        } else {
            $('.status_active').val('1');
            //       console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            savepatient(1);

        }
    });

    $('#btnAddNewsymptom').on("click", function () {
        initForm('btnSaveActivitysymptom');

    });



    $('#btnAddNewsymptom').on("click", function () {
        initForm('btnSaveActivitysymptom');
            $('#hide_activityedit_symptom').val('');
            $('#name').val('');

        // $('.select2').css({ "width": "100%" });
        // $('.select2').select2();
        $('#modalfrmAddsymptom').removeAttr('tabindex')



    });
});

function deletepatient(id, valselect) { //อันนี้ยกเลิกเน้อออออออออออออออออ
    // alert(id);
    $.ajax({
        url: 'deletepatient',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();
                console.log(data);
                $.pjax.reload({container: "#pjax_tb_patient"});  //Reload GridView

                selecttab(valselect);
            } else {
                showDeleteError();
                console.log(data);

            }
        }
    });
}
function savepatient(idselectform) {
    if (idselectform == 1) {
        var datavar = $('#frmAddsymptom').serialize();
    } else {
        var datavar = $('#frmDeduct').serialize();
    }
    // console.log(datavar);
    $.ajax({
        url: 'savesymptom',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                if (idselectform == 1) {
                    initForm('frmAddsymptom');
                } else {
                    initForm('frmDeduct');
                }

                selecttab(idselectform);
                //$.pjax.reload({container: "#pjax_tb_adddeducttemp"});  //Reload GridView
            } else {
                showSaveError();
            }
        }
    });
}
function updatepatient(id) {//แก้ไขเน้อออออออออออ
    // console.log(id);
    initForm('frmAddsymptom');//idฟอมมมมม
    $.ajax({
        url: 'updatepatient',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            console.log(data);


            $('#hide_activityedit_symptom').val(data.id);
            $('#id_patient').val(data.id_patient);
            $('#modalfrmAddsymptom').modal();
        }
    });
}


function savepatient() {//อันนี้นี้เซฟเน้ออออออออออออออออ
    var datavar = $('#frmAddsymptom').serialize();

    console.log(datavar);
    $.ajax({
        url: 'savepatient',
        data: datavar,
        type: 'POST',
        success: function (data) {
            console.log(data);
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmAddsymptom');
                $.pjax.reload({container: "#pjax_tb_patient"});  //Reload GridView
            }
            else {
                showSaveError();
            }
        }
    });
}

function selecttab(val) {
    //alert("2222" + val);
    // console.log($("#tabselect" + val));
    $(".tabselect").removeClass("active");
    $("#tabselect" + val).addClass("active");
    $("#tab" + val).addClass("active");

    if (val == 1) {
        $.pjax.reload({container: "#pjax_tb_adddeducttemp"}); //Reload GridView
    } else {
        $.pjax.reload({container: "#pjax_tb_symptom"}); //Reload GridView
    }


}