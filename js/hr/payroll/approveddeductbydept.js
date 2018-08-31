var objEmp;
var num = 1;
$(document).ready(function() {


    $("#monthselect").datepicker({
        autoclose: true,
        language: 'th',
        format: "mm-yyyy",
        startView: "year",
        minView: "year",
        minViewMode: "months"
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
    if(valueCompany !='') {
        $.ajax({
            method: "GET",
            url: _url + "?id_company=" + valueCompany,
            success: function (data, textStatus, jQxhr) {
                $.each(data, function (key, value) {
                    _options1 += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#selectdepartment').html(_options1);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else {
        $('#selectdepartment').html(_options1);
        $('#selectsection').html(_options2);
    }
}

function getDepartmentForSection(val) {

    var _options = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _url = $('#urlGetSection').attr('title');
    var valueDepartment = val.value;
    //$('#hiddenvalDepartment').val(valueDepartment);

    if(valueDepartment !='') {
        $.ajax({
            method: "GET",
            url: _url + "?id_department=" + valueDepartment,
            success: function (data, textStatus, jQxhr) {
                $.each(data, function (key, value) {
                    _options += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#selectsection').html(_options);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else {
        $('#selectsection').html(_options);
    }
}

$("#seachdatalist").click(function() {
    loaddeductbydept();

/*    $.ajax({
        url: "autocompforadddeductbydept",
        data: datapost,
        type: 'POST',
        success: (function(data) {
            // console.log(data);
            objEmp = data;
            bindObjAutoComplete(num);

        })
    });*/


});


function loaddeductbydept() {
    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var monthselect = $('#monthselect').val();


    var datapost = {
        selectworking: selectworking,
        selectdepartment: selectdepartment,
        selectsection: selectsection,
        monthselect: monthselect,
    }

    //console.log(datapost);
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
}

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
                var datapostdete = {
                    id: val,
                };
                // console.log(datapostdete);
                $.ajax({
                    url: 'deleteadddeductbydept',
                    data: datapostdete,
                    type: 'POST',
                    success: function(data) {
                        $("#tblticket").empty();
                        loaddeductbydept();
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
        var money = parseFloat(data[key].dept_deduct_amount);
        tbhtml += "<tr><td class=\"text-center\">" + '<input type="checkbox" name="checkApproved[]" id="checkItem' + num + '" value="' + data[key].id + '">' + '</td>';
        tbhtml += "<td>" + data[key].pay_date + '</td>';
        tbhtml += '<td>' + data[key].emp_name;
        tbhtml += '</td>';
        tbhtml += '<td>' + data[key].add_deduct_template_name + '</td > ';
        tbhtml += '<td class="text-right">' + accounting.formatMoney(money) + '</td>';
        tbhtml += '<td>' + data[key].record_comment + '</td>';
        tbhtml += "<td>" + data[key].create_empname + '</td>';
        tbhtml += '<td class="text-center">&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteDeductDetail(' + data[key].id + ')" > ลบรายการ </button></td></tr > ';
        //listdeduct(num);
        num++;
    });

    if(num==1) {
        tbhtml +='<tr>';
        tbhtml +='<td colspan="8" class="text-center"> ไม่พบรายการ';
        tbhtml +='</td>';
        tbhtml +='</tr>';
    }

    $("#tblticket").append(tbhtml);
    checkapproved(data, num);
    $("[data-mask]").inputmask();
    if(num > 1) $('#saveapprovededuct').show();
    hidetext();
}

function checkapproved(data, num) {
    $.each(data, function(key, value) {
        var is_record_approved_ck = data[key].is_record_approved;
        if (is_record_approved_ck === '1') {
            $('#checkItem' + (key + 1)).attr('checked', true);
        }
    });
}


$("#checkAll").click(function() {
    $('input:checkbox').not(this).prop('checked', this.checked);
});

$("#saveapprovededuct").click(function() {

    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการอนุมัติ หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {

                var getidapprove = $("input[name='checkApproved[]']:checked").map(function() { return $(this).val(); }).get();
                // console.log(getidapprove);
                var postgetidapprove = {
                    getidapprove: getidapprove,
                };

                $.ajax({
                    url: 'updateapproveddeduct',
                    data: postgetidapprove,
                    type: 'POST',
                    success: function(data) {
                        loaddeductbydept();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);
                    }
                });
            }
        }
    });

});



/*function saveEditDeductDetail(val, row) {
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
}*/


