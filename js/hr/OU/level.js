$(document).ready(function() {

});

function validsubmit() {
    var valid = $('#AddLevelForm').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันการบันทึก ? </h4>",
            callback: function(result) {
                if (result == 1) {

                    saveLevel();
                }
            }
        });
    }
    return false;
}


function saveLevel() {
    var _level = null;
    _level = $('#AddLevelForm').serializeArrayAnything();
    var lv = JSON.stringify(_level);
    $.post('savelevel', { level: lv }, function(res) {
        console.log(res);
        if (parseInt(res) == 1) {
            bootbox.alert({
                size: 'small',
                message: "<h4 class=\"btalertsave\">บันทึกข้อมูลเรียบร้อยแล้ว</h4>",
                callback: function() {
                    $.pjax.reload({ container: "#pjax_grid_level" });
                    $('#modal-level').modal('hide');
                }
            });
        }
        if (parseInt(res) != 1 && parseInt(res) != 0) {
            error();
            $('#modal-level').modal('show');
        }
    });
    return false;
}

function editLevel(id) {
    var _id = (id == '') ? 1 : id;
    $.post('editlevel', { id: _id }, function(res) {
        $('#id').val(res.level_id);
        $('#check').val(1);
        $.each(res, function(index, value) {
            $('#' + index).val(value);
        });
        $('#modal-level').modal('show');
    });


}

function getsectionByid(iddepartment, company) {
    var obj = {};
    obj.iddepartment = iddepartment;
    obj.company = company;
    $.get('sectionbyiddepartment', { obj: obj });
}

function editSectionByid_get(idsection) {
    $.get('sectionbyid', { idsection: idsection }, function(res) {
        $('#modal-level').modal('show');
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
    document.getElementById('AddLevelForm').reset();
    $('#modal-level').modal('show');
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


function deleteLevelByid(id) {
    $.post('leveldeletebyid', { id: id }, function(res) {
        if (res == 1) {
            bootbox.confirm({
                size: "small",
                message: "<h4 class=\"btalert\">ลบข้อมูลเรียบร้อย !! </h4>",
                callback: function(result) {
                    if (result == 1) {
                        $.pjax.reload({ container: "#pjax_grid_level" }); //Reload GridView
                        HornBill.show("ลบข้อมูลเรียบร้อยแล้ว ");
                    }
                }
            });

        }
    });
}

function getdatasubmit() {
    var valid = $('#AddLevelForm').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันการบันทึก ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    $.pjax.reload({ container: "#pjax_grid_level" });
                    $('#ConfirmDialog').modal('hide');
                }
            }
        });
    }
    return false;
}

function error() {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalertsave\">ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจตรวบแล้วบันทึกอีกครั้ง</h4>",
        callback: function() {
            $.pjax.reload({ container: "#pjax_grid_level" });
        }
    });
}