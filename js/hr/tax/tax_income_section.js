$(document).ready(function() {
    var html = null;
    // $("#btnSaveSection").click(function() {
    //     saveconfigSection();
    // });
    listDropDown();
});

function listDropDown() {
    var dropdown = null;
    $.get('listtype', function(res) {
        $.each(res, function(index, value) {
            dropdown += '<option value="' + value.id + '">' + value.taxincome_type + '</option>';
        });
        $('#sectionList').html(dropdown);
    });
}
//
function saveconfigSection() {
    // var postData = {};
    // postData.id_temp = $('#activity_idtax').val();
    // postData.detail_temp = $('#activity_detailtax').val();

    // console.log(postData);
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะเพิ่มข้อมูลราย หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var postData = {};
                postData.id = $('#id').val();
                postData.tax_section_name = $('#tax_section_name').val();
                postData.tax_income_type_id = $('#tax_income_type_id').val();
                postData.expenses_percent = $('#expenses_percent').val();
                postData.expenses_notover = $('#expenses_notover').val();
                postData.comment = $('#comment').val();
                postData.activity_status = $('#type_status').val();
                // console.log(datapostdete);
                $.ajax({
                    method: "post",
                    url: "saveconfigsection",
                    data: postData,
                    success: function(data) {
                        console.log(data);
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบลบข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            box.modal('hide');
                        }, BootboxTimeOut);
                        $.pjax.reload({ container: "#pjax_taxSection" });
                        $('#modalfrmIncomeSection').modal('hide');
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });


}

function suubmitfrmIncomeSection() {
    var valid = $('#frmIncomeSection').validator('validate').has('.has-error').length;
    if (valid == 0) {
        saveconfigSection();
    } else {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ตรวจสอบข้อมมูลอีกครั้ง",
        });
    }
    return false;
}

function getUpdateSection(id) {
    $.get('getupdateconfigsection', { id: id }, function(res) {
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
        $('#activity_status').val(res.status_active);
        $('#modalfrmIncomeSection').modal('show');
    });

}

function DeleteSection(id) {
    $.get('deleteconfigsection', { id: id }, function(res) {
        if (res == 1) {
            bootbox.alert({
                size: "small",
                title: "แจ้งเตือน",
                message: "ระบบลบข้อมูลเรียบร้อย",
            });
        }
    });
    $.pjax.reload({ container: "#pjax_taxSection" });
}