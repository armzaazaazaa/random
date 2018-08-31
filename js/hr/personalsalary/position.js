var num = 1;
$(document).ready(function () {

});

$('#selectemp').change(function () {


});

$('#addSalary').click(function () {

    $.ajax({
        url: 'getcompany',
        type: 'GET',
        success: function (data, textStatus, jQxhr) {
            // console.log(data);

        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
        }
    });

});
var position_goble;

function getCompanyForDepartment(val, dpm, edit = null) {

    var _options1 = '<option selected="selected" value="">  เลือกแผนก  </option>';
    var _options2 = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _options3 = '<option selected="selected" value="">  เลือกลักษณะงาน  </option>';
    var _options4 = '<option selected="selected" value="">  เลือกเลือกระดับ </option>';
    var _url = $('#urlGetDepartment').attr('title');
    var valueCompany = (val.value === undefined) ? val : val.value;
    // // console.log(_url + "?id_company=" + valueCompany);
    $('#hiddenvalCompany').val(valueCompany);
    if (valueCompany != '') {
        $.ajax({
            method: "GET",
            url: _url + "?id_company=" + valueCompany,
            success: function(data, textStatus, jQxhr) {
                $.each(data, function (key, value) {
                    if (edit == 1 && key == dpm) {
                        _options1 += "<option value='" + data[key].id + "'  selected='selected'>" + data[key].name + "</option>";
                    } else {
                        _options1 += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                    }

                });
                $('#selectdepartment').html(_options1);
                getposition(valueCompany);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                // console.log(errorThrown);
            }
        });
    } else {
        $('#selectdepartment').html(_options1);
        $('#selectsection').html(_options2);
        $('#selectworktype').html(_options3);
        $('#selectlevel').html(_options4);
    }
}

function getDepartmentForSection(val, sec, depart = null) {
    var _options = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _options2 = '<option selected="selected" value="">  เลือกลักษณะงาน  </option>';
    var _options3 = '<option selected="selected" value="">  เลือกเลือกระดับ </option>';
    var _url = $('#urlGetSection').attr('title');
    var valueDepartment = (val.value === undefined) ? val : val.value;
    $('#hiddenvalDepartment').val(valueDepartment);
    var selectworking = $('#selectworking').val();
    if (valueDepartment != '') {
        $.ajax({
            method: "GET",
            url: _url + "?id_department=" + valueDepartment,
            success: function (data, textStatus, jQxhr) {
                $.each(data, function (key, value) {
                    if (depart == 1 && key == sec) {
                        _options += "<option value='" + data[key].id + "' selected='selected'>" + data[key].name + "</option>";
                    } else {
                        _options += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                    }
                });
                $('#selectsection').html(_options);
                getposition(selectworking, valueDepartment);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                // console.log(errorThrown);
            }
        });
    } else {
        $('#selectsection').html(_options);
        $('#selectworktype').html(_options2);
        $('#selectlevel').html(_options3);
    }
}

function selectSection(val = null) {

    var CompanyID = $('#selectworking').val();
    var DepartmentID = $('#selectdepartment').val();
    var SectionID = (val.value === undefined) ? val : val.value;
    var position;
    var workingtype;
    var level;

    if (CompanyID != '' && DepartmentID != '' && SectionID != '') {
        getposition(CompanyID, DepartmentID, SectionID, position, workingtype, level);
    }

    //var _options = '<option selected="selected" value="">  เลือกลักษณะงาน  </option>';
    //var _options2 = '<option selected="selected" value="">  เลือกเลือกระดับ </option>';
    /*    var selectworking = $('#selectworking').val();
        var selectdepartment = $('#selectdepartment').val();
        var valueSection = (val.value === undefined) ? val : val.value;


        if (valueSection != '') {
            $.ajax({
                method: "GET",
                url: "../personalsalary/getworktype?id_working=" + selectworking + "&&id_department=" + selectdepartment + "&&id_section=" + valueSection,
                success: function(data, textStatus, jQxhr) {
                    // console.log(data);
                    $.each(data, function(key, value) {
                        _options += "<option value='" + data[key].code_name + "'>" + data[key].name + "</option>";
                    });
                    //$('#selectworktype').html(_options);
                    // getposition(selectworking, selectdepartment, valueSection);
                },
                error: function(jqXhr, textStatus, errorThrown) {
                    // console.log(errorThrown);
                }
            });
        } else {
            //$('#selectworktype').html(_options);
            //$('#selectlevel').html(_options2);
        }*/

}

/*
function selectWorktype(val) {
    var _options = '<option selected="selected" value="">  เลือกเลือกระดับ </option>';
    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var valueWorktype = (val.value === undefined) ? val : val.value;
    if (valueWorktype != '') {
        $.ajax({
            method: "GET",
            url: "../personalsalary/getlevel?id_working=" + selectworking + "&&id_department=" + selectdepartment + "&&id_section=" + selectsection + "&&id_workingtype=" + valueWorktype,
            success: function(data, textStatus, jQxhr) {
                // console.log(data);
                $.each(data, function(key, value) {
                    _options += "<option value='" + data[key].level_code + "'>" + data[key].level_name + "</option>";
                });
                $('#selectlevel').html(_options);
                getposition(selectworking, selectdepartment, selectsection, valueWorktype);
            },
            error: function(jqXhr, textStatus, errorThrown) {
                // console.log(errorThrown);
            }
        });
    } else {
        $('#selectlevel').html(_options);
    }

}
*/

/*
function selectLevel(val) {
    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var selectworktype = $('#selectworktype').val();
    var valueLevel = (val.value === undefined) ? val : val.value;

    getposition(selectworking, selectdepartment, selectsection, selectworktype, valueLevel);
}
*/

function getposition(company, department, section, position, workingtype, level) {
     console.log('company=' + company + 'department=' + department + 'section=' + section + 'workingtype=' + workingtype + 'level=' + level);
    var _options = '<option  value="">  เลือกตำแหน่ง </option>';
    $('#selectposition').empty();
    if (company != 'undefined' && company != null && department != 'undefined' && department != null && section != 'undefined' && section != null && workingtype != 'undefined' && workingtype != null && level != 'undefined' && level != null) {
        var postData = {
            'company': company,
            'department': department,
            'section': section,
            'position': position,
            'workingtype': workingtype,
            'level': level,

        }
        // console.log('5');
    } else if (company != 'undefined' && company != null && department != 'undefined' && department != null && section != 'undefined' && section != null && workingtype != 'undefined' && workingtype != null) {
        var postData = {
            'company': company,
            'department': department,
            'section': section,
            'workingtype': workingtype,
            'position': position,
        }
        // console.log('4');
    } else if (company != 'undefined' && company != null && department != 'undefined' && department != null && section != 'undefined' && section != null) {
        var postData = {
            'company': company,
            'department': department,
            'section': section,
            'position': position,
        }
        // console.log('3');
    } else if (company != 'undefined' && company != null && department != 'undefined' && department != null) {
        var postData = {
            'company': company,
            'department': department,
            'position': position,
        }
        // console.log('2');
    } else if (company != 'undefined' && company != null) {
        var postData = {
            'company': company,
            'position': position,
        }
        // console.log('1');
    }
    // console.log(postData);


    $.ajax({
        url: '../personalsalary/getposition',
        data: postData,
        type: 'POST',
        success: function (data, textStatus, jQxhr) {
            /*
            if (data.length != 0) {
                position_goble = data
            }
            if (data == 0) {
                data = position_goble;
            } */
            $.each(data, function (key, value) {
                _options += "<option value='" + data[key].PositionCode + "-" + data[key].org_id + "'>" + data[key].PositionCode + '( ' + data[key].Name + ' )' + "</option>";
            });

            //console.log(_options);
            $('#selectposition').html(_options);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            //  // console.log(errorThrown);
        }
    });
}


function selectSalarystepchartname(val, level, edit) {
    var salarystepchartname = (val.value === undefined) ? val : val.value;
    var _options = '<option selected="selected" value="">  เลือกกระบอก </option>';

    $.ajax({
        url: '../personalsalary/getsalarysteplevel?stepchartname=' + salarystepchartname,
        type: 'GET',
        async: false,
        success: function (data, textStatus, jQxhr) {
            //  // console.log(data);
            $.each(data, function (key, value) {
                if (edit == 1 && data[key].SALARY_STEP_LEVEL == level) {
                    _options += "<option value='" + data[key].SALARY_STEP_LEVEL + "'  price='" + data[key].SALARY_STEP_START_SALARY + "' selected='selected'>" + data[key].SALARY_STEP_LEVEL + "</option>";
                } else {
                    _options += "<option value='" + data[key].SALARY_STEP_LEVEL + "'  price='" + data[key].SALARY_STEP_START_SALARY + "'>" + data[key].SALARY_STEP_LEVEL + "</option>";
                }

            });
            $('#salarysteplevel').html(_options);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
        }
    });
}

function selectSalarysteplevel(val, valuenew, edit) {
    var salarystepchartname = $('#salarystepchartname').val();
    var selectlevel = (val.value === undefined) ? val : val.value;
    var _options = '<option selected="selected" value="">  เลือกกระบอก </option>';
    $.ajax({
        url: '../personalsalary/getempsalarystep?stepchartname=' + salarystepchartname + "&&level=" + selectlevel,
        type: 'GET',
        success: function (data, textStatus, jQxhr) {
            //console.log(data);
            //console.log(valuenew);

            var res = "";// valuenew.split(".");
            $.each(data, function (key, value) {
                if (edit == 1 && res[0] == key) {
                    _options += "<option value='" + data[key].count + "' stap='" + data[key].SALARY_STEP_VALUE + "' selected='selected'>" + data[key].count + "</option>";
                } else {
                    _options += "<option value='" + data[key].count + "' stap='" + data[key].SALARY_STEP_VALUE + "'>" + data[key].count + "</option>";
                }
            });
            $('#empsalarystep').html(_options);
            if (res.length > 1) {
                $('#stapupnew').val('0.' + res[1]);
            } else {
                $('#stapupnew').val('0');
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
        }
    });

    $.ajax({
        url: '../personalsalary/getsalarystepid?stepchartname=' + salarystepchartname + "&&level=" + selectlevel,
        type: 'GET',

        success: function (data, textStatus, jQxhr) {
            $('#salarystepstartid').val(data['0']['SALARY_STEP_ID']);
            $('#salarystepstartsalary').val(data['0']['SALARY_STEP_START_SALARY']);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
        }
    });
}

function selectStep(val) {
    var empsalarystep = $('#empsalarystep').val();
    var valuei = $('#empsalarystep').find('option:selected').attr("stap");
    var cal = empsalarystep * valuei;
    var valuenew = $('#salarysteplevel').find('option:selected').attr("price");
    var sum = (parseInt(cal) + parseInt(valuenew));
    $('#salarystepstartsalary').val(sum);
}


function submitAddsalary() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการบันทึกรายการ หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {
                var selectemp = $('#selectemp').val();
                var IdCardEmp = $('#IdCardEmp').val();
                var salarystepstartid = $('#salarystepstartid').val();
                var selectworking = $('#selectworking').val();
                var selectdepartment = $('#selectdepartment').val();
                var selectsection = $('#selectsection').val();
                var selectworktype = $('#selectworktype').val();
                var selectlevel = $('#selectlevel').val();
                var selectposition = $('#selectposition').val().split('-')[0];
                var datapicker = $('#datapicker').val();
                var selectsalarychangetype = $('#selectsalarychangetype').val();
                var selectsalarystepchartname = $('#salarystepchartname').val();
                var selectsalarysteplevel = $('#salarysteplevel').val();
                var selectempsalarystep = $('#empsalarystep').val();
                var selectsalarystepstartsalary = $('#salarystepstartsalary').val();
                var org_id = $('#selectposition').val().split('-')[1];

                var postData = {
                    'IdCardEmp': IdCardEmp,
                    'salarystepstartid': salarystepstartid,
                    'selectworking': selectworking,
                    'selectdepartment': selectdepartment,
                    'selectsection': selectsection,
                    'selectworktype': selectworktype,
                    'selectlevel': selectlevel,
                    'selectposition': selectposition,
                    'datapicker': datapicker,
                    'selectsalarychangetype': selectsalarychangetype,
                    'selectsalarystepchartname': selectsalarystepchartname,
                    'selectsalarysteplevel': selectsalarysteplevel,
                    'selectempsalarystep': selectempsalarystep,
                    'selectsalarystepstartsalary': selectsalarystepstartsalary,
                    'selectemp': IdCardEmp,
                    'org_id': org_id,
                };


                //  // console.log(postData);
                $.ajax({
                    url: '../payroll/savesalarypersonal',
                    data: postData,
                    type: 'POST',
                    success: function (data, textStatus, jQxhr) {
                        loadPersonalsarary('no');
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "บันทึกข้อมูลเรียบร้อยแล้ว",
                        }); //"ระบบลบข้อมูลเรียบร้อย");
                        setTimeout(function () {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                            $('.modal-backdrop').remove();
                        }, BootboxTimeOut);
                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        // console.log(errorThrown);
                    }
                });
            }
        }
    });
}

function empsalarystep(params) {
    $("#stapupnew").keypress(function () {
        $('#stapupnew').inputmask("0.99");
        var stapup = $("#stapupnew").val();
        alert(stapup);
    });
    $('#salarystepstartsalary').val();
}

function loadDataSalary(ID_Card, selecttab) {
    //alert(ID_Card);
    $("#showsalaryemp").empty();
    $.ajax({
        url: '../personalsalary/getsalaryidcard?Idcard=' + ID_Card,
        type: 'GET',
        success: function (data, textStatus, jQxhr) {
            //  // console.log(data);

            looptableSalary(data);
            //looptableSalary(data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
        }
    });
}

function looptableSalary(data) {
    //  // console.log(data);
    var tbhtml = "";

    var resutlstatus;
    var status
    var mainJob
    var mainSso
    num = 1;
    var idCkSocail = "";
    var idMainJob = "";
    var idStatus = "";
    $.each(data, function (key, value) {
        var status = "";

        status = data[key].status;
        if (status == '1') {
            resutlstatus = "ใช้งาน";
            idStatus = data[key].EMP_SALARY_ID;
            ;

        } else if (status == '0') {
            resutlstatus = "ไม่ใช้งาน";
        }

        mainJob = data[key].statusMainJob
        if (mainJob == '1') {
            idMainJob = data[key].EMP_SALARY_ID;

        } else if (mainJob == '0') {

            idMainJob = 0;

        } else {

            idMainJob = 0;
        }

        mainSso = data[key].socialBenefitStatus
        if (mainSso == '1') {
            idCkSocail = data[key].EMP_SALARY_ID;

        } else if (mainSso == '0') {

            idCkSocail = 0;

        } else {

            idCkSocail = 0;
        }


        tbhtml += "<tr><td>" + num + '</td>';
        tbhtml += '<td align="center">' + '<input type="radio" id="socialBenefitStatus' + idCkSocail + '" name="socialBenefitStatus[]" value="' + data[key].EMP_SALARY_ID + '" class="socialBenefitStatus">' + '</td>';
        tbhtml += '<td align="center">' + '<input type="radio" id="mailJob' + idMainJob + '" name="mainjobStatus[]" value="' + data[key].EMP_SALARY_ID + '" class="mainjob">' + '</td>';
        tbhtml += '<td align="center">' + '<input type="checkbox" id="status' + idStatus + '" name="status[]" value="' + data[key].EMP_SALARY_ID + '" >' + '</td>';
        tbhtml += '<td>' + data[key].workingname + '</td>';
        tbhtml += '<td>' + data[key].EMP_SALARY_POSITION_CODE + '</td>';
        tbhtml += '<td>' + data[key].positionname + '</td>';
        tbhtml += '<td>' + data[key].dateusestart + '</td>';
        tbhtml += '<td>' + data[key].EMP_SALARY_CHART + '</td>';
        tbhtml += '<td>' + data[key].EMP_SALARY_POSITION_LEVEL + '</td>';
        tbhtml += '<td>' + data[key].EMP_SALARY_STEP + '</td>';
        tbhtml += '<td>' + data[key].EMP_SALARY_WAGE + '</td>';
        tbhtml += '<td>' + resutlstatus + '</td>';
        var arg = "'" + data[key].EMP_SALARY_ID + "','" + data[key].EMP_SALARY_POSITION_CODE + "'";
        tbhtml += '<td>' + '<a href="#"> <img src = "../../images/wshr/edit.png"  onclick="editpositionsalaly(' + data[key].EMP_SALARY_ID + ')">' + '</a></td>';
        tbhtml += '<td>' + '<a href="#"> <img src = "../../images/global/delete-icon.png" onclick="confirmDeletepostion(' + arg + ')">' + '</a></td>';
        tbhtml += '</tr> ';

        num++


    });
    $("#showsalaryemp").append(tbhtml);
    CheckMainjob(data);
    CheckSocail(data);
    CheckCalculate(data)


}

function reset() {
    $('#modalfromAdd')[0].reset();
}

function editpositionsalaly(params) {
    $.get('editpositionsaraly', {data: params}, function (res) {
        $('#modalAdd').modal('show');
        $('#selectworking option[value=' + res['EMP_SALARY_WORKING_COMPANY'] + ']').prop("selected", true);
        getCompanyForDepartment(res['EMP_SALARY_WORKING_COMPANY'], res['EMP_SALARY_DEPARTMENT'], 1);
        getDepartmentForSection(res['EMP_SALARY_DEPARTMENT'], res['EMP_SALARY_SECTION'], 1);

        $.each(res, function (index, value) {
            if ($(":input").is("select")) {
                $("#" + index + " option[value='" + value + "']").prop("selected", true);
            } else {
                $('#' + index).val(value);
            }

        });
        $('#selectlevel option[value=' + res['EMP_SALARY_LEVEL'] + ']').prop("selected", true);
        $('#salarystepchartname option[value=' + res['EMP_SALARY_CHART'] + ']').prop("selected", true);
        $('#salarystepchartname').promise(selectSalarystepchartname(res['EMP_SALARY_CHART'], res['EMP_SALARY_LEVEL'], 1)).done(function () {
            // var valuenew = $('#salarysteplevel').find('option:selected').attr("price");
            selectSalarysteplevel(res['EMP_SALARY_LEVEL'], res['EMP_SALARY_STEP'], 1);
            selectStep(res['EMP_SALARY_LEVEL']); //
            $('#empsalarystep option[value=' + res['EMP_SALARY_POSITION_LEVEL'] + ']').prop("selected", true);
            getposition(res['EMP_SALARY_WORKING_COMPANY'], res['EMP_SALARY_DEPARTMENT'], res['EMP_SALARY_SECTION'], res['EMP_SALARY_POSITION_CODE']);
        });


    });
}

function CheckMainjob(data) {
    // // console.log(data);
    $.each(data, function (key, value) {
        if (data[key].statusMainJob != 0) {
            //  // console.log(data[key].EMP_SALARY_ID);
            $('#mailJob' + data[key].EMP_SALARY_ID).prop("checked", true);
        }
    });

}


function CheckSocail(data) {
    // // console.log(data);
    $.each(data, function (key, value) {
        if (data[key].socialBenefitStatus != 0) {
            //  // console.log(data[key].EMP_SALARY_ID);
            $('#socialBenefitStatus' + data[key].EMP_SALARY_ID).prop("checked", true);
        }
    });

}

function CheckCalculate(data) {
    // // console.log(data);
    $.each(data, function (key, value) {
        if (data[key].status != 0) {
            //  // console.log(data[key].EMP_SALARY_ID);
            $('#status' + data[key].EMP_SALARY_ID).prop("checked", true);
        }
    });

}

//click tab
function loadPersonalsarary(tab) {

    var haveCont = $(tab).data('have-contend');
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    selecttab(10);
    var _options1 = '';
    $("#stapupnew").keypress(function () {
        $('#stapupnew').inputmask("0.99");
        var stapup = $("#stapupnew").val();
        alert(stapup);
    });
    $.get('bankthailand', function (res) {
        $.each(res, function (key, value) {
            _options1 += "<option value='" + value.id + "'>" + value.bank_name + "</option>";

        });
        console.log(_options1);
        $('#Salary_Bank').html(_options1);
    });
    //  // console.log(haveCont);
    if (haveCont == 'no' || haveCont == undefined) {
        //load
        $.get('../personalsalary/position', {emp_id: emp_id, viewOnly: viewOnly}, function (res) {

            $('#tab_10 .box-body').html(res).promise().done(function () {
                //-----
                $(".select2").select2();
                //--------
                $('#SalaryViaBanktal').prop("checked", true);
                $('#Salary_PromptPay-pn').hide();
                $('#form_group3').hide();
                $('#SalaryViaBank3').click(function () {
                    $('#form_group3').show();
                    $('#form_group1').hide();
                    $('#form_group2').hide();
                });
                $('#SalaryViaBank2').click(function () {
                    $('#form_group3').hide();
                    $('#form_group1').show();
                    $('#form_group2').show();
                });
                $('#SalaryViaBank1').click(function () {
                    $('#form_group3').hide();
                    $('#form_group1').show();
                    $('#form_group2').show();
                });
                $('#SalaryViaBank1').click(function () {
                    $('#form_group3').hide();
                    $('#form_group1').show();
                    $('#form_group2').show();
                });
                $('#SalaryViaBankpn').click(function () {
                    $('#Salary_PromptPay-tal').hide()
                    $('#Salary_PromptPay-pn').show();
                });
                $('#SalaryViaBanktal').click(function () {
                    $('#Salary_PromptPay-tal').show();
                    $('#Salary_PromptPay-pn').hide();
                });

                //$("[data-mask]").inputmask();

                $('#datapicker').datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy',
                    changeMonth: true,
                    changeYear: true,
                    showButtonPanel: true,

                });

                //  // console.log(emp_id);
                //

                var selectemp = emp_id;
                var postdata = {
                    'selectemp': selectemp,
                }
                if (haveCont != 'yes') {
                    // // console.log("yyyy");

                    $('#SaveSalaryBank').click(function () {
                        bootbox.confirm({
                            size: "small",
                            message: "<h4 class=\"btalert\">คุณยืนยันการบันทึกรายการ หรือไม่?</h4>",
                            callback: function (result) {
                                if (result == 1) {
                                    var postdata = {
                                        'selectemp': emp_id,
                                        'Salary_Bank': $('#Salary_Bank').val(),
                                        'Salary_BankNo': $('#Salary_BankNo').val(),
                                        'SalaryViaBank': $("input:radio[name=SalaryViaBank]:checked").val(),
                                    }

                                    //  // console.log(postdata);
                                    $.ajax({
                                        url: '../personalsalary/savecontantbank',
                                        data: postdata,
                                        type: 'POST',
                                        success: function (data, textStatus, jQxhr) {
                                            $('#Salary_Bank').val(data.Salary_Bank);
                                            $('#Salary_BankNo').val(data.Salary_BankNo)
                                            if (data.SalaryViaBank == 0) {
                                                $('#SalaryViaBank0').prop("checked", true);
                                            } else {
                                                $('#SalaryViaBank1').prop("checked", true);
                                            }
                                            $('.showcontant').show();
                                            var box = bootbox.alert({
                                                size: "small",
                                                title: "แจ้งเตือน",
                                                message: "บันทึกข้อมูลเรียบร้อยแล้ว",
                                            }); //"ระบบลบข้อมูลเรียบร้อย");

                                            setTimeout(function () {
                                                // be careful not to call box.hide() here, which will invoke jQuery's hide method
                                                box.modal('hide');
                                            }, BootboxTimeOut);
                                        },
                                        error: function (jqXhr, textStatus, errorThrown) {
                                            // console.log(errorThrown);
                                        }
                                    });
                                }
                            }
                        });

                    });

                    loadDataPositionSalary(postdata, tab)
                } else {
                    // // console.log("xxxxxxx");
                }
            });

        });
    }
}

function loadDataPositionSalary(postdata, tab) {
    $.ajax({
        url: '../personalsalary/getcontantbank', //'/wseasyerp/hr/personalsalary/getcontantbank',
        data: postdata,
        type: 'POST',
        success: function (data, textStatus, jQxhr) {
            //  // console.log(data);
            $('#Salary_Bank').val(data.Salary_Bank);
            // $('#Salary_BankNo').val(data.Salary_BankNo)
            if (data.SalaryViaBank == 0) {
                $('#SalaryViaBank0').prop("checked", true);
            } else {
                $('#SalaryViaBank1').prop("checked", true);
            }
            $('.showcontant').show();
            $('#IdCardEmp').val(data.ID_Card);
            $(tab).data('have-contend', 'yes');


            loadDataSalary(data.ID_Card, 10);


            $(".select2").select2();

            $("[data-mask]").inputmask();


        },
        error: function (jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
        }
    });
}

function confirmDeletepostion(val, code_position) {
    //  alert(val);
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันลบข้อมูล หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {
                var datapostconfirm = {
                    EMP_SALARY_ID: val,
                    code_position: code_position
                }

                $.ajax({
                    method: "post",
                    url: "../personalsalary/deletepersonalsalary",
                    data: datapostconfirm,
                    success: function (data) {
                        //  // console.log(data);
                        $('#myModal').modal('hide');
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function () {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        // console.log(errorThrown);
                    }
                });

            } else {
                var datapostconfirm = "";
            }
            //   // console.log(datapostconfirm);


        }
    });
}