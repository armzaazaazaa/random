$(document).ready(function() {
    ///ส่วนจ่าย///
    $("#btnSaveActivity").on("click", function() {
        var f = frmValidate('frmAdddeduct');
        if (!f) {
            showWarningInputForm();
        } else {
            $('.ADD_DEDUCT_TEMPLATE_TYPE').val('1');
            saveadddeductactivity(1);

        }
    });

    $('#btnAddNewAdddeduct').on("click", function() {
        initForm('btnSaveActivity');
    });

    ///ส่วนหัก///
    $("#btnSaveActivityDeduct").on("click", function() {
        var f = frmValidate('frmDeduct');
        if (!f) {
            showWarningInputForm();
        } else {
            $('.ADD_DEDUCT_TEMPLATE_TYPE').val('2');
            saveadddeductactivity(2);
        }
    });

    $('#btnAddNewDeduct').on("click", function() {
        initForm('btnSaveActivityDeduct');
    });
});

function deleteaddeduct(id, valselect) {
    // alert(id);
    $.ajax({
        url: 'deleteaddeduct',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showDeleteSuccess();

                selecttab(valselect);
            } else {
                showDeleteError();
                console.log(data);
            }
        }
    });
}

function saveadddeductactivity(idselectform) {
    if (idselectform == 1) {
        var datavar = $('#frmAdddeduct').serialize();
    } else {
        var datavar = $('#frmDeduct').serialize();
    }
    // console.log(datavar);
    $.ajax({
        url: 'saveadddeductactivity',
        data: datavar,
        type: 'POST',
        success: function(data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                if (idselectform == 1) {
                    initForm('frmAdddeduct');
                } else {
                    initForm('frmDeduct');
                }

                selecttab(idselectform);
                //$.pjax.reload({container: "#pjax_tb_adddeducttemp"});  //Reload GridView
            } else { showSaveError(); }
        }
    });
}


function editaddedduct(id, valueform) {
    // console.log(id);
    if (valueform == 1) {
        initForm('frmAdddeduct');
    } else {
        initForm('frmDeduct');
    }

    $.ajax({
        url: 'updateadddeduct',
        data: { id: id, },
        type: 'POST',
        success: function(data) {
            // console.log(data);
            $('.hide_activityedit').val(data.ADD_DEDUCT_TEMPLATE_ID);
            $('.ADD_DEDUCT_TEMPLATE_NAME').val(data.ADD_DEDUCT_TEMPLATE_NAME);

            $('.accounting_code_pk').val(data.accounting_code_pk);

            $(".ADD_DEDUCT_TEMPLATE_STATUS option[value='" + data.ADD_DEDUCT_TEMPLATE_STATUS + "']").attr("selected", "selected");
            if (data.ADD_DEDUCT_TEMPLATE_LOAN_REPORT == '1') {
                $('.ADD_DEDUCT_TEMPLATE_LOAN_REPORT').prop('checked', true);
            } else {
                $('.ADD_DEDUCT_TEMPLATE_LOAN_REPORT').prop('checked', false);
            }
            if (data.ADD_DEDUCT_TEMPLATE_TYPE == '1') {
                $('.ADD_DEDUCT_TEMPLATE_TYPE').val('1');
                //$(".tax_section_id option[value='" + data.tax_section_id + "']").attr("selected", "selected");
                $(".tax_section_id").val(data.tax_section_id);
                //$(".taxincome_type_id option[value='" + data.taxincome_type_id + "']").attr("selected", "selected");
                $(".taxincome_type_id").val(data.taxincome_type_id);
                $('.tax_rate').val(data.tax_rate);
                $('#accounting_code_pk').val(data.accounting_code_pk);

            } else {
                $('.ADD_DEDUCT_TEMPLATE_TYPE').val('2');
            }

            if (valueform == 1) {
                $('#modalfrmAdddeduct').modal();
            } else {
                $('#modalfrmDeduct').modal();
            }

        }
    });
}

// function editdedduct(id) {
//     console.log(id);
//     //initForm('frmAdddeduct');
//     $.ajax({
//         url: 'updateadddeduct',
//         data: {id: id,},
//         type: 'POST',
//         success: function (data) {
//             //console.log(data);
//             $('.hide_activityedit').val(data.ADD_DEDUCT_TEMPLATE_ID);
//             $('.ADD_DEDUCT_TEMPLATE_NAME').val(data.ADD_DEDUCT_TEMPLATE_NAME);

//             $(".ADD_DEDUCT_TEMPLATE_STATUS option[value='"+data.ADD_DEDUCT_TEMPLATE_STATUS+"']").attr("selected", "selected");
//             if(data.ADD_DEDUCT_TEMPLATE_LOAN_REPORT == '1'){
//                 $('.ADD_DEDUCT_TEMPLATE_LOAN_REPORT').prop('checked', true);
//             }else{
//                 $('.ADD_DEDUCT_TEMPLATE_LOAN_REPORT').prop('checked', false);
//             }

//             $('.ADD_DEDUCT_TEMPLATE_TYPE').val(data.ADD_DEDUCT_TEMPLATE_TYPE);

//              $('#modalfrmDeduct').modal();
//         }
//     });
// }

// function savedeductactivity() {
//     var datavar = $('#frmAdddeduct').serialize();

//     console.log(datavar);
//     $.ajax({
//         url: 'saveadddeductactivity',
//         data: datavar,
//         type: 'POST',
//         success: function (data) {
//             if(parseInt(data)==1) {
//                 showSaveSuccess();
//                 initForm('frmAdddeduct');
//                 $.pjax.reload({container: "#pjax_tb_adddeducttemp"});  //Reload GridView
//             }
//             else { showSaveError(); }
//         }
//     });
// }

function selecttab(val) {
    //alert("2222" + val);
    // console.log($("#tabselect" + val));
    $(".tabselect").removeClass("active");
    $("#tabselect" + val).addClass("active");
    $("#tab" + val).addClass("active");

    if (val == 1) {
        $.pjax.reload({ container: "#pjax_tb_adddeducttemp" }); //Reload GridView
    } else {
        $.pjax.reload({ container: "#pjax_tb_deducttemp" }); //Reload GridView
    }


}