$(document).ready(function() {
    // $("#btnSaveReduce").click(function() {
    //     saveconfigReduce_other();
    // });
});

function suubmitfrmReduce_other() {
    var valid = $('#frmReduce_other').validator('validate').has('.has-error').length;
    if (valid == 0) {
        saveconfigReduce_other();
    } else {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ตรวจสอบข้อมมูลอีกครั้ง",
        });
    }
    return false;
}

function saveconfigReduce_other() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะเพิ่มข้อมูลราย หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var postData = {};
                postData.id = $('#reduc_id').val();
                postData.reduce_name = $('#reduce_name').val();
                postData.reduce_amount = $('#reduce_amount').val();
                postData.reduce_amount_max = $('#reduce_amount_max').val();
                postData.for_year = $('#for_year').val();
                postData.activity_status = $('#activity_status_reduc').val();
                // console.log(datapostdete);
                $.ajax({
                    method: "post",
                    url: "saveconfigreduceother",
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
                        $.pjax.reload({ container: "#pjax_reduce_other" });
                        $('#modalfrmReduce_other').modal('hide');
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });
}

function getUpdateReduce_other(id) {
    $.get('getupdateconfigreduceother', { id: id }, function(res) {
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
        $('#reduc_id').val(res.id);
        //$('#type_status').val(res.status_active);
        $("#activity_status_reduc option[value='" + res.status_active + "']").prop("selected", true);
        $('#modalfrmReduce_other').modal('show');
    });
}

function DeleteReduce_other(id) {
    $.get('deleteconfigreduceother', { id: id }, function(res) {
        if (res == 1) {
            bootbox.alert({
                size: "small",
                title: "แจ้งเตือน",
                message: "ระบบลบข้อมูลเรียบร้อย",
            });
        }
    });
    $.pjax.reload({ container: "#pjax_reduce_other" });
}