var objEmp;
var num = 1;
var numaddde = 1;
var numdededuct = 1;
var page_mode;
var objDataSearch;
var objDataIndex;
var objDataCount;
$(document).ready(function() {

    /*    $.ajax({
            method: "GET",
            url: "autocomp",
            success: (function(data) {
                // console.log(data);
                objEmp = data;
                bindObjAutoComplete();
            })
        });*/

    $("[data-mask]").inputmask();
    $("#btnAddFile").hide();
    $("#showcontant").hide();
    $('#btn_validated').hide();

    $(".select2").select2();
    $('.select2').select2().val('').trigger("change");


    page_mode = $('#mode').prop('title');



    $("#seachdatalist").click(function() {
        loaddata();
    });


    $('#btn_validated').click(function() {
        $('#myModal').modal('hide');
    });

    $('#btn_previous').click(function() {
        GoPrevious();
    });

    $('#btn_next').click(function() {
        GoNext();
    });


    $("[data-mask]").inputmask();
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

function loaddata() {
    $("#tblticket").empty();

    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var id_emp = $('#id_emp').val();

    var datapost = {
        selectworking: selectworking,
        selectdepartment: selectdepartment,
        selectsection: selectsection,
        id_emp: id_emp,
        page_mode:page_mode,
    }

    $.ajax({
        method: "post",
        url: "searchempdata",
        data: datapost,
        success: function(data) {
            objDataSearch = data;
            objDataCount = data.length;

            listEmpdata(data, num);
            $('#showsearch').show();
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function listEmpdata(data, row) {
    var tbhtml = "";
    num = 1;
    var imgNo = "no.png";
    var imgYes = "yes.png";

    $.each(data, function(key, value) {

        var image = imgNo;
        var image2 = imgNo;
        var resultwageconfirm = '';
        var resultwageconfirmdate = '';

        tbhtml += "<tr><td style='text-align: center'>" + num + '</td>';
        if (page_mode == 'validate') {
            if (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == 1) {
                image = imgYes;
                resultwageconfirm = (data[key].WAGE_THIS_MONTH_CONFIRM_BY != undefined) ? data[key].WAGE_THIS_MONTH_CONFIRM_BY : '';
                resultwageconfirmdate = showDateTimeFromMySQL(data[key].WAGE_THIS_MONTH_CONFIRM_DATE);
            }


            image2 = (data[key].WAGE_THIS_MONTH_DIRECTOR_LOCK == 1) ? imgYes : imgNo;
            tbhtml += '<td><a href = "#" ><img src = "../../images/wshr/' + image + '" class = "img-circle" data-toggle = "modal" ';
            tbhtml += 'data-target = "#myModal" onclick="getdetailconf(' + data[key].WAGE_ID + ',' + key + ')"></a>';
            tbhtml += '<img src = "../../images/wshr/' + image2 + '" class = "img-circle" ></td>';
        }


        if (page_mode == 'approved') {
            image = (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == 1) ? imgYes : imgNo;
            if (data[key].WAGE_THIS_MONTH_DIRECTOR_LOCK == 1) {
                image2 = imgYes;
                resultwageconfirm = (data[key].DIRECTOR_LOCK_COMFIRM_BY != undefined) ? data[key].DIRECTOR_LOCK_COMFIRM_BY : '';
                resultwageconfirmdate = showDateTimeFromMySQL(data[key].DIRECTOR_LOCK_COMFIRM_DATE);
                //resultwageconfirmdate = data[key].DIRECTOR_LOCK_COMFIRM_DATE;
            }


            tbhtml += '<td><img src = "../../images/wshr/' + image + '" class = "img-circle">';
            tbhtml += (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == 1) ? '<a href = "#" ><input type="hidden"  id="setfirm' + num + '"><img src = "../../images/wshr/' + image2 + '" class = "img-circle" onclick="getdetailconf(' + data[key].WAGE_ID + ',' + key + ')" data-toggle = "modal" data-target = "#myModal" ></a>' : '<img src = "../../images/wshr/' + image2 + '" class = "img-circle" >';
            tbhtml += '</center ></td > ';

        }


        tbhtml += '<td>' + data[key].Fullname + '</td > ';
        tbhtml += '<td>' + data[key].Position + '</td>';
        tbhtml += '<td>' + data[key].DepartmentName + '</td>';
        tbhtml += '<td>' + data[key].SectionName + '</td>';
        tbhtml += '<td>' + data[key].CompanyName + '</td>';
        tbhtml += '<td>' + resultwageconfirm + '</td>';
        tbhtml += '<td>' + resultwageconfirmdate + '</td>< /tr >';
        num++;
    });

    $("#tblticket").append(tbhtml);
}


function GoPrevious() {
    if (parseInt(objDataIndex) > 0) {
        objDataIndex--;
        getdetailconf(0, objDataIndex);
    }


}

function GoNext() {

    var max = objDataCount-1;
    if (parseInt(objDataIndex) < max) {
        objDataIndex++;
        getdetailconf(0, objDataIndex);
    }
}

function load_salary_data(idx) {


    $('#btn_previous, #btn_next').show();
    var max = objDataCount-1;
    if(idx==0) {
        $('#btn_previous').hide();
    }

    if(idx==max) {
        $('#btn_next').hide();
    }

    if(idx < objDataCount) {
        objDataIndex = idx;
        var WageID = objDataSearch[objDataIndex].WAGE_ID;

        //console.log(objDataSearch[objDataIndex]);

        return WageID;
    }
    else {
        return false;
    }
}


function getdetailconf(val, idx) {

    var wage_id = load_salary_data(idx);
    $.ajax({
        method: "get",
        url: "searchsalaryidcard?wage_id=" + wage_id,
        success: function(data) {
            display_data(data, idx);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}




function display_data(data, idx) {

    //console.log(objDataSearch[idx]);

    $('#nameworking').empty();
    $('#nameemp').empty();
    $('#positionemp').empty();
    $('#diviemp').empty();
    $('#wageemp').empty();
    $('#tbadddeduct').empty();
    $("#sumTotalDeduc").empty();
    $('#tbdededuct').empty();
    $("#sumTotaldeDeduc").empty();

    var money = parseFloat(data.WAGE_SALARY); //เงินเดือนได้รับ
    var chart_money = parseFloat(data.WAGE_SALARY_BY_CHART); //เงินเดือนตามผัง

    $('#nameworking').append(data.COMPANY_NAME);
    $('#nameemp').append('ชื่อ - สกุล : ' + data.WAGE_FIRST_NAME + '  ' + data.WAGE_LAST_NAME);
    $('#positionemp').append('ตำแหน่ง : ' + data.WAGE_POSITION_NAME);
    $('#diviemp').append('แผนก : ' + data.DEPARTMENT_NAME);
    $('#wageemp').append('เงินเดือนตามผัง : ' + accounting.formatMoney(chart_money));
    $('#wage_salary').val(accounting.formatMoney(money));

    var net_wage = parseFloat(data.WAGE_NET_SALARY);
    $('#sumallnet').val(accounting.formatMoney(net_wage));
    $('#id_wage_confirm').val(data.WAGE_ID);
    $('#wage_remark').val(data.WAGE_REMARK);

    //set idcard
    $('#am_idcard').val(data.WAGE_EMP_ID);

    if (parseInt(data.WAGE_THIS_MONTH_EMPLOYEE_LOCK) == 0 || parseInt(data.WAGE_THIS_MONTH_DIRECTOR_LOCK) == 0) {
        $('#btn_validated').hide();
        $('#submit_confirm').show();

    } else {
        $('#btn_validated').show();
        $('#submit_confirm').hide();
    }



    if(page_mode==='validate' || parseInt(data.WAGE_THIS_MONTH_DIRECTOR_LOCK) == 0) {
        var conf_by = (data.WAGE_THIS_MONTH_CONFIRM_BY !== null) ? 'ตรวจสอบโดย : <u>' + data.WAGE_THIS_MONTH_CONFIRM_BY + '</u>' : 'ตรวจสอบโดย :';
        var conf_date = 'วันที่ตรวจสอบ : ' + showDateTimeFromMySQL(data.WAGE_THIS_MONTH_CONFIRM_DATE) + '</u>';

        if (parseInt(data.WAGE_THIS_MONTH_EMPLOYEE_LOCK) == 1) {
            $('#btn_validated').hide();
            //$('#submit_confirm').hide();
        }
    }


    if(page_mode==='approved' && parseInt(data.WAGE_THIS_MONTH_DIRECTOR_LOCK) == 1) {
        var conf_by = (data.DIRECTOR_LOCK_COMFIRM_BY !== null) ? 'ยืนยันโดย : <u>' + data.DIRECTOR_LOCK_COMFIRM_BY + '</u>' : 'ยืนยันโดย :';
        var conf_date = 'วันที่ยืนยัน : ' + showDateTimeFromMySQL(data.DIRECTOR_LOCK_COMFIRM_DATE) + '</u>';

        if (parseInt(data.WAGE_THIS_MONTH_DIRECTOR_LOCK) == 1) {
            $('#btn_validated').hide();
            $('#submit_confirm').hide();
        }
    }


    $('#text_confirm_by').html(conf_by);
    $('#text_confirm_date').html(conf_date);


    tbaddduduction(data);
    getsummary(data);
    getbenefitdata(data);


}

function getbenefitdata(data) {
    var objVar = {};
    objVar.id_card = data.WAGE_EMP_ID;
    objVar.date_pay = data.WAGE_PAY_DATE;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");

    $.ajax({
        url: 'getbenefitdata',
        data: objVar,
        type: 'POST',
        success: function(resp) {
            var bnf = parseFloat(resp);
            $('#bnf_sum').html(accounting.formatMoney(bnf));
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function getsummary(data) {

    var objVar = {};
    objVar.date_pay = data.WAGE_PAY_DATE;
    objVar.id_card = data.WAGE_EMP_ID;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");

    $.ajax({
        url: 'getsummarywage',
        data: objVar,
        type: 'POST',
        success: function(resp) {
            var wage_sum = parseFloat(resp.income_total_amount);
            $('#wage_summary').val(accounting.formatMoney(wage_sum));

            var tax_sum = parseFloat(resp.tax_total_amount);
            $('#tax_summary').val(accounting.formatMoney(tax_sum));

            var sso_sum = parseFloat(resp.sso_total_amount);
            $('#sso_summary').val(accounting.formatMoney(sso_sum));
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}



function tbaddduduction(param) {

    var flag_lock;
    var emp_lock = parseInt(param.WAGE_THIS_MONTH_EMPLOYEE_LOCK);
    var dir_lock = parseInt(param.WAGE_THIS_MONTH_DIRECTOR_LOCK);
    var flag_lock1 = (page_mode=='validate' && emp_lock==1) ? 1 : 0;
    var flag_lock2 = (page_mode=='approved' && dir_lock==1) ? 1 : 0;
    flag_lock = (flag_lock1==1) ? flag_lock1 : ((flag_lock2==1) ? flag_lock2 : 0 );

    //if flag lock set readonly
    var setreadonly = '';
    if(flag_lock==1) {
        $('#wage_salary').prop('readonly',true);
        $('#wage_remark').prop('readonly',true);
        setreadonly = 'readonly="readonly"';
    }
    else {
        $('#wage_salary').prop('readonly',false);
        $('#wage_remark').prop('readonly',false);
    }



    var objVar = {};
    objVar.id_card = param.WAGE_EMP_ID;
    objVar.date_pay = param.WAGE_PAY_DATE;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getadddeductbyidcard',
        data: objVar,
        type: 'POST',
        success: function(data) {
            $("#tbadddeduct").empty();
            $("#tbdededuct").empty();
            $("#sumTotalDeduc").empty();
            $("#sumTotaldeDeduc").empty();

            var tbadddeduct = "";
            var tbdededuct = "";
            var totaladddedu = 0;
            var totaldededu = 0;
            numaddde = 1;
            numdededuct = 1;

            $.each(data, function(key, value) {
                // console.log(typeof(data[key].ADD_DEDUCT_TEMPLATE_TYPE));

                var money = parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);
                if (parseInt(data[key].ADD_DEDUCT_TEMPLATE_TYPE) === 1) {

                    tbadddeduct += "<tr><td class='text-center'>" + numaddde + '</td>';
                    tbadddeduct += "<td>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + '</td>';
                    tbadddeduct += "<td>" + data[key].ADD_DEDUCT_DETAIL + '</td>';
                    /*
                    tbadddeduct += '<td class="text-right">';
                    tbadddeduct += '<input type="text" class="form-control text-right" ';
                    tbadddeduct += 'value="' + accounting.formatMoney(money) + '"';
                    tbadddeduct += '>';
                    tbadddeduct += "</td>"
                    */
                    tbadddeduct += '<td class="text-right">';
                    //tbadddeduct += "<input type=\"text\" name=\"total[]\" class=\"form-control numberformat\" data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" data-mask>";
                    tbadddeduct += '<input type="text" id="add_deduct_'+data[key].ADD_DEDUCT_DETAIL_ID+'" name="add_deduct[]" class="form-control text-right" '+setreadonly;
                    tbadddeduct += " data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" ";
                    tbadddeduct += ' value="' + accounting.formatMoney(money) + '" data-mask>';
                    tbadddeduct += '</td></tr>';

                    totaladddedu = totaladddedu + money;
                    numaddde++;
                } else if (parseInt(data[key].ADD_DEDUCT_TEMPLATE_TYPE) === 2) {
                    tbdededuct += "<tr><td class='text-center'>" + numdededuct + '</td>';
                    tbdededuct += "<td>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + '</td>';
                    tbdededuct += "<td>" + data[key].ADD_DEDUCT_DETAIL + '</td>';
                    //tbdededuct += '<td class="text-right"><input type="text" class="form-control text-right"   value="' + accounting.formatMoney(money) + '"></td></tr>';
                    //tbadddeduct += '<td class="text-right">';

                    tbdededuct += '<td class="text-right">';
                    //tbadddeduct += "<input type=\"text\" name=\"total[]\" class=\"form-control numberformat\" data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" data-mask>";
                    tbdededuct += '<input type="text" id="add_deduct_'+data[key].ADD_DEDUCT_DETAIL_ID+'" name="add_deduct[]" class="form-control text-right" '+setreadonly;
                    tbdededuct += " data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" ";
                    tbdededuct += ' value="' + accounting.formatMoney(money) + '" data-mask>';
                    tbdededuct += '</td></tr>';

                    totaldededu = totaldededu + money;
                    numdededuct++;
                }
            });


            $("#tbadddeduct").append(tbadddeduct);
            $("#tbdededuct").append(tbdededuct);

            $("#sumTotalDeduc").append(accounting.formatMoney(totaladddedu));
            $("#sumTotaldeDeduc").append(accounting.formatMoney(totaldededu));

            setTimeout(function() {
                $("[data-mask]").inputmask();

                $("[data-mask]").blur(function(){
                    recalmoney($(this));
                });

            }, 3);
        }
    });

}

function recalmoney(me) {
    //console.log(me.val());
    //console.log('recal');

    var idcard = $('#am_idcard').val();
    var wage_id = $('#id_wage_confirm').val();
    if(idcard.length==0) {
        alert("ไม่พบรหัสบัตรประชาชน");
        return false;
    }

    if(wage_id.length==0) {
        alert("ไม่พบหมายเลขการสร้างเงินเดือน");
        return false;
    }

    //var all_add = $(":input[id^='addmoney']:not([readonly='readonly'])");
    var all_addeduct = $(":input[id^='add_deduct_']:not([readonly='readonly'])");
    var arrAddID = [], arrAddValue = [];
    var objDeduct = {};
    var arrAddDeduct = [];

    $.each(all_addeduct, function(key, value) {
        //console.log(all_add[key]);
        var t = all_addeduct[key].id.toString();
        var k = t.split('_');

        arrAddID.push(k[2]);
        arrAddValue.push(all_addeduct[key].value);
    });


    objDeduct.data_id = arrAddID;
    objDeduct.data_value = arrAddValue;

    var objVar = {};
    objVar.idcard = idcard;
    objVar.wage_id = wage_id;
    objVar.wage_salary = $('#wage_salary').val();
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    objVar.adddeduct = objDeduct;

    $.ajax({
        url: 'recalmoney',
        data: objVar,
        type: 'POST',
        success: function(resp) {
            console.log(resp);
            getdetailconf(0, objDataIndex);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


$("#submit_confirm").click(function() {
/*    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลการตรวจสอบเงินเดือน หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {*/


                var id_wage_confirm = $('#id_wage_confirm').val();
                var id_card_confirm = $('#id_card_confirm').val();
                var wage_remark = $('#wage_remark').val();
                var datapostconfirm = {
                    id_wage_confirm: id_wage_confirm,
                    id_card_confirm: id_card_confirm,
                    page_mode: page_mode,
                    wage_remark:wage_remark
                };

                $.ajax({
                    method: "post",
                    url: "saveconfirmsalary",
                    data: datapostconfirm,
                    success: function(data) {
                        loaddata();
                        GoNext();

      /*                  var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");*/
/*                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);*/

                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });


/*
            } else {
                var datapostconfirm = "";
            }
            //  console.log(datapostconfirm);


        }
    });*/


});