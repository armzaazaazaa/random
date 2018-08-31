$(document).ready(function() {

    $('#confirmSave').click(function() {});
    $('#code_name').blur(function() {
        var code_name = $('#code_name').val();
        $.post('checkworkingcompany', { data: code_name }, function(res) {
            if (res.length > 0) {
                bootbox.alert({
                    size: 'small',
                    message: "<h4 class=\"btalertsave\">รหัสช้ำ !!!!</h4>",
                    callback: function() {
                        $('#code_name').val('');
                    }
                });
            }
        });
        var uppercase = $('#code_name').val().toUpperCase();
        $('#code_name').val(uppercase);
    });
});

function Saveconpany() {
    var conpanyInpus = null;
    conpanyInpus = $('#companyForm').serializeArrayAnything();
    if (conpanyInpus.company_type = "1") {
        conpanyInpus.branch_comment = "สำนักงานใหญ่";
    } else if (conpanyInpus.company_type = "2") {
        conpanyInpus.branch_comment = "สาขา";
    }
    var conpany = JSON.stringify(conpanyInpus);
    if (conpanyInpus.check == 1) {
        $.post('companupdetbyid', { companyInsert: conpany }, function(res) {
            if (res == 1) {
                $('#ConfirmDialog').modal('hide');
                $('#myModal').modal('hide');
                HornBill.show("บันทึกข้อมูลเรียบร้อยแล้ว ");
            }
        });
    } else {
        $.post('companyinsert', { companyInsert: conpany }, function(res) {
            if (res == 1) {

                $('#ConfirmDialog').modal('hide');
                $('#myModal').modal('hide');
                $.pjax.reload({ container: "#pjax_grid_company" }); //Reload GridView
                HornBill.show("แก้ไขข้อมูลเรียบร้อยแล้ว ");
            }
        });
    }
}

function getdatesubmit() {
    var valid = $('#companyForm').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    Saveconpany();
                }
            }
        });
    }
    return false;
}

function reset() {
    document.getElementById('companyForm').reset();
    $('#myModal').modal('show');
}

function deleteCompanyByid(id, company) {
    bootbox.confirm("ต้องที่ลบข้อมูลของบริษัท " + company + "?", function(result) {
        if (result == 1) {
            $.post('compandeletebyid1', { id: id }, function(res) {
                if (res == 1) {
                    $.pjax.reload({ container: "#pjax_grid_company" }); //Reload GridView
                    HornBill.show("ลบข้อมูลเรียบร้อยแล้ว ");
                }
            });

        }
    });
}
(function($) {

    $.fn.serializeArrayAnything = function() {

        var toReturn = new Object();
        var els = $(this).find(':input').get();

        $.each(els, function() {
            //if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) { 
            if (this.name && (!this.disabled || $(this).hasClass('except_disable')) && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
                //if (this.name && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) { 
                var val = $(this).val();
                // toReturn.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( val ) ); 
                // toReturn[encodeURIComponent(this.name)] = encodeURIComponent( val ); 
                toReturn[this.name] = val;
            }
        });

        //return toReturn.join("&").replace(/%20/g, "+"); 
        return toReturn;

    }

})(jQuery);

function editCompanyByid_get(idCompany,editall) {
    initForm('myModal')
    $.get('companeditbyid', { idCompany: idCompany }, function(res) {
        $('#myModal').modal('show');
        $('#check').val(1);
        $('#id').val(res.id);
        var c = 0;
        $.each(res, function(index, value) {
            if (index == 'company_type') {
                if (value == '1') {
                    // $('#TypeCompany1').checked();
                    $("#TypeCompany1").attr('checked', 'checked');
                } else {
                    //$('#TypeCompany2').checked();
                    $("#TypeCompany2").attr('checked', 'checked');
                }
            }
            $('#' + index).val(value);
        });
    });

    if(editall==0) {
        $('#name').prop('disabled', true);
        $('#name_eng').prop('disabled', true);
        $('#short_name').prop('disabled', true);
        $('#code_name').prop('disabled', true);
    }
    else {
        $('#name').prop('disabled', false);
        $('#name_eng').prop('disabled', false);
        $('#short_name').prop('disabled', false);
        $('#code_name').prop('disabled', false);
    }

}