$(document).ready(function() {
    Getworktype();
    //GetLevel();

    //function get ACTION search and SELECTED DROP DOWN
    searchAndSelector();
});
var wcode = dcode = scode = lcode = wtcode = '';
var code = '';

var _optionAll = '<option value=""> ทั้งหมด </option>';
var _optionChoose = '<option value=""> กรุณาเลือก </option>';

function getCompanyForDepartment(id, c, cc, Department, mode) {
    var dropdownDept;
    var id_w;
    wcode = $('#WorkCompany option:selected').attr('data');
    code = wcode;
    if (c == 1) {

        id_w = (mode == 'edit') ? id : id.value;
        $.get('getdepartmentbyid', { id: id_w }, function(res) {
            dropdownDept = _optionChoose;
            $.each(res, function(index, value) {
                if (Department == value.id) {
                    dropdownDept += '<option value="' + value.id + '" data="' + value.code_name + '" selected="selected"> ' + value.name + ' </option>';
                    code = id_w;
                } else {
                    dropdownDept += '<option value="' + value.id + '" data="' + value.code_name + '"> ' + value.name + ' </option>';
                }
            });
            $('#Department').html(dropdownDept);
            $('#Section').html(_optionChoose);
        });
    } else {
        id_w = (mode == 'search') ? id : id.value;
        $.get('getdepartmentbyid', { id: id_w }, function(res) {
            dropdownDept = _optionAll

            $.each(res, function(index, value) {
                if (Department == value.id) {
                    dropdownDept += '<option value="' + value.id + '" data="' + value.code_name + '" selected="selected"> ' + value.name + ' </option>';
                } else {
                    dropdownDept += '<option value="' + value.id + '" data="' + value.code_name + '"> ' + value.name + ' </option>';
                }
            });
            $('#selectdepartment').html(dropdownDept);
            $('#selectsection').html(_optionAll);
        });
    }
    if (cc != 1) {
        $('#PositionCode').val(code);
    }
}

function getDepartmentForSection(id, c, cc, sec, mode) {

    var dropdownSect;
    var id_d;

    if (c == 1) {
        id_d = (mode == 'edit') ? id : id.value;
        dcode = $('#Department option:selected').attr('data');
        $.get('getsectionbyid', { id: id_d }, function(res) {
            dropdownSect = _optionChoose;
            $.each(res, function(index, value) {
                if (sec == value.id) {
                    dropdownSect += '<option value="' + value.id + '"  data="' + value.code_name + '" selected="selected"> ' + value.name + ' </option>';
                    dcode = id_d;
                } else {
                    dropdownSect += '<option value="' + value.id + '"  data="' + value.code_name + '" > ' + value.name + ' </option>';
                }
            });
            $('#Section').html(dropdownSect);
        });
    } else {
        id_d = (mode == 'search') ? id : id.value;
        $.get('getsectionbyid', { id: id_d }, function(res) {
            dropdownSect = _optionAll;
            $.each(res, function(index, value) {
                if (sec == value.id) {
                    dropdownSect += '<option value="' + value.id + '"  data="' + value.code_name + '" selected="selected"> ' + value.name + ' </option>';
                } else {
                    dropdownSect += '<option value="' + value.id + '"  data="' + value.code_name + '" > ' + value.name + ' </option>';
                }
            });
            $('#selectsection').html(dropdownSect);
        });
    }
    if (cc != 1) {

        code = wcode + '' + dcode;
        $('#PositionCode').val(code);
    }
}

function deletePositionByid(id) {
    $.post('deleteposition', { data: id }, function(res) {
        if (res == 1) {
            $.pjax.reload({ container: "#pjax_grid_position" }); //Reload GridView
            HornBill.show("ลบข้อมูลเรียบร้อยแล้ว ");
        }
    });
}

function GetLevel(obj) {
    var dropdrow;
    dropdrow = '<option value=""> กรุณาเลือก </option>';
    scode = $('#Section option:selected').attr('data');
    code = wcode + '' + dcode + '' + scode;
    $.get('getlevel', function(res) {
        $.each(res, function(index, value) {
            if (obj.Level == value.level_code) {
                dropdrow += '<option value="' + value.level_id + '" code="' + value.level_code + '" selected="selected">' + value.level_name + ' </option>';
            } else {
                dropdrow += '<option value="' + value.level_id + '" code=' + value.level_code + '>' + value.level_name + ' </option>';
            }
        });
        $('#Level').html(dropdrow);
    });
    $('#PositionCode').val(code);
}

function setLevelCode(obj) {

    var valuei = $('#Level').find('option:selected').attr("code");
    lcode = valuei;
    code = wcode + '' + dcode + '' + scode + '' + wtcode + '' + lcode;
    $.get('getruning', { data: code }, function(res) {
        $("#runNumber").val(res);
        code = wcode + '' + dcode + '' + scode + '' + wtcode + '' + lcode + '' + res;
        $('#PositionCode').val(code);
    });
}

function WorkTypeValue(obj) {
    var valuei = $('#WorkType').find('option:selected').attr("code_name");
    wtcode = valuei;
    code = wcode + '' + dcode + '' + scode + '' + wtcode;
    // $("#runNumber").val(valuei);
    $('#PositionCode').val(code);
}

function reset() {
    $('#check').val(0);
    document.getElementById('AddPositionForm').reset();
    $('#id').val('');
    $('#addPosition').modal('show');
}

function Search() {
    var objSearch = {};
    objSearch.company = $('#selectworking').val().split('-')[0];
    objSearch.department = $('#selectdepartment').val().split('-')[0];
    objSearch.section = $('#selectsection').val().split('-')[0];

    window.location = 'searchposition?objSearch=' + JSON.stringify(objSearch);
    /*
    if (objSearch.company != '') {
        window.location = 'searchposition?objSearch=' + JSON.stringify(objSearch);
    } else {
        alert('กรุณาเลือกบริษัท!!1');
    }
    */
}

function editposition(id) {
    $.post('editposition', { id: id }, function(res) {
        console.log(res);
        $('#addPosition').modal('show');
        $('#id').val(res.level_id);
        $('#check').val(1);
        getCompanyForDepartment(res.WorkCompany, 1, 1, res.Department, 'edit');
        getDepartmentForSection(res.Department, 1, 1, res.Section, 'edit');
        GetLevel(res);
        $.each(res, function(index, value) {
            if ($("#inputID").is("select")) {
                $("#" + index + " option[value='" + value + "']").prop("selected", true);
            } else {
                $('#' + index).val(value);
            }

        });
    });
}

function Getworktype() {
    var dropdrow;
    dropdrow = '<option value=""> กรุณาเลือก </option>';
    $.get('getworktype', function(res) {
        $.each(res, function(index, value) {
            dropdrow += '<option value="' + value.id + '" code_name="' + value.code_name + '"> ' + value.name + ' </option>';
        });
        $('#WorkType').html(dropdrow);
    })
}

function getdatesubmit() {
    var valid = $('#AddPositionForm').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันการบันทึกข้อมมูล ? </h4>",
            callback: function(result) {
                var positionInpus = null;
                positionInpus = $('#AddPositionForm').serializeArrayAnything();
                __csrf = $('#_csrf').val();
                if (result == 1) {
                    $.post('saveposition', { positionInpus: positionInpus, _csrf: __csrf }, function(res) {
                        if (res == 1) {
                            bootbox.alert({
                                size: 'small',
                                message: "<h4 class=\"btalertsave\">บันทึกข้อมูลเรียบร้อยแล้ว</h4>",
                                callback: function() {
                                    $.pjax.reload({ container: "#pjax_grid_position" });
                                    $('#addPosition').modal('hide');
                                }
                            });

                        }
                    });
                }
            }
        });
    }
    return false;
}


function searchAndSelector()
{
    //get MODE is ONLY search action
    var mode = $('#mode').prop('title');
    if(mode==='search') {
        var strSelector = $('#strSelector').prop('title');
        var code = strSelector.split(',');  //get string series IS company, department, section
        if(code.length > 0) {
            var cSel = code[0];
            var dSel = code[1];
            var sSel = code[2];

            //query FROM db with company department and section
            getCompanyForDepartment(cSel, 0, 0, dSel, 'search');
            getDepartmentForSection(dSel, 0, 0, sSel, 'search');

            //set selected dropdown with values
            if(cSel !== "0") {
                $("#selectworking option[value='"+cSel+"']").prop("selected", true);
            }
            if(dSel !== "0") {
                $("#selectdepartment option[value='"+dSel+"']").prop("selected", true);
            }
            if(sSel !== "0") {
                $("#selectsection option[value='"+sSel+"']").prop("selected", true);
            }
        }
    }
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