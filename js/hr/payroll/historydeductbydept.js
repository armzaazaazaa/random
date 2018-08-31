var objEmp;
var num = 1;
$(document).ready(function() {

    /*
    $("#monthselect").datepicker({
        autoclose: true,
        language: 'th',
        dateFormat: 'yy-mm',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
    });
    */


    $('#monthselect').MonthPicker({
        Button: false,
        MonthFormat: 'mm-yy',
        IsRTL: true,
        i18n: {
            year: 'ปี',
            buttonText: 'เลือกเดือน',
            prevYear: 'ปีก่อนหน้า',
            nextYear: 'ปีถัดไป',
            next12Years: 'ถัดไป  12 ปี',
            prev12Years: 'ก่อนหน้า 12 ปี',
            nextLabel: 'ถัดไป',
            prevLabel:'ถัดไป',
            jumpYears:  'ข้ามไปที่ปี',
            backTo: 'ย้อนกลับ',
            months: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]
        }
    });



    $.ajax({
        method: "GET",
        url: "getdeductlisttempall",
        success: function(data, textStatus, jQxhr) {
            var datalist = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            $.each(data, function(key, value) {
                datalist += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
            });
            $('#selectdeduct').html(datalist);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


    $("[data-mask]").inputmask();
    $('#saveapprovededuct').hide();
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

    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var monthselect = $('#monthselect').val();

    if(selectworking == '') {
        showMessageBox('กรุณาเลือกบริษัท');
        return false;
    }

    var datapost = {
        selectworking: selectworking,
        selectdepartment: selectdepartment,
        selectsection: selectsection,
        monthselect: monthselect,
    }

    // console.log(datapost);
    $.ajax({
        url: 'seachempdeforadddeductbydept',
        data: datapost,
        type: 'POST',
        success: function(data) {
            console.log(data);
            $("#tblticket").empty();
            num = 1;
            listDetaildeduct(data, num)

        }
    });

    $.ajax({
        url: "autocompforadddeductbydept",
        data: datapost,
        type: 'POST',
        success: (function(data) {
            // console.log(data);
            objEmp = data;
            bindObjAutoComplete(num);

        })
    });


});

function listdeduct(row) {
    $.ajax({
        method: "GET",
        url: "getdeductlisttempall",
        success: function(data, textStatus, jQxhr) {
            var datalist = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            $.each(data, function(key, value) {
                datalist += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
            });
            $('#selecttypeadddeduc' + row).html(datalist);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function keyPrice(numkey) {
    var formatkey = $('#amounttotal' + numkey).val();
    var formatkey = $.number(formatkey, 2);
    $('#amounttotal' + numkey).val(formatkey);
}

function hidetext() {
    $('.hidetext').hide();
}

function deleteDeductDetail(val) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะลบข้อมูลรายการจ่าย หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var add_deductdetail_id = val;
                var selectworking = $('#selectworking').val();
                var selectdepartment = $('#selectdepartment').val();
                var selectsection = $('#selectsection').val();
                var monthselect = $('#monthselect').val();

                var datapostdete = {
                    add_deductdetail_id: add_deductdetail_id,
                    selectworking: selectworking,
                    selectdepartment: selectdepartment,
                    selectsection: selectsection,
                    monthselect: monthselect,
                };
                // console.log(datapostdete);
                $.ajax({
                    url: 'deleteadddeductbydept',
                    data: datapostdete,
                    type: 'POST',
                    success: function(data) {
                        $("#tblticket").empty();
                        console.log(data);
                        listDetaildeduct(data, num)

                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบลบข้อมูลเรียบร้อย",
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

            }
        }
    });
}

function listDetaildeduct(data, row) {
    var tbhtml = "";
    num = 1;
    $.each(data, function(key, value) {
        var is_record_approved = data[key].is_record_approved;
        if (is_record_approved === '0') {
            var status_record_approved = "<font color='red'>รออนุมัติ</font>";
        } else {
            var status_record_approved = "<font color='green'>อนุมัติ</font>";
        }
        tbhtml += "<tr>";
        tbhtml += "<td>" + num + '</td>';
        tbhtml += "<td>" + data[key].workingname + '</td>';
        tbhtml += "<td>" + data[key].doc_notice_id + '</td>';
        tbhtml += "<td>" + data[key].for_month + "-" + data[key].for_year + '</td>';
        tbhtml += '<td>' + data[key].Fullname + '<input type="hidden" id="id_emp' + num + '" value="' + data[key].ID_Card + '" class="form-control hidetext" >';
        tbhtml += '<br><div class="col-xs-8"><input type="text" id="getfullname' + num + '" value="' + data[key].Fullname + '" class="form-control hidetext" ></div></td>';
        tbhtml += '<td>' + data[key].tempname + '<input type="hidden" id="id_deduct' + num + '" value="' + data[key].add_deduct_template_id + '"><br><div class = "col-xs-8"><select id="selecttypeadddeduc' + num + '"  class="form-control hidetext" ></select></div></td > ';
        tbhtml += '<td>' + data[key].dept_amount + '<br>';
        tbhtml += '<div class="col-xs-8"><input type="text" id="amounttotal' + num + '" value="' + data[key].dept_amount + '" ';
        tbhtml += " data-inputmask=\"'alias': 'decimal'\" class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
        tbhtml += '<td>' + data[key].add_deduct_template_name + '<br><div class="col-xs-8"><input type="text" id="detaildeduct' + num + '" value="' + data[key].add_deduct_template_name + '" class="form-control hidetext" ></div></td>';
        tbhtml += "<td>" + data[key].nameCreateName + '</td>';
        tbhtml += "<td>" + status_record_approved + '</td></tr > ';
        listdeduct(num);
        num++;
    });

    if(num==1) {
        tbhtml +='<tr>';
        tbhtml +='<td colspan="10" class="text-center"> ไม่พบรายการ';
        tbhtml +='</td>';
        tbhtml +='</tr>';
    }


    $("#tblticket").append(tbhtml);
    $("[data-mask]").inputmask();
    $('#saveapprovededuct').show();

    hidetext();
}

function saveEditDeductDetail(val, row) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลรายการจ่ายเงิน หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {

                var add_deductdetail_id = val;
                var selectworking = $('#selectworking').val();
                var selectdepartment = $('#selectdepartment').val();
                var selectsection = $('#selectsection').val();
                var monthselect = $('#monthselect').val();

                var id_emp = $('#id_emp' + row).val();
                var selecttypeadddeduc = $('#selecttypeadddeduc' + row).val();
                var amounttotal = $('#amounttotal' + row).val();
                var detaildeduct = $('#detaildeduct' + row).val();

                var datapostsave = {
                    add_deductdetail_id: add_deductdetail_id,
                    selectworking: selectworking,
                    selectdepartment: selectdepartment,
                    selectsection: selectsection,
                    monthselect: monthselect,
                    id_emp: id_emp,
                    selecttypeadddeduc: selecttypeadddeduc,
                    amounttotal: amounttotal,
                    detaildeduct: detaildeduct
                };
                //console.log(datapostsave);
                $("#tblticket").empty();
                $.ajax({
                    url: 'saveeditadddeductbydept',
                    data: datapostsave,
                    type: 'POST',
                    success: function(data) {
                        // console.log(data);
                        listDetaildeduct(data, num)

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
            }
        }
    });

}

function editDeductDetail(val) {
    var setSelect = $('#id_deduct' + val).val();
    console.log(setSelect);
    $('#getfullname' + val).show();
    $('#selecttypeadddeduc' + val).show();
    $('#amounttotal' + val).show();
    $('#detaildeduct' + val).show();
    $('#saveEditDeductDetail' + val).show();
    $('#selecttypeadddeduc' + val).val(setSelect);
    bindObjAutoComplete(val);

}

function bindObjAutoComplete(counting) {
    $("#getfullname" + counting).each(function() {
        $(this).autocomplete({
                minLength: 0,
                source: objEmp,
                focus: function(event, ui) {
                    $(this).val(ui.item.Fullnameauto);
                    return false;
                },
                select: function(event, ui) {
                    $(this).val(ui.item.Fullnameauto);
                    $("#id_emp" + counting).val(ui.item.ID_Cardauto);
                    //console.log(ui.item.value);
                    return false;
                }
            })
            .autocomplete("instance")._renderItem = function(ul, item) {
                return $("<li>")
                    .append("<div>" + item.Fullnameauto + "</div>")
                    .appendTo(ul);
            };
    });
}
$("#checkAll").click(function() {
    $('input:checkbox').not(this).prop('checked', this.checked);
});
$("#saveapprovededuct").click(function() {

    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var monthselect = $('#monthselect').val();

    if(selectworking == '') {
        showMessageBox('กรุณาเลือกบริษัท');
        return false;
    }

    var getidapprove = $("input[name='checkApproved[]']:checked").map(function() { return $(this).val(); }).get();
    // console.log(getidapprove);
    var postgetidapprove = {
        getidapprove: getidapprove,
        selectworking: selectworking,
        selectdepartment: selectdepartment,
        selectsection: selectsection,
        monthselect: monthselect,
    };
    $.ajax({
        url: 'updateapproveddeduct',
        data: postgetidapprove,
        type: 'POST',
        success: function(data) {
            console.log(data);
            // $("#tblticket").empty();
            // num = 1;
            // listDetaildeduct(data, num)

        }
    });



});