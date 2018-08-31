var objEmp;
var num = 1;
var objDeductList;
var objAddList;
$(document).ready(function () {

    /*
     $(".monthselect").datepicker({
     autoclose: true,
     language: 'th',
     dateFormat: 'yy-mm',
     changeMonth: true,
     changeYear: true,
     showButtonPanel: true,
     });
     */
    $('#monthselect').MonthPicker(MonthPickerConfig);



    $.ajax({
        method: "GET",
        url: "autocomp",
        success: (function (data) {
            // console.log(data);
            objEmp = data;

        })
    });


    /*
    $.ajax({
        method: "GET",
        url: "getdeductlisttempall",
        success: function (data, textStatus, jQxhr) {
            var datalist = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            $.each(data, function (key, value) {
                datalist += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
            });
            $('#selectdeduct').html(datalist);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

*/


    $("[data-mask]").inputmask();


    $('#selectdeduct').change(function () {
        var v = $(this).val();
        if (v != '') {
            $("#selectadddeduct").val($("#selectadddeduct option:first").val());
        }
    });

    $('#selectadddeduct').change(function () {
        var v = $(this).val();
        if (v != '') {
            $("#selectdeduct").val($("#selectdeduct option:first").val());
        }
    });


    $("#seachdatalist").click(function () {
        if($('#selectdeduct').val()=='' && $('#selectadddeduct').val()=='') {
            alert("กรุณาเลือกรายการ");
            return false;
        }

       loadpayment();
    });

});



function getTemplateData(callback) {
    $.ajax({
        method: "GET",
        url: "loaddeducttemplate",
        success: function(data, textStatus, jQxhr) {
            var datalist1 = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            var datalist2 = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';

            $.each(data, function(key, value) {
                if(data[key].ADD_DEDUCT_TEMPLATE_TYPE=="1") {
                    datalist1 += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
                }
                else {
                    datalist2 += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
                }
            });

            callback(datalist1,datalist2);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


getTemplateData(function(datalist1,datalist2) {
    objAddList = datalist1;
    objDeductList = datalist2;

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

    if (valueDepartment != '') {
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

function loadpayment() {

    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var monthselect = $('#monthselect').val();
    var selectdeduct = $('#selectdeduct').val();
    var selectadddeduct = $('#selectadddeduct').val();


    var datapost = {
        selectworking: selectworking,
        selectdepartment: selectdepartment,
        selectsection: selectsection,
        monthselect: monthselect,
        selectdeduct: selectdeduct,
        selectadddeduct: selectadddeduct
    };

    $.ajax({
        url: 'seachempdeductall',
        data: datapost,
        type: 'POST',
        success: function (data) {
            console.log(data);
            $("#tblticket").empty();


            num = 1;
            var tbhtml = "";
            var totalMoney = 0;
            $.each(data, function (key, value) {

                var money = parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);
                totalMoney += parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);

                tbhtml += "<tr><td>" + num + '</td>';
                tbhtml += '<td>' + data[key].Fullname +'</td>' ;
                //tbhtml += '<br><div class="col-xs-8"><input type="text" id="getfullname' + num + '" value="' + data[key].Fullname + '" class="form-control hidetext" ></div></td>';
                tbhtml += '<td>' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '</td > ';
                tbhtml += '<td style="text-align: right; padding-right: 3px;">' + accounting.formatMoney(money) + '<br>';
                tbhtml += '<div class="col-xs-8"><input type="text" id="amounttotal' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_AMOUNT + '" ';
                tbhtml += " class=\"form-control hidetext\" placeholder=\"0.00\" data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" data-mask></div></td>";
                tbhtml += '<td>' + data[key].ADD_DEDUCT_DETAIL + '<br><div class="col-xs-8"><input type="text" id="detaildeduct' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL + '" class="form-control hidetext" ></div></td>';
                tbhtml += '<td>';
                tbhtml += '<button class = "btn btn-sm btn-warning" type = "button" onclick = "editDeductDetail(' + num + ')" > แก้ ไข </button >';
                tbhtml += '&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ')" > ลบแถว </button>';
                tbhtml += '<br>';
                tbhtml += '<button class = "btn btn-sm btn-primary hidetext" id="saveEditDeductDetail' + num + '" type = "button" onclick = "saveEditDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ',' + num +
                    ')" > บันทึก </button>';
                tbhtml += '</td ></tr > ';
                //listdeduct(num,data[key].ADD_DEDUCT_TEMPLATE_TYPE);
                num++;
            });

                //Summary
                tbhtml += '<tr>';
                tbhtml += '<td colspan="3" class="text-right"><strong>รวมเงิน</strong></td>';
                tbhtml += '<td class="text-right"><strong>'+accounting.formatMoney(totalMoney)+'</strong></td>';
                tbhtml += '<td colspan="2" class="text-center"></td>';
                tbhtml += '</tr>';


            if (num == 1) {
                tbhtml += '<tr>';
                tbhtml += '<td colspan="6" class="text-center"> ไม่พบรายการ';
                tbhtml += '</td>';
                tbhtml += '</tr>';
            }

            //var tbhtml = drawTable(data);
            $("#tblticket").append(tbhtml);
            $("[data-mask]").inputmask();
            hidetext();
        }
    });

}


var num = 1;
/*
$("#seachdatalist").click(function () {
    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var monthselect = $('#monthselect').val();
    var selectdeduct = $('#selectdeduct').val();
    var selectadddeduct = $('#selectadddeduct').val();


    var datapost = {
        selectworking: selectworking,
        selectdepartment: selectdepartment,
        selectsection: selectsection,
        monthselect: monthselect,
        selectdeduct: selectdeduct,
        selectadddeduct: selectadddeduct
    }

    $.ajax({
        url: 'seachempdeductall',
        data: datapost,
        type: 'POST',
        success: function (data) {
            console.log(data);
            $("#tblticket").empty();



             num = 1;
             var tbhtml = "";
             $.each(data, function (key, value) {

             var money = parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);

             tbhtml += "<tr><td>" + num + '</td>';
             tbhtml += '<td>' + data[key].Fullname + '<input type="hidden" id="id_emp' + num + '" value="' + data[key].ID_Card + '" class="form-control hidetext" >';
             tbhtml += '<br><div class="col-xs-8"><input type="text" id="getfullname' + num + '" value="' + data[key].Fullname + '" class="form-control hidetext" ></div></td>';
             tbhtml += '<td>' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '<input type="hidden" id="id_deduct' + num + '" value="' + data[key].ADD_DEDUCT_ID + '"><br><div class = "col-xs-8"><select id="selecttypeadddeduc' + num + '"  class="form-control hidetext" ></select></div></td > ';
             tbhtml += '<td style="text-align: right; padding-right: 3px;">' + accounting.formatMoney(money) + '<br>';
             tbhtml += '<div class="col-xs-8"><input type="text" id="amounttotal' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_AMOUNT + '" ';
             tbhtml += " data-inputmask=\"'alias': 'decimal'\" class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
             tbhtml += '<td>' + data[key].ADD_DEDUCT_DETAIL + '<br><div class="col-xs-8"><input type="text" id="detaildeduct' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL + '" class="form-control hidetext" ></div></td>';
             tbhtml += '<td>';
             tbhtml += '<button class = "btn btn-sm btn-warning" type = "button" onclick = "editDeductDetail(' + num + ')" > แก้ ไข </button >';
             tbhtml += '&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ')" > ลบแถว </button>';
             tbhtml += '<br>';
             tbhtml += '<button class = "btn btn-sm btn-primary hidetext" id="saveEditDeductDetail' + num + '" type = "button" onclick = "saveEditDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ',' + num +
             ')" > บันทึก </button>';
             tbhtml += '</td ></tr > ';
             listdeduct(num);
             num++;
             });


             if(num==1) {
             tbhtml +='<tr>';
             tbhtml +='<td colspan="6" class="text-center"> ไม่พบรายการ';
             tbhtml +='</td>';
             tbhtml +='</tr>';
             }


            var tbhtml = drawTable(data);
            $("#tblticket").append(tbhtml);
            $("[data-mask]").inputmask();
            hidetext();
        }
    });


});

*/


/*
function listdeduct(row, templatetype) {

    if(templatetype=="1") {
        $('#selecttypeadddeduc' + row).html(objAddList);
    }
    else {
        $('#selecttypeadddeduc' + row).html(objDeductList);
    }
}
*/


function listdeduct(row,templatetype) {

    $.ajax({
        method: "GET",
        url: "getdeductlisttempall",
        data : {selecttypepay:templatetype},
        success: function (data, textStatus, jQxhr) {
            var datalist = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            $.each(data, function (key, value) {
                datalist += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
            });
            $('#selecttypeadddeduc' + row).html(datalist);
        },
        error: function (jqXhr, textStatus, errorThrown) {
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
        callback: function (result) {
            if (result == 1) {
                var add_deductdetail_id = val;
                var datapostdete = {
                    add_deductdetail_id: add_deductdetail_id
                };

                $.ajax({
                    url: 'deleteadddeductdetail',
                    data: datapostdete,
                    type: 'POST',
                    success: function (data) {

                        if(parseInt(data)==1) {
                            //load payment list
                            loadpayment();

                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ระบบลบข้อมูลเรียบร้อย",
                            }); //"ระบบลบข้อมูลเรียบร้อย");

                            setTimeout(function () {
                                // be careful not to call box.hide() here, which will invoke jQuery's hide method
                                box.modal('hide');
                            }, BootboxTimeOut);
                        }else {
                            alert('พบข้อผิดพลาด');
                            return;
                        }
                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });


}


function saveEditDeductDetail(val, row) {

    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลรายการจ่ายเงิน หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {

                var add_deductdetail_id = val;
                var amounttotal = $('#amounttotal' + row).val();
                var detaildeduct = $('#detaildeduct' + row).val();
                var datapostsave = {
                    add_deductdetail_id: add_deductdetail_id,
                    amounttotal: amounttotal,
                    detaildeduct: detaildeduct
                };

                $.ajax({
                    url: 'saveadddeductdetail',
                    data: datapostsave,
                    type: 'POST',
                    success: function (data) {

                        loadpayment();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        });

                        setTimeout(function () {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        }
    });
}




function editDeductDetail(val) {
    //var setSelect = $('#id_deduct' + val).val();
    //console.log(setSelect);
    $('#getfullname' + val).show();
    $('#selecttypeadddeduc' + val).show();
    $('#amounttotal' + val).show();
    $('#detaildeduct' + val).show();
    $('#saveEditDeductDetail' + val).show();
    //$('#selecttypeadddeduc' + val).val(setSelect);
    bindObjAutoComplete(val);
    $("[data-mask]").inputmask();
    console.log('xxxx');
}

function bindObjAutoComplete(counting) {
    $("#getfullname" + counting).each(function () {
        $(this).autocomplete({
            minLength: 0,
            source: objEmp,
            focus: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $(this).val(ui.item.label);
                $("#id_emp" + counting).val(ui.item.value);
                //console.log(ui.item.value);
                return false;
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>" + item.label + "</div>")
                .appendTo(ul);
        };
    });
}