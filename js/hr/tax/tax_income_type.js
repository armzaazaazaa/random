$(document).ready(function() {
    // $("#btnSaveconfigType").click(function() {
    //     saveconfigType();
    // });
});

function suubmitfrmincomeType() {
    var valid = $('#frmincomeType').validator('validate').has('.has-error').length;
    if (valid == 0) {
        saveconfigType();
    } else {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ตรวจสอบข้อมมูลอีกครั้ง",
        });
    }
    return false;
}

function saveconfigType() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะเพิ่มข้อมูลราย หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var postData = {};
                postData.id = $('#id_type').val();
                postData.taxincome_type = $('#taxincome_type').val();
                postData.activity_status = $('#type_status').val();
                // console.log(datapostdete);
                $.ajax({
                    method: "post",
                    url: "saveconfigtype",
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
                        $.pjax.reload({ container: "#pjax_taxtype" });
                        $('#modalfrmincomeType').modal('hide');
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });
}

function getUpdateType(id) {
    $.get('getupdateconfigtype', { id: id }, function(res) {
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
        $('#id_type').val(res.id);
        //$('#type_status').val(res.status_active);
        $("#type_status option[value='" + res.status_active + "']").prop("selected", true);
        $('#modalfrmincomeType').modal('show');
    });
}

function DeleteType(id) {
    $.get('deleteconfigtype', { id: id }, function(res) {
        if (res == 1) {
            bootbox.alert({
                size: "small",
                title: "แจ้งเตือน",
                message: "ระบบลบข้อมูลเรียบร้อย",
            });
        }
    });
    $.pjax.reload({ container: "#pjax_taxtype" });
}