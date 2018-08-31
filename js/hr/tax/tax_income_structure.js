$(document).ready(function() {
    // $("#btnSavestructure").click(function() {
    //     $('#frmstructure').submit();
    //     //saveconfigstructure();
    // });


    $("[data-mask]").inputmask();
    $('#from_year').blur(function(element) {
        var check = checkYearstart($('#from_year').val());
        if (check == false) {
            $('#frm-from_year').closest('.form-group').addClass('has-error')
        } else if (check == true) {
            $('#frm-from_year').closest('.form-group').removeClass('has-error')
        }
    });
    $('#to_year').blur(function(element) {
        var check = checkYearEnd($('#to_year').val());
        if (check == false) {
            $('#frm-to_year').closest('.form-group').addClass('has-error')
        } else if (check == true) {
            $('#frm-to_year').closest('.form-group').removeClass('has-error')
        }
    });
});

function suubmitfrm() {
    var valid = $('#frmOtActivity').validator('validate').has('.has-error').length;
    if (valid == 0) {
        saveconfigstructure();
    } else {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ตรวจสอบข้อมมูลอีกครั้ง",
        });
    }
    return false;
}

function checkYearstart(params) {
    var date = new Date();
    if (parseInt(params) > 2500 && params.length > 4) {
        return false;
    } else {
        return true;
    }
}

function checkYearEnd(params) {
    var date = new Date();
    if (parseInt(params) < 2500 && params.length == 4 && params > $('#from_year').val()) {
        return true;
    } else {
        return false;
    }
}

function saveconfigstructure() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะเพิ่มข้อมูลราย หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var postData = {};
                postData.id = $('#structure_id').val();
                postData.income_floor = $('#income_floor').val();
                postData.income_ceil = $('#income_ceil').val();
                postData.tax_rate = $('#tax_rate').val();
                postData.gross_step = $('#gross_step').val();
                postData.max_accumulate = $('#max_accumulate').val();
                postData.from_year = $('#from_year').val();
                postData.to_year = $('#to_year').val();
                postData.remark = $('#remark').val();
                postData.status_active = $('#status_structure').val();
                // console.log(datapostdete);
                $.ajax({
                    method: "post",
                    url: "saveconfigstructure",
                    data: postData,
                    success: function(data) {
                        console.log(data);
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {


                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');

                        }, BootboxTimeOut);
                        $.pjax.reload({ container: "#pjax_reduce_structure" });
                        $('#modalfrmstructure').modal('hide');
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });
}

function getUpdatestructure(id) {
    $.get('getupdateconfigstructure', { id: id }, function(res) {
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
        $('#structure_id').val(res.id);
        $("#status_structure option[value='" + res.status_active + "']").prop("selected", true);
        $('#modalfrmstructure').modal('show');
    });
}

function Deletestructure(id) {
    $.get('deleteconfigstructure', { id: id }, function(res) {
        if (res == 1) {
            bootbox.alert({
                size: "small",
                title: "แจ้งเตือน",
                message: "ระบบลบข้อมูลเรียบร้อย",
            });
        }
    });
    $.pjax.reload({ container: "#pjax_reduce_structure" });
}