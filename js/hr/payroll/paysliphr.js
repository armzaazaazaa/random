$(document).ready(function() {

    $('#id_emp').select2();

    $('#date_pay').MonthPicker(MonthPickerConfig);

});



function getCompanyForDepartment(val) {

    var _options1 = '<option selected="selected" value="">  เลือกแผนก  </option>';
    var _options2 = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _url = $('#urlGetDepartment').attr('title');
    var valueCompany = val.value;
    //$('#hiddenvalCompany').val(valueCompany);
    if (valueCompany != '') {
        $.ajax({
            method: "GET",
            url: _url + "?id_company=" + valueCompany,
            success: function(data, textStatus, jQxhr) {
                $.each(data, function(key, value) {
                    _options1 += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#selectdepartment').html(_options1);
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    } else {
        $('#selectdepartment').html(_options1);
        $('#selectsection').html(_options2);
    }
}

function getDepartmentForSection(val) {

    var _options = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _url = $('#urlGetSection').attr('title');
    var valueDepartment = val.value;
    //$('#hiddenvalDepartment').val(valueDepartment);

    if (valueDepartment != '') {
        $.ajax({
            method: "GET",
            url: _url + "?id_department=" + valueDepartment,
            success: function(data, textStatus, jQxhr) {
                $.each(data, function(key, value) {
                    _options += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#selectsection').html(_options);
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    } else {
        $('#selectsection').html(_options);
    }
}

function getSelectType(val){
    var typeSelect = val.value;
    if(typeSelect == 1){
        $('#showCompany').show();
        $('#showEmp').hide();
        $('#showMonth').show();
    }else if(typeSelect == 2){
        $('#showCompany').hide();
        $('#showEmp').show();
        $('#showMonth').show();
    }else{
        $('#showCompany').hide();
        $('#showEmp').hide();
        $('#showMonth').hide();
    }
}