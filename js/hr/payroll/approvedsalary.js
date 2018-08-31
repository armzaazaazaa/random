var objEmp;
var num = 1;
var numaddde = 1;
var numdededuct = 1;
var numset = 1;
$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "autocomp",
        success: (function(data) {
            // console.log(data);
            objEmp = data;
            bindObjAutoComplete();
        })
    });

    $("[data-mask]").inputmask();
    $("#btnAddFile").hide();
    $("#showcontant").hide();

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

$("#seachdatalist").click(function() {
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
    }

    $.ajax({
        method: "post",
        url: "searchempdata",
        data: datapost,
        success: function(data) {
            //console.log(data);
            listEmpdata(data, num)
            $('#showsearch').show();

        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });



});

function bindObjAutoComplete() {
    $("#namefullemp").each(function() {
        $(this).autocomplete({
                minLength: 0,
                source: objEmp,
                focus: function(event, ui) {
                    $(this).val(ui.item.label);
                    return false;
                },
                select: function(event, ui) {
                    $(this).val(ui.item.label);
                    $("#id_emp").val(ui.item.value);
                    //console.log(ui.item.value);
                    return false;
                }
            })
            .autocomplete("instance")._renderItem = function(ul, item) {
                return $("<li>")
                    .append("<div>" + item.label + "</div>")
                    .appendTo(ul);
            };
    });
}

$("#resetvalue").click(function() {

});

function listEmpdata(data, row) {
    var tbhtml = "";
    num = 1;
    var imgNo = "no.png";
    var imgYes = "yes.png";
    $.each(data, function(key, value) {
        // if (data[key].WAGE_THIS_MONTH_CONFIRM == 0) {
        //     var image = "no.png";
        //     var idsetval = 0;
        //
        // } else if (data[key].WAGE_THIS_MONTH_CONFIRM == 1) {
        //     var image = "yes.png";
        //     var idsetval = 1;
        // }
        //
        // if (data[key].WAGE_THIS_MONTH_CONFIRM_BY == null) {
        //     var resultwageconfirm = "";
        // } else {
        //     var resultwageconfirm = data[key].WAGE_THIS_MONTH_CONFIRM_BY;
        // }
        //
        // if (data[key].WAGE_THIS_MONTH_CONFIRM_DATE == null) {
        //     var resultwageconfirmdate = "";
        // } else {
        //     var resultwageconfirmdate = data[key].WAGE_THIS_MONTH_CONFIRM_DATE;
        // }
        //
        //
        // tbhtml += "<tr><td>" + num + '</td>';
        // tbhtml += '<td><center><a href = "#" ><img src = "../../images/wshr/' + image + '" class = "img-circle" ';
        // tbhtml += '<a href = "#" ><input type="hidden"  id="setfirm' + num + '"><img src = "../../images/wshr/no.png" class = "img-circle" onclick="getdetailconf(' + data[key].ID_Card + ',' + num + ')" data-toggle = "modal" ';
        // tbhtml += 'data-target = "#myModal" ></a></center ></td > ';
        // tbhtml += '<td>' + data[key].Fullname + '</td > ';
        // tbhtml += '<td>' + data[key].Position + '</td>';
        // tbhtml += '<td>' + data[key].DepartmentName + '</td>';
        // tbhtml += '<td>' + data[key].SectionName + '</td>';
        // tbhtml += '<td>' + data[key].CompanyName + '</td>';
        // tbhtml += '<td>' + resultwageconfirm + '</td>';
        // tbhtml += '<td>' + resultwageconfirmdate + '</td>< /tr >';
        //
        // num++;
        if (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == 0) {
            var image = imgNo;
        } else if (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == 1) {
            var image = imgYes;
        }else{
            var image = imgNo;
        }

        if (data[key].WAGE_THIS_MONTH_DIRECTOR_LOCK == 0) {
            var image2 = imgNo;
        } else if (data[key].WAGE_THIS_MONTH_DIRECTOR_LOCK == 1) {
            var image2 = imgYes;
        }else{
            var image2 = imgNo;
        }

        if (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == null) {
            var resultwageconfirm = "";
        } else {
            var resultwageconfirm = data[key].WAGE_THIS_MONTH_CONFIRM_BY;
        }

        if (data[key].WAGE_THIS_MONTH_EMPLOYEE_LOCK == null) {
            var resultwageconfirmdate = "";
        } else {
            var resultwageconfirmdate = data[key].WAGE_THIS_MONTH_CONFIRM_DATE;
        }


        tbhtml += "<tr><td>" + num + '</td>';
        tbhtml += '<td><a href = "#" ><img src = "../../images/wshr/' + image + '" class = "img-circle"';
        tbhtml += '<a href = "#" ><input type="hidden"  id="setfirm' + num + '"><img src = "../../images/wshr/' + image2 + '" class = "img-circle" onclick="getdetailconf(' + data[key].ID_Card + ',' + num + ')" data-toggle = "modal"';
        tbhtml += 'data-target = "#myModal" ></a></center ></td > ';
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
    setvalueconfirm(data);
    $("[data-mask]").inputmask();
}

function setvalueconfirm(data) {
    numset = 1;
    $.each(data, function(key, value) {
        if (data[key].WAGE_THIS_MONTH_CONFIRM == 0) {
            var idsetval = 0;
        } else if (data[key].WAGE_THIS_MONTH_CONFIRM == 1) {
            var idsetval = 1;
        }

        $('#setfirm' + numset).val(idsetval);
        numset++;
    });
}

function getdetailconf(val, num) {
    var rownum = num;
    //  alert(rownum);
    var setfirmrow = $('#setfirm' + rownum).val();
    if (setfirmrow == 0) {

        var box = bootbox.alert({
            size: "small",
            title: "แจ้งเตือน",
            message: "กรุณายืนยันการตรวจสอบเงินเดือนก่อน",
        }); //"ระบบลบข้อมูลเรียบร้อย");

        setTimeout(function() {
            // be careful not to call box.hide() here, which will invoke jQuery's hide method
            box.modal('hide');
            $('#myModal').modal('hide');
        }, BootboxTimeOut);
    }
    var id_card_salary = val;
    $('#nameworking').empty();
    $('#nameemp').empty();
    $('#positionemp').empty();
    $('#diviemp').empty();
    $('#wageemp').empty();
    $('#tbadddeduct').empty();
    $("#sumTotalDeduc").empty();
    $('#tbdededuct').empty();
    $("#sumTotaldeDeduc").empty();
    $.ajax({
        method: "get",
        url: "searchsalaryidcard?id_card_salary=" + id_card_salary,
        success: function(data) {
            console.log(data);
            $('#nameworking').append(data[0].workname);
            $('#nameemp').append(data[0].be + ' ' + data[0].empname + '  ' + data[0].surname);
            $('#positionemp').append('ตำแหน่ง: ' + data[0].empposition);
            $('#diviemp').append('แผนก: ' + data[0].departmentname);
            $('#wageemp').append('เงินเดือน: ' + data[0].wagesalary);
            $('#sumallnet').val(data[0].WAGE_NET_SALARY);
            $('#id_wage_confirm').val(data[0].WAGE_ID);
            tbaddduduction(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function tbaddduduction(data) {
    var tbadddeduct = "";
    var tbdededuct = "";
    var totaladddedu = 0;
    var totaldededu = 0;
    numaddde = 1;
    numdededuct = 1;
    $.each(data, function(key, value) {
        if (data[key].ADD_DEDUCT_THIS_MONTH_TYPE == 1) {
            tbadddeduct += "<tr><td>" + numaddde + '</td>';
            tbadddeduct += "<td>" + data[key].ADD_DEDUCT_THIS_MONTH_TMP_NAME + '</td>';
            tbadddeduct += "<td>" + data[key].ADD_DEDUCT_THIS_MONTH_DETAIL + '</td>';
            tbadddeduct += "<td>" + data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT + '</td></tr>';

            totaladddedu = totaladddedu + parseFloat(data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT);
            numaddde++;
        } else if (data[key].ADD_DEDUCT_THIS_MONTH_TYPE == 2) {
            tbdededuct += "<tr><td>" + numdededuct + '</td>';
            tbdededuct += "<td>" + data[key].ADD_DEDUCT_THIS_MONTH_TMP_NAME + '</td>';
            tbdededuct += "<td>" + data[key].ADD_DEDUCT_THIS_MONTH_DETAIL + '</td>';
            tbdededuct += "<td>" + data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT + '</td></tr>';

            totaldededu = totaldededu + parseFloat(data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT);
            numdededuct++;
        }
    });
    $("#tbadddeduct").append(tbadddeduct);
    $("#tbdededuct").append(tbdededuct);
    $("#sumTotalDeduc").append(totaladddedu);
    $("#sumTotaldeDeduc").append(totaldededu);


}

$("#submit_confirm").click(function() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลการตรวจสอบเงินเดือน หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var id_wage_confirm = $('#id_wage_confirm').val();
                var id_card_confirm = $('#id_card_confirm').val();
                var selectworking = $('#selectworking').val();
                var selectdepartment = $('#selectdepartment').val();
                var selectsection = $('#selectsection').val();
                var id_emp = $('#id_emp').val();

                var datapostconfirm = {
                    id_wage_confirm: id_wage_confirm,
                    id_card_confirm: id_card_confirm,
                    selectworking: selectworking,
                    selectdepartment: selectdepartment,
                    selectsection: selectsection,
                    id_emp: id_emp
                }

                $.ajax({
                    method: "post",
                    url: "saveconfirmapprovesalary",
                    data: datapostconfirm,
                    success: function(data) {
                        $("#tblticket").empty();
                        listEmpdata(data, num)
                        $('#myModal').modal('hide');
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            } else {
                var datapostconfirm = "";
            }
            //  console.log(datapostconfirm);


        }
    });
});