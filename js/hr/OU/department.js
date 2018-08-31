$(document).ready(function() {
    $('#Btn_save').click(function() {
        var deparmentInpus = null;
        deparmentInpus = $('#AddDeparmentForm').serializeArrayAnything();
        var deparment = JSON.stringify(deparmentInpus);
        if (deparmentInpus.check == 1) {
            $.post('departmentbyidupdate', { deparmentInsert: deparment }, function(res) {
                if (res == 1) {
                    $('#ConfirmDialog').modal('hide');
                    $('#addDialog').modal('hide');
                    $.pjax.reload({ container: "#pjax_grid_department" }); //Reload GridView
                    HornBill.show("บันทึกข้อมูลเรียบร้อยแล้ว ");
                }
            });
        } else {
            $.post('adddepartment', { deparmentInsert: deparment }, function(res) {
                if (res == 1) {

                    $('#ConfirmDialog').modal('hide');
                    $('#addDialog').modal('hide');
                    $.pjax.reload({ container: "#pjax_grid_department" }); //Reload GridView
                    HornBill.show("แก้ไขข้อมูลเรียบร้อยแล้ว ");
                }
            });
        }

    });

    $('#cancleSave').click(function() { $('#ConfirmDialog').modal('hide'); });
    $('#code_name').blur(function() {
        var code_name = $('#code_name').val();
        var company_id = $('#companyid').val();
        $.post('checkdepartment', { data: code_name, company_id: company_id }, function(res) {
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

function reset() {
    $('#check').val(0);
    document.getElementById('AddDeparmentForm').reset();
    $('#addDialog').modal('show');
}

function getdatesubmit() {
    var valid = $('#AddDeparmentForm').validator('validate').has('.has-error').length;
    if (valid == 0) {
        $('#cancleSave').click(function() { $('#ConfirmDialog').modal('hide'); });

    }
    return false;
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

function deleteDeparmentByid(id, company) {
    $.post('compandeletebyid', { id: id }, function(res) {
        if (res == 1) {
            $.pjax.reload({ container: "#pjax_grid_department" }); //Reload GridView
            HornBill.show("ลบข้อมูลเรียบร้อยแล้ว ");
        }
    });
}

function editDepartmentByid_get(iddepartment) {
    $.get('departmentbyid', { iddepartment: iddepartment }, function(res) {
        $('#addDialog').modal('show');
        $('#id').val(res.id);
        $('#check').val(1);
        $('#id').val(res.id);
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
    });
}

function showFormsection(iddepartment, company) {
    sectionbyid(iddepartment, company);
}

function sectionbyid(iddepartment, company) {
    var obj = {};
    obj.iddepartment = iddepartment;
    obj.company = company;
    $.get('sectionbyiddepartment', { obj: obj });
}