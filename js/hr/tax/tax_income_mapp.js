$(document).ready(function() {
    var html;
    // $("#btnSaveConfigTemp").click(function() {
    //     saveconfigdeductemp();
    // });
    $.get('listtemplate', function(res) {
        $.each(res, function(index, value) {
            html += '<option value="' + value.ADD_DEDUCT_TEMPLATE_ID + '">' + value.ADD_DEDUCT_TEMPLATE_NAME + '</option>';
        });
        $('#mappingList1').html(html);

    });
    $.get('listtemplatededuct', function(res) {
        $.each(res, function(index, value) {
            html += '<option value="' + value.ADD_DEDUCT_TEMPLATE_ID + '">' + value.ADD_DEDUCT_TEMPLATE_NAME + '</option>';
        });
        $('#ListName').html(html);

    });
});
function suubmitfrmConfigDeActivity(){
      var valid = $('#frmConfigDeActivity').validator('validate').has('.has-error').length;
    if (valid == 0) {
        saveconfigdeductemp();
    } else {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ตรวจสอบข้อมมูลอีกครั้ง",
        });
    }
    return false;
}
function saveconfigdeductemp() {
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
                postData.id = $('#Deducttionid').val();
                postData.id_temp = $('#add_deduct_template_id1').val();
                postData.detail_temp = $('#detail_add_deduct_template').val();
                // console.log(datapostdete);
                $.ajax({
                    method: "post",
                    url: "saveconfigtemp",
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
                        $.pjax.reload({ container: "#pjax_taxdeducttemp" });
                        $('#modalfrmConfigDeActivity').modal('hide');
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });
    $(':input').val('');
}

function geteditmapp(id) {
    $.get('getupdateconfigtemp', { id: id }, function(res) {
        $('#add_deduct_template_id1').val(res.add_deduct_template_id);
        $('#detail_add_deduct_template').val(res.detail_add_deduct_template);
        $('#Deducttionid').val(res.id);
        $('#modalfrmConfigDeActivity').modal('show');
    });
}

function deleteeditmapp(id) {
    $.post('deletededuction', { id: id }, function(res) {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ระบบลบข้อมูลเรียบร้อย",
        });
        $.pjax.reload({ container: "#pjax_taxdeducttemp" });
    });
}