$(document).ready(function() {

    // $("#btnSaveConfigMapping").click(function() {
    //     saveconfigmapping();
    // });
    //tax_income_section_id

    $("#btnSaveTaxIncome").click(function() {
        saveconfigmapping();
    });


    //getlist();
});

function saveconfigmapping()
{
    var datavar = $('#frmtaxincome').serialize();
    $.ajax({
        url: 'saveconfigmapping',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if(parseInt(data) >=1) {
                showSaveSuccess();
            }
            else { showSaveError(); }
        }
    });
}


function suubmitfrmincomemapping() {
    var valid = $('#frmincomemapping').validator('validate').has('.has-error').length;
    if (valid == 0) {
        saveconfigmapping();
    } else {
        bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "ตรวจสอบข้อมมูลอีกครั้ง",
        });
    }
    return false;
}

function getlist() {
    var html;
    $.get('listsection', function(res) {
        $.each(res, function(index, value) {
            html += '<option value="' + value.id + '">' + value.tax_section_name + '</option>';
        });
        $('#mappingList').html(html);
    });
}

function saveconfigmapping_old() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะเพิ่มข้อมูลราย หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var postData = {};
                postData.id = $('#idmapping').val();
                postData.tax_income_section_id = $('#tax_income_section_id').val();
                postData.add_deduct_template_id = $('#add_deduct_template_id').val();
                postData.tax_rate = $('#tax_rate').val();
                postData.activity_status = $('#activity_status').val();
                // console.log(datapostdete);
                $.ajax({
                    method: "post",
                    url: "saveconfigmapping",
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
                        $.pjax.reload({ container: "#pjax_incomemapping" });
                        $('#modalfrmincomemapping').modal('hide');
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

function getUpdate(id) {
    // alert(id);
    getlist();
    $.get('getupdateconfigmapping', { id: id }, function(res) {
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
        $('#idmapping').val(res.id);
        $('#activity_status').val(res.status_active);
        $('#modalfrmincomemapping').modal('show');
    });
}

function Delete(id) {
    $.get('deleteconfigmapping', { id: id }, function(res) {
        if (res == 1) {
            bootbox.alert({
                size: "small",
                title: "แจ้งเตือน",
                message: "ระบบลบข้อมูลเรียบร้อย",
            });
        }
    });
    $.pjax.reload({ container: "#pjax_incomemapping" });
}