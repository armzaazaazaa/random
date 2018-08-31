var objEmp;
var num = 1;
$(document).ready(function() {

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


    $("#monthselect").datepicker({
        autoclose: true,
        language: 'th',
        format: "mm-yyyy",
        startView: "year",
        minView: "year",
        minViewMode: "months"
    });

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
    loaddeptdeductlist();
});


function loaddeptdeductlist() {
    var monthselect = $('#monthselect').val();
    var template_type_id = $('#add_deduct_template_id').val();
    var datapost = {
        monthselect: monthselect,
        template_type_id : template_type_id,
        loadofme : 1
    };

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
                var id = val;

                var datapostdete = {
                    id: id,
                };
                // console.log(datapostdete);
                $.ajax({
                    url: 'deleteadddeductbydept',
                    data: datapostdete,
                    type: 'POST',
                    success: function(data) {
                        loaddeptdeductlist();
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

        tbhtml += "<tr><td class='text-center'>" + num + '</td>';
        tbhtml += '<td>' + data[key].emp_name +'</td>' ;
        //tbhtml += '<br><div class="col-xs-8"><input type="text" id="getfullname' + num + '" value="' + data[key].Fullname + '" class="form-control hidetext" ></div></td>';
        tbhtml += '<td>' + data[key].add_deduct_template_name + '</td > ';
        tbhtml += '<td class="text-right">' + accounting.formatMoney(money)+ '<br>';
        tbhtml += '<div class="col-xs-8"><input type="text" id="amounttotal' + num + '" value="' + data[key].dept_deduct_amount + '" ';
        tbhtml += " data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\"  class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
        tbhtml += '<td>' + data[key].record_comment + '<br><div class="col-xs-8"><input type="text" id="record_comment' + num + '" value="' + data[key].record_comment + '" class="form-control hidetext" ></div></td>';
        tbhtml += '<td>';
        tbhtml += '<center><button class = "btn btn-sm btn-warning" type = "button" onclick = "editDeductDetail(' + num + ')" > แก้ ไข </button >';
        tbhtml += '&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteDeductDetail(' + data[key].id + ')" > ลบแถว </button>';
        tbhtml += '<br>';
        tbhtml += '<br>';
        tbhtml += '<button class = "btn btn-sm btn-primary hidetext" id="saveEditDeductDetail' + num + '" type = "button" onclick = "saveEditDeductDetail(' + data[key].id + ',' + num +
            ')" > บันทึก </button></center>';
        tbhtml += '</td ></tr > ';
        //listdeduct(num);
        num++;
    });

    if(num==1) {
        tbhtml +='<tr>';
        tbhtml +='<td colspan="6" class="text-center"> ไม่พบรายการ';
        tbhtml +='</td>';
        tbhtml +='</tr>';

        $('#saveapprovededuct').hide();
    }


    $("#tblticket").append(tbhtml);
    $("[data-mask]").inputmask();
    hidetext();
}

function saveEditDeductDetail(val, row) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลรายการจ่ายเงิน หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {

                var id = val;
                var amounttotal = $('#amounttotal' + row).val();
                var record_comment = $('#record_comment' + row).val();

                var datapostsave = {
                    id: id,
                    amounttotal: amounttotal,
                    record_comment: record_comment
                };
                //console.log(datapostsave);
                $("#tblticket").empty();
                $.ajax({
                    url: 'saveeditadddeductbydept',
                    data: datapostsave,
                    type: 'POST',
                    success: function(data) {
                        if(data !== "0") {
                            loaddeptdeductlist();
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ระบบบันทึกข้อมูลเรียบร้อย",
                            }); //"ระบบลบข้อมูลเรียบร้อย");

                            setTimeout(function () {
                                // be careful not to call box.hide() here, which will invoke jQuery's hide method
                                box.modal('hide');
                            }, BootboxTimeOut);
                        }
                        else {
                            alert('ERROR');
                            return false;
                        }

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

    $('#amounttotal' + val).show();
    $('#record_comment' + val).show();
    $('#saveEditDeductDetail' + val).show();
    //$('#selecttypeadddeduc' + val).val(setSelect);
    //bindObjAutoComplete(val);
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