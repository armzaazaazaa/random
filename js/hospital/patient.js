$(document).ready(function () {

    $("#btnSaveActivitypatient").on("click", function () {
        var f = frmValidate('frmAddpatient');
        if (!f) {
            //    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
            showWarningInputForm();
        } else {
            $('.status_active').val('1');
            //       console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            savepatient(1);

        }
    });

    $('#btnAddNewpatient').on("click", function () {
        initForm('btnSaveActivitypatient');

    });



    $('#btnAddNewpatient').on("click", function () {
        initForm('btnSaveActivitypatient');
        $('#hide_activityedit_patient').val('');
        $('#name').val('');
        $('#gender').val('');
        $('#age').val('');
        $('#height').val('');
        $('#weight').val('');


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
        var datavar = $('#frmAddpatient').serialize();
    } else {
        var datavar = $('#frmDeduct').serialize();
    }
    // console.log(datavar);
    $.ajax({
        url: 'savepatient',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                if (idselectform == 1) {
                    initForm('frmAddpatient');
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
    initForm('frmAddpatient');//idฟอมมมมม
    $.ajax({
        url: 'updatepatient',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            console.log(data);


            $('#hide_activityedit_patient').val(data.id);
            $('#name').val(data.name);
            $('#gender').val(data.gender);
            $('#age').val(data.age);
            $('#height').val(data.height);
            $('#weight').val(data.weight);
            $('#modalfrmAddpatient').modal();
        }
    });
}

function savepatient() {//อันนี้นี้เซฟเน้ออออออออออออออออ
    var datavar = $('#frmAddpatient').serialize();

    console.log(datavar);
    $.ajax({
        url: 'savepatient',
        data: datavar,
        type: 'POST',
        success: function (data) {
            console.log(data);
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmAddpatient');
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
        $.pjax.reload({container: "#pjax_tb_patient"}); //Reload GridView
    }


}