$(document).ready(function() {
    $('#Btn_save').click(function() {
        var conpanyInpus = null;
        conpanyInpus = $('#AddSectionForm').serializeArrayAnything();
        var conpany = JSON.stringify(conpanyInpus);
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันการบันทึก ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    if (conpanyInpus.check == 1) {
                        $.post('sectionbyidupdate', { sectionInsert: conpany }, function(res) {
                            if (res == 1) {
                                $('#ConfirmDialog').modal('hide');
                                $('#addsection').modal('hide');
                                $.pjax.reload({ container: "#pjax_grid_section" }); //Reload GridView
                                HornBill.show("บันทึกข้อมูลเรียบร้อยแล้ว ");
                            }
                        });
                    } else {
                        $.post('sectioninsert', { sectionInsert: conpany }, function(res) {
                            if (res == 1) {
                                $('#ConfirmDialog').modal('hide');
                                $('#addsection').modal('hide');
                                $.pjax.reload({ container: "#pjax_grid_section" }); //Reload GridView
                                HornBill.show("แก้ไขข้อมูลเรียบร้อยแล้ว ");
                            }
                        });
                    }
                }
            }
        });
    });
    $('#code_name').blur(function() {
        var code_name = $('#code_name').val();
        var department = $('#department').val();
        $.post('checksection', { data: code_name, department: department }, function(res) {
            console.log(res);
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
    });
});

function getsectionByid(iddepartment, company) {
    var obj = {};
    obj.iddepartment = iddepartment;
    obj.company = company;
    $.get('sectionbyiddepartment', { obj: obj });
}

function editSectionByid_get(idsection) {
    $.get('sectionbyid', { idsection: idsection }, function(res) {
        $('#addsection').modal('show');
        $('#id').val(res.id);
        $('#check').val(1);
        $('#id').val(res.id);
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
    });
}

function reset() {
    $('#check').val(0);
    document.getElementById('AddSectionForm').reset();
    $('#addsection').modal('show');
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

function deleteSectioByid(id) {
    $.post('sectiondeletebyid', { id: id }, function(res) {
        if (res == 1) {
            $.pjax.reload({ container: "#pjax_grid_section" }); //Reload GridView
            HornBill.show("ลบข้อมูลเรียบร้อยแล้ว ");
        }
    });
}